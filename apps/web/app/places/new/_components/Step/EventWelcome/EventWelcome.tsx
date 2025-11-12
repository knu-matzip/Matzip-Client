import Image from 'next/image'
import { motion } from 'motion/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEventQueries } from '@/_apis/queries/event'

import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'
import { Button } from '@repo/ui/components/Button'
import { Column, Flex } from '@repo/ui/components/Layout'

type Props = {
  nextStep: VoidFunction
}

export const EventWelcome = ({ nextStep }: Props) => {
  const { data } = useSuspenseQuery(useEventQueries.publicInfo())
  const { prize } = data

  return (
    <Column className={'flex-1 justify-between gap-10 pt-5'}>
      <Title />
      <Prize {...prize} />
      <NextStepButton nextStep={nextStep} />
    </Column>
  )
}

const Title = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 40 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className={'flex flex-col items-center'}
  >
    <Text fontSize={'2xl'} fontWeight={'bold'}>
      근처 맛집을 간단하게 알리고
    </Text>
    <Flex className={'gap-1'}>
      <Icon type={'headerGift'} />
      <Text fontSize={'2xl'} fontWeight={'bold'}>
        기프티콘 응모권 까지!!
      </Text>
      <Icon type={'headerGift'} />
    </Flex>
    <Text variant={'body3'} className={'text-gray-300'}>
      작은 정보가 행운의 기회가 될 수 있어요. 지금 등록해보세요.
    </Text>
  </motion.div>
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
      <Text fontSize={'2xl'} fontWeight={'bold'}>
        이번주 행운의 상품은?
      </Text>
      <Image src={imageUrl} alt={'상품 이미지'} width={200} height={200} />
      <Text variant={'title3'}>{description}</Text>
    </Column>
  )
}

const NextStepButton = ({ nextStep }: Props) => (
  <Column className={'gap-4'}>
    <Text
      fontSize={'sm'}
      fontWeight={'semibold'}
      className={'mx-auto text-gray-300'}
    >
      잠깐!
      <br />
      로그인이 되어 있지 않으면 응모권 지급이 이뤄지지 않아요!
    </Text>
    <Button
      size={'medium'}
      type={'button'}
      className={'ui:min-w-full'}
      onClick={nextStep}
    >
      다음
    </Button>
  </Column>
)
