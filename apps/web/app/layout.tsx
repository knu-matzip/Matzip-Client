import '@repo/ui/styles.css'
import './globals.css'
import type { Metadata } from 'next'
import QueryProvider from './QueryClientProvider'
import localFont from 'next/font/local'
// import { initServerMSW } from '@/_mocks/initMSW'
// import { MSWProvider } from '@/_mocks/MSWProvider'
import { Column } from '@repo/ui/components/Layout'
import { NaverMapProvider } from '@/NaverMapProvider'
import { HeroProvider } from '@/HeroProvider'
import Script from 'next/script'

const SITE_URL = new URL('https://knu-matzip.vercel.app')

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    template: '공주대 맛집 | %s',
    default: '공주대 맛집',
  },
  description: '공주대학교 캠퍼스(천안, 공주, 예산) 근처 맛집을 찾아보세요.',
  openGraph: {
    title: '공주대 맛집',
    description: '공주대학교 캠퍼스별 맛집 정보',
    locale: 'ko-KR',
    siteName: '공주대 맛집',
    url: '/',
    type: 'website',
  },
  // verification: {
  //   google: "",
  // },
}

const pretendard = localFont({
  src: [
    {
      path: '../public/fonts/Pretendard-Thin-Subset.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-ExtraLight-Subset.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Light-Subset.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Regular-Subset.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Medium-Subset.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-SemiBold-Subset.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Bold-Subset.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-ExtraBold-Subset.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Black-Subset.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // await initServerMSW()

  return (
    <html lang='ko' suppressHydrationWarning={true}>
      <body className={pretendard.className}>
        {/*<MSWProvider>*/}
        <QueryProvider>
          <HeroProvider>
            <NaverMapProvider>
              <div className={'flex h-svh justify-center bg-[#FEFCF9]'}>
                <Column className={'relative w-full max-w-[450px] bg-white'}>
                  {children}
                </Column>
              </div>
            </NaverMapProvider>
          </HeroProvider>
        </QueryProvider>
        {/*</MSWProvider>*/}
        <Script
          src='https://t1.kakaocdn.net/kakao_js_sdk/2.7.9/kakao.min.js'
          integrity='sha384-JpLApTkB8lPskhVMhT+m5Ln8aHlnS0bsIexhaak0jOhAkMYedQoVghPfSpjNi9K1'
          crossOrigin='anonymous'
          strategy='lazyOnload'
        />
      </body>
    </html>
  )
}
