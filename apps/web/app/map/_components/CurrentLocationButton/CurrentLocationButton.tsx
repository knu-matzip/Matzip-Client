'use client'

import { Icon } from '@repo/ui/components/Icon'
import { cn } from '@repo/ui/utils/cn'

type Props = {
  onClick: VoidFunction
  isCenteredOnUser: boolean
}
const windowHeight = Math.floor(window.innerHeight * 0.2) + 10
export const CurrentLocationButton = ({ onClick, isCenteredOnUser }: Props) => {
  return (
    <button
      onClick={onClick}
      aria-label='내 위치로 이동'
      className={cn(
        'flex items-center justify-center rounded-full bg-white p-1.5 shadow-md',
        'z-1 absolute bottom-3 right-4',
      )}
      style={{ bottom: windowHeight }}
    >
      <Icon
        type='crosshairs'
        color={isCenteredOnUser ? '--color-blue' : '--color-gray-200'}
      />
    </button>
  )
}
