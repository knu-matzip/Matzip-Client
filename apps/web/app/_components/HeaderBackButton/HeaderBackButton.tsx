'use client'

import { Icon } from '@repo/ui/components/Icon'
import { useRouter } from 'next/navigation'

export const HeaderBackButton = () => {
  const { back } = useRouter()

  return (
    <button onClick={back}>
      <Icon type={'arrowLeft'} size={24} />
    </button>
  )
}
