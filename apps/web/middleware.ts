import { CLIENT_PATH } from '@/_constants/path'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  if (accessToken) {
    return NextResponse.next()
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL(CLIENT_PATH.LOGIN, request.url))
  }
}

export const config = {
  matcher: [
    '/likes',
    '/profile',
    '/requests',
    '/requests/:path*',
    '/events/lucky-draw/result/:path*',
    '/events/gifticon',
    '/events/gifticon/:path*',
  ],
}
