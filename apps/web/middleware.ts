import { NextRequest, NextResponse } from 'next/server'
import { API_PATH, CLIENT_PATH } from '@/_constants/path'

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  // [Case 1] 액세스 토큰이 유효한 경우 -> 가장 먼저 통과시킴 (Early Return)
  if (accessToken) {
    return NextResponse.next()
  }

  // [Case 2] 토큰이 아예 없는 경우 -> 곧바로 로그인 페이지로 (Early Return)
  if (!refreshToken) {
    return NextResponse.redirect(new URL(CLIENT_PATH.LOGIN, request.url))
  }

  // [Case 3] 액세스 토큰 만료 & 리프레시 토큰 존재 -> 갱신 시도
  return await handleTokenRefresh(request, refreshToken)
}

export const config = {
  matcher: [
    '/likes',
    '/profile',
    '/requests',
    '/requests/:path*',
    '/events/lucky-draw',
    '/events/gifticon',
    '/events/gifticon/:path*',
  ],
}

const handleTokenRefresh = async (
  request: NextRequest,
  refreshToken: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${API_PATH.AUTH.TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refreshToken=${refreshToken}`,
        },
      },
    )

    if (!response.ok) throw new Error('Token refresh failed')

    // 구조 분해 할당을 한 번에 처리하여 코드 간소화
    const {
      data: { accessToken: newAccessToken, accessTokenExpiresIn },
    } = await response.json()

    // 1. [서버 컴포넌트 동기화] Request Header 조작
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('Authorization', `Bearer ${newAccessToken}`)

    const res = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

    // 2. [브라우저 동기화] 쿠키 세팅
    res.cookies.set('accessToken', newAccessToken, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(Date.now() + accessTokenExpiresIn),
    })

    // 3. 백엔드 쿠키(Set-Cookie) 포워딩
    const backendSetCookies = response.headers.getSetCookie()
    for (const cookie of backendSetCookies) {
      res.headers.append('set-cookie', cookie)
    }

    return res
  } catch (error) {
    console.error('Middleware Token Refresh Error:', error)

    // 갱신 실패 시 로그인 리다이렉트 및 만료 토큰 정리
    const redirectRes = NextResponse.redirect(
      new URL(CLIENT_PATH.LOGIN, request.url),
    )
    redirectRes.cookies.delete('refreshToken')

    return redirectRes
  }
}
