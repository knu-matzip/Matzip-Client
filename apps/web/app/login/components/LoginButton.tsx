'use client'

import { useEffect } from 'react'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { getKakaoInga } from '@/_apis/services/login'

export const LoginButton = () => {
  useEffect(() => {
    if (!window.Kakao) return
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '')
      console.log('Kakao initialized')
    } else {
      console.log('Kakao already initialized')
    }
  }, [])

  return (
    <button
      onClick={getKakaoInga}
      className={'relative rounded-lg bg-[#FEE500] p-3 text-center'}
    >
      <Icon type={'kakaoLogo'} className={'absolute left-[20px]'} />
      <Text>카카오 로그인</Text>
    </button>
  )
}
