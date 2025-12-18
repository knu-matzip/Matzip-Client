'use client'

import Link from 'next/link'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'
import { Button } from '@repo/ui/components/Button'
import { Column } from '@repo/ui/components/Layout'
import { CLIENT_PATH } from '@/_constants/path'

export default function ErrorPage() {
  return (
    <Column className={'flex-1 items-center justify-center gap-20'}>
      <Column className={'items-center gap-2'}>
        <Icon type={'logo'} size={150} />
        <div className={'text-center'}>
          <Text fontSize={'lg'}>에러가 발생했어요</Text>
          <Text fontSize={'lg'}>페이지를 새로고침해주세요</Text>
        </div>
      </Column>
      <Button as={Link} size={'medium'} href={CLIENT_PATH.MAIN}>
        홈으로
      </Button>
    </Column>
  )
}
