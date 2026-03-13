import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import * as Sentry from '@sentry/nextjs'
import { getToken } from '@/_apis/services/login'
import { getCookie } from '@/_utils/getCookie'
import { setCookie } from 'cookies-next'

// 빌드 시점에만 직접 API 서버로, SSR/CSR에서는 rewrite 사용
const getBaseURL = () => {
  // 빌드 시점 감지: next build 실행 중에는 NEXT_PHASE가 'phase-production-build'
  const isBuildTime =
    typeof window === 'undefined' &&
    process.env.NEXT_PHASE === 'phase-production-build'

  if (isBuildTime) {
    // 빌드 시에만 직접 API 서버로 연결
    return (
      process.env.NEXT_PUBLIC_API_URL_BUILD || process.env.NEXT_PUBLIC_API_URL
    )
  }

  // SSR, CSR 모두 rewrite 사용
  return process.env.NEXT_PUBLIC_API_URL
}

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getCookie('accessToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError): Promise<AxiosResponse | AxiosError> => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // Todo: 상태 코드 400 전체 제외할지 말지 데이터를 보고 정하기
    // error.response.status >= 500 &&
    // error.response.status < 600
    if (error.response?.status !== 401) {
      Sentry.captureException(error, {
        extra: {
          url: originalRequest?.url,
          method: originalRequest?.method,
          status: error.response?.status,
          data: error.response?.data,
        },
      })
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const { accessToken: newAccessToken, accessTokenExpiresIn } =
          await getToken()

        setCookie('accessToken', newAccessToken, {
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          expires: new Date(Date.now() + accessTokenExpiresIn),
        })

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = newAccessToken
            ? `Bearer ${newAccessToken}`
            : ''
        }

        return await axiosInstance(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
