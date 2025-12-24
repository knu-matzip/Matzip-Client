'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'
import { Button } from '@repo/ui/components/Button'
import { Column } from '@repo/ui/components/Layout'
import { CLIENT_PATH } from '@/_constants/path'

type Props = {
  error: Error & { digest?: string }
  reset: VoidFunction
}

export default function ErrorPage({ error, reset }: Props) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <Column className={'gap-30 flex-1 items-center justify-center'}>
      <Column className={'items-center gap-2'}>
        <Icon type={'logo'} size={150} />
        <div className={'text-center'}>
          <Text fontSize={'lg'}>에러가 발생했어요</Text>
          <Text fontSize={'lg'}>페이지를 새로고침해주세요</Text>
        </div>
      </Column>
      <Column className={'items-center gap-2'}>
        <Button size={'medium'} onClick={reset} className='mb-2'>
          다시 시도
        </Button>
        <Link
          href={CLIENT_PATH.MAIN}
          className='text-sm text-gray-400 underline'
        >
          홈으로 이동
        </Link>
      </Column>
    </Column>
  )
}
