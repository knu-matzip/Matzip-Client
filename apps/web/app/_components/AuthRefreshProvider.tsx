'use client'

import { useEffect, useRef } from 'react'
import { getToken } from '@/_apis/services/login'
import { getCookie } from '@/_utils/getCookie/getCookie'
import { setCookie } from 'cookies-next'

const REFRESH_FLAG_KEY = 'auth-token-refreshed'

export const AuthRefreshProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const hasRefreshed = useRef(false)

  useEffect(() => {
    if (hasRefreshed.current) return

    const refreshTokenInBackground = async () => {
      try {
        if (sessionStorage.getItem(REFRESH_FLAG_KEY)) {
          return
        }

        const accessToken = await getCookie('accessToken')
        if (accessToken) {
          return
        }

        const { accessToken: newAccessToken, accessTokenExpiresIn } =
          await getToken()

        setCookie('accessToken', newAccessToken, {
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          expires: new Date(Date.now() + accessTokenExpiresIn),
        })

        sessionStorage.setItem(REFRESH_FLAG_KEY, 'true')
        hasRefreshed.current = true
      } catch {
        console.debug('[AuthRefresh] Token refresh failed (silent)')
      }
    }

    hasRefreshed.current = true
    refreshTokenInBackground()
  }, [])

  return <>{children}</>
}
