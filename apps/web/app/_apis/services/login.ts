import { API_PATH, CLIENT_PATH } from '@/_constants/path'
import { setCookie, deleteCookie } from 'cookies-next'
import axios from 'axios'

const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL || ''
const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || ''

export const getKakaoInga = async () => {
  const isAndroid = /Android/.test(navigator.userAgent)
  // const isiOS = /(iPhone|iPad|iPod)/.test(navigator.userAgent);
  try {
    if (isAndroid) {
      window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${CLIENT_URL + CLIENT_PATH.LOGIN_SUCCESS}&response_type=code`
    } else {
      await window.Kakao.Auth.authorize({
        redirectUri: CLIENT_URL + CLIENT_PATH.LOGIN_SUCCESS,
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const getToken = async (): Promise<{
  tokenType: string
  accessToken: string
  accessTokenExpiresIn: number
}> => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + API_PATH.AUTH.TOKEN,
      {},
      {
        withCredentials: true,
      },
    )

    const { data } = res
    const { accessToken, accessTokenExpiresIn } = data.data
    const expireDate = new Date(Date.now() + accessTokenExpiresIn)

    setCookie('accessToken', accessToken, {
      expires: expireDate,
    })

    return res.data
  } catch (error) {
    console.error('토큰 재발급 실패(세션 만료):', error)
    deleteCookie('accessToken')

    if (typeof window !== 'undefined') {
      window.location.href = CLIENT_PATH.LOGIN
    }

    throw error
  }
}
