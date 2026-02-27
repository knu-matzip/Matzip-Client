'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, stagger, type Variants } from 'motion/react'
import { CLIENT_PATH } from '@/_constants/path'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEventQueries } from '@/_apis/queries/event'
import { getCookie } from '@/_utils/getCookie'

import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'
import { Button } from '@repo/ui/components/Button'
import { Column, Flex, VerticalScrollArea } from '@repo/ui/components/Layout'

type Props = {
  nextStep: VoidFunction
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.4, { from: 'first' }),
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const EventWelcome = ({ nextStep }: Props) => {
  const { replace } = useRouter()
  const { data } = useSuspenseQuery(useEventQueries.byPublic())

  // 진행 중인 이벤트가 없는 경우, 첫 번째 단계로 리다이렉트
  useEffect(() => {
    if (!data) {
      replace(`${CLIENT_PATH.PLACE_NEW}?step=1`)
    }
  }, [replace, data])

  if (!data) {
    return null
  }

  const { prize } = data

  return (
    <VerticalScrollArea
      as={motion.div}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className={'flex-1 justify-between gap-10'}
    >
      <motion.div variants={itemVariants}>
        <Title />
      </motion.div>

      <motion.div variants={itemVariants} className='flex justify-center'>
        <Prize {...prize} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <NextStepButton nextStep={nextStep} />
      </motion.div>
    </VerticalScrollArea>
  )
}

const Title = () => (
  <Column className={'items-center gap-2'}>
    <Text fontSize={'2xl'} fontWeight={'bold'}>
      근처 맛집을 간단하게 알리고
    </Text>
    <Flex className={'gap-2'}>
      <Icon type={'headerGift'} size={28} />
      <Text fontSize={'2xl'} fontWeight={'bold'}>
        기프티콘 응모권 까지!!
      </Text>
      <Icon type={'headerGift'} size={28} />
    </Flex>
    <Text variant={'body3'} className={'mt-2 text-center text-gray-300'}>
      작은 정보가 행운의 기회가 될 수 있어요.
      <br />
      지금 바로 등록해보세요.
    </Text>
  </Column>
)

const Prize = ({
  description,
  imageUrl,
}: {
  description: string
  imageUrl: string
}) => {
  return (
    <Column className={'gap-15 items-center'}>
      <Image
        src={imageUrl}
        alt={description}
        width={220}
        height={220}
        priority
      />
      <Column className='items-center gap-1'>
        <Text variant={'body1'} className='text-gray-400'>
          이번 주 행운의 상품
        </Text>
        <Text variant={'heading2'} className='text-gray-800'>
          {description}
        </Text>
      </Column>
    </Column>
  )
}

const NextStepButton = ({ nextStep }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    const checkToken = async () => {
      const token = await getCookie('accessToken')
      setIsLoggedIn(!!token)
    }
    checkToken()
  }, [])

  return (
    <Column className={'gap-4'}>
      {isLoggedIn === false && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className='rounded-lg bg-gray-50 p-3 text-center'
        >
          <Text
            fontSize={'sm'}
            fontWeight={'semibold'}
            className={'text-gray-500'}
          >
            잠깐! 로그인이 되어있지 않으시네요 👀
            <br />
            <Link
              className='text-blue-500 underline underline-offset-2'
              href={CLIENT_PATH.LOGIN}
            >
              로그인
            </Link>
            해야 응모권을 받을 수 있어요!
          </Text>
        </motion.div>
      )}

      <Button
        size={'medium'}
        type={'button'}
        className={'ui:min-w-full'}
        onClick={nextStep}
      >
        참여하기
      </Button>
    </Column>
  )
}
