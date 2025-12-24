import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import * as Sentry from '@sentry/nextjs'
import { getToken } from '@/_apis/services/login'
import { getCookie } from '@/_utils/getCookie'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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
        const { accessToken: newAccessToken } = await getToken()

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
