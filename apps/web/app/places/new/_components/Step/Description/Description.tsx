import { Title } from '@/places/new/_components/Tilte'
import { Textarea } from '@repo/ui/components/Textarea'
import { useState } from 'react'
import { Flex } from '@repo/ui/components/Layout'
import { Chip } from '@repo/ui/components/Chip'
import { IconType } from '@repo/ui/components/Icon'

const CHIP_TAGS: {
  id: number
  label: string
  icon: IconType
}[] = [
  {
    id: 1,
    label: '혼밥하기 좋은',
    icon: 'fingerUp',
  },
  {
    id: 2,
    label: '가성비 좋은',
    icon: 'calculator',
  },
  {
    id: 3,
    label: '분위기 좋은',
    icon: 'blingBling',
  },
  {
    id: 4,
    label: '친절해요',
    icon: 'waiter',
  },
]

export const Description = () => {
  const [value, setValue] = useState<string>('')

  return (
    <>
      <Title
        title={'내가 알리고 싶은 맛집의 비밀은?'}
        description={'아쉬운 점도 함께 자유롭게 작성할 수록 좋아요!'}
      />
      <Textarea value={value} setValue={setValue} />
      <Flex className='mt-10 flex-wrap gap-2'>
        {CHIP_TAGS.map((category) => (
          <Chip
            as={'button'}
            key={category.id}
            icon={category.icon}
            label={category.label}
            onToggle={() => {
              console.log(`${category.label} 클릭됨!`)
            }}
          />
        ))}
      </Flex>
    </>
  )
}
