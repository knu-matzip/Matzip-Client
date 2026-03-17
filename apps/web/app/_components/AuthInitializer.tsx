'use client'

import { useEffect } from 'react'
import { getToken } from '@/_apis/services/login'
import { getCookie } from '@/_utils/getCookie/getCookie'

export const AuthInitializer = () => {
  useEffect(() => {
    const refreshTokenInBackground = async () => {
      try {
        const accessToken = await getCookie('accessToken')
        if (accessToken) return
        await getToken()
      } catch {
        console.debug('[AuthRefresh] Token refresh failed')
      }
    }

    refreshTokenInBackground()
  }, []) // 빈 배열을 넣어 마운트 시 1회만 실행 보장

  return null
}
