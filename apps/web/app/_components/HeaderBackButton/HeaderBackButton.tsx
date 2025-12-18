'use client'

import { Icon } from '@repo/ui/components/Icon'
import { useRouter } from 'next/navigation'

export const HeaderBackButton = ({ className }: { className?: string }) => {
  const { back } = useRouter()

  return (
    <button onClick={back} className={className}>
      <Icon type={'arrowLeft'} size={24} />
    </button>
  )
}
