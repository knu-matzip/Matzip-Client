'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'
import { Column } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { Button } from '@repo/ui/components/Button'

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang='ko'>
      <body>
        <div className='flex h-screen w-full items-center justify-center bg-white'>
          <Column className={'items-center gap-10'}>
            <div className={'text-center'}>
              <Text fontSize={'2xl'} fontWeight='bold'>
                시스템에 문제가 발생했습니다
              </Text>
              <Text className='mt-2 text-gray-500'>
                잠시 후 다시 시도해주세요.
              </Text>
            </div>
            <Button size={'medium'} onClick={() => window.location.reload()}>
              새로고침
            </Button>
          </Column>
        </div>
      </body>
    </html>
  )
}
