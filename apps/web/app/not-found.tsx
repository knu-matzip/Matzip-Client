'use client'

import Link from 'next/link'
import { Text } from '@repo/ui/components/Text'
import { Button } from '@repo/ui/components/Button'
import { Column } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { motion } from 'motion/react'
import { CLIENT_PATH } from '@/_constants/path'

export default function NotFound() {
  return (
    <Column className={'flex-1 items-center justify-around p-5'}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Column className={'gap-2'}>
          <Text
            as={'h1'}
            fontWeight={'semibold'}
            className='text-center text-6xl'
          >
            404 ERROR
          </Text>
          <div className='text-center leading-7'>
            <Text>죄송합니다. 해당 페이지를 찾을 수 없습니다.</Text>
            <Text>존재하지 않는 주소를 입력하셨거나,</Text>
            <Text>
              요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
            </Text>
          </div>
        </Column>
      </motion.div>

      <motion.div
        initial={{ y: 0 }}
        animate={{
          y: [0, 30, 0],
        }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className='mb-30'
      >
        <Icon type={'ghost'} size={200} />
      </motion.div>
      <Button as={Link} size={'large'} href={CLIENT_PATH.MAIN}>
        홈으로
      </Button>
    </Column>
  )
}
