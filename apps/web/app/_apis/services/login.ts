import { API_PATH, CLIENT_PATH } from '@/_constants/path'
import axiosInstance from '@/_lib/axiosInstance'
import { setCookie } from 'cookies-next'

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
  const res = await axiosInstance.post(API_PATH.AUTH.TOKEN)
  const { data } = res
  const { accessToken } = data
  setCookie('accessToken', accessToken)
  return res.data
}
