'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, stagger, type Variants } from 'motion/react'
import { CLIENT_PATH } from '@/_constants/path'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEventQueries } from '@/_apis/queries/event'
import { getCookie } from '@/_utils/getCookie'
import { EventTitle } from '@/events/lucky-draw/_components/EventTitle'
import { EventPrizeCard } from '@/events/lucky-draw/_components/EventPrizeCard'

import { Text } from '@repo/ui/components/Text'
import { Button } from '@repo/ui/components/Button'
import { Column, VerticalScrollArea } from '@repo/ui/components/Layout'

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

  const { prize, totalWinnersCount, participantsCount } = data

  return (
    <VerticalScrollArea
      as={motion.div}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className={'flex-1 justify-between gap-10'}
    >
      <motion.div variants={itemVariants}>
        <EventTitle />
      </motion.div>

      <motion.div variants={itemVariants} className='flex flex-col gap-3'>
        <EventPrizeCard
          {...prize}
          totalWinnersCount={totalWinnersCount}
          participantsCount={participantsCount}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <NextStepButton nextStep={nextStep} />
      </motion.div>
    </VerticalScrollArea>
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
