import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { CLIENT_PATH } from 'app/_constants/path'

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    return NextResponse.redirect(new URL(CLIENT_PATH.LOGIN, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/likes',
    '/profile',

    // '/places/new',
    // '/places/new/success',
    // '/places/new/fail',

    '/requests',
    '/requests/:path*',

    '/events/lucky-draw',
    '/events/gifticon',
    '/events/gifticon/:path*',
  ],
}
