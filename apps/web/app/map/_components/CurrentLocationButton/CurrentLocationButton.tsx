'use client'

import { motion } from 'motion/react'
import { Icon } from '@repo/ui/components/Icon'
import { cn } from '@repo/ui/utils/cn'

type Props = {
  onClick: VoidFunction
  isCenteredOnUser: boolean
  previewPlaceId: string | null
}
const windowHeight = Math.floor(window.innerHeight * 0.2) + 10
export const CurrentLocationButton = ({
  onClick,
  isCenteredOnUser,
  previewPlaceId,
}: Props) => {
  return (
    <motion.button
      initial={{ bottom: windowHeight }}
      animate={{ bottom: previewPlaceId ? 220 : windowHeight }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
      onClick={onClick}
      aria-label='내 위치로 이동'
      className={cn(
        'flex items-center justify-center rounded-full bg-white p-1.5 shadow-md',
        'z-1 absolute right-4',
      )}
    >
      <Icon
        type='crosshairs'
        color={isCenteredOnUser ? '--color-blue' : '--color-gray-200'}
      />
    </motion.button>
  )
}
