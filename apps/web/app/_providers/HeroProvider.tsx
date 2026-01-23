'use client'

import { HeroUIProvider } from '@heroui/system'
import { ToastProvider } from '@heroui/react'

export const HeroProvider = ({ children }: { children: React.ReactNode }) => (
  <HeroUIProvider>
    <ToastProvider placement={'top-center'} toastOffset={60} />
    {children}
  </HeroUIProvider>
)
