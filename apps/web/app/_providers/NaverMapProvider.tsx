'use client'

import { NavermapsProvider } from 'react-naver-maps'
import { ReactNode } from 'react'

export const NaverMapProvider = ({ children }: { children: ReactNode }) => {
  const ncpKeyId = process.env.NEXT_PUBLIC_NAVER_MAP_ID || ''

  return <NavermapsProvider ncpKeyId={ncpKeyId}>{children}</NavermapsProvider>
}
