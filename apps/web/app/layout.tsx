import '@repo/ui/styles.css'
import './globals.css'
import type { Metadata } from 'next'
import QueryProvider from './QueryClientProvider'
import localFont from 'next/font/local'
import { initServerMSW } from '@/_mocks/initMSW'
import { MSWProvider } from '@/_mocks/MSWProvider'
import { Column } from '@repo/ui/components/Layout'
import { NaverMapProvider } from '@/NaverMapProvider'
import { HeroProvider } from '@/HeroProvider'

export const metadata: Metadata = {
  title: '공주대 맛집',
  description: '공주대학교 캠퍼스별 근처 맛집',
  openGraph: {
    title: '공주대 맛집',
    description: `공주대학교 캠퍼스별 근처 맛집`,
    locale: 'ko-KR',
    siteName: 'knu-matzip.vercel.app',
    url: `https://knu-matzip.vercel.app`,
    type: 'website',
  },
  // verification: {
  //   google: "",
  // },
}

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await initServerMSW()

  return (
    <html lang='ko' suppressHydrationWarning={true}>
      <body className={pretendard.className}>
        <MSWProvider>
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
        </MSWProvider>
      </body>
    </html>
  )
}
