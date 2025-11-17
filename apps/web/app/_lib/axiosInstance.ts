import axios, { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const isServer = typeof window === 'undefined'
    let token: string | undefined

    if (isServer) {
      const { cookies } = await import('next/headers')
      token = await getCookie('accessToken', { cookies })
    } else {
      token = await getCookie('accessToken')
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  // Todo: 재발급 로직 추가 필요

  (response: AxiosResponse) => response.data,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
