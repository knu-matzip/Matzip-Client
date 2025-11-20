'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'
import axiosInstanceV2 from '@/_lib/axiosInstanceV2'
import { API_PATH, CLIENT_PATH } from '@/_constants/path'

const Page = () => {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code') || ''
  const redirectUri =
    (process.env.NEXT_PUBLIC_CLIENT_URL || '') + CLIENT_PATH.LOGIN_SUCCESS

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axiosInstanceV2.get(
          API_PATH.AUTH.AUTHORIZE(code, redirectUri),
        )

        const accessToken = response?.data?.data
        if (accessToken) {
          setCookie('accessToken', accessToken)
          replace(CLIENT_PATH.MAIN)
        } else {
          console.error('Access token missing in response')
          replace(`${CLIENT_PATH.LOGIN}?error=token-missing`)
        }
      } catch (error) {
        console.error('Login process failed:', error)
        replace(`${CLIENT_PATH.LOGIN}?error=auth-failed`)
      }
    })()
  }, [code, redirectUri, replace])

  return null
}

export default Page
