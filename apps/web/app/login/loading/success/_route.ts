// import { NextRequest, NextResponse } from 'next/server'
// import axiosInstanceV2 from '@/_lib/axiosInstanceV2'
// import { API_PATH, CLIENT_PATH } from '@/_constants/path'
//
// export const GET = async (request: NextRequest) => {
//   try {
//     const searchParams = request.nextUrl.searchParams
//     const code = searchParams.get('code') || ''
//     const redirectUri =
//       (process.env.NEXT_PUBLIC_CLIENT_URL || '') + CLIENT_PATH.LOGIN_SUCCESS
//
//     // 백엔드로 OAuth 인증 요청
//     const response = await axiosInstanceV2.get(
//       API_PATH.AUTH.AUTHORIZE(code, redirectUri),
//     )
//
//     // 브라우저로 리다이렉트 응답 준비
//     const nextRes = NextResponse.redirect(
//       new URL(CLIENT_PATH.MAIN, request.url),
//     )
//
//     const accessToken = response?.data?.data
//     if (accessToken) {
//       nextRes.cookies.set('accessToken', accessToken, {
//         path: '/',
//         httpOnly: false,
//       })
//     }
//
//     const backendCookies = response.headers['set-cookie']
//     if (backendCookies) {
//       backendCookies.forEach((cookie) => {
//         nextRes.headers.append('Set-Cookie', cookie)
//       })
//     }
//
//     return nextRes
//   } catch (error) {
//     console.log(error)
//     return NextResponse.json(
//       { message: 'Internal Server Error' },
//       { status: 500 },
//     )
//   }
// }
