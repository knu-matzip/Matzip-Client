'use client'

import dynamic from 'next/dynamic'
import { Spinner } from '@heroui/react'

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <Spinner className={'m-auto'} />,
})

export const MapContainer = () => <MapComponent />
