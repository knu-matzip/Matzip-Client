import { type Control, Controller } from 'react-hook-form'
import type { NewPlaceRequest } from '@/_apis/schemas/place'
import type { IconType } from '@repo/ui/components/Icon'
import { Flex } from '@repo/ui/components/Layout'
import { Chip } from '@repo/ui/components/Chip'

const CHIP_TAGS: {
  id: string
  label: string
  icon: IconType
}[] = [
  {
    id: '1',
    label: '혼밥하기 좋은',
    icon: 'fingerUp',
  },
  {
    id: '2',
    label: '가성비 좋은',
    icon: 'calculator',
  },
  {
    id: '3',
    label: '분위기 좋은',
    icon: 'blingBling',
  },
  {
    id: '4',
    label: '친절해요',
    icon: 'waiter',
  },
  {
    id: '5',
    label: '빨리 나와요',
    icon: 'lightning',
  },
  {
    id: '6',
    label: '양이 많아요',
    icon: 'pig',
  },
]

type Props = {
  control: Control<NewPlaceRequest>
  tagInitialValues: string[]
}

export const Tags = ({ control, tagInitialValues }: Props) => {
  return (
    <Controller
      control={control}
      name='tagIds'
      defaultValue={[]}
      render={({ field }) => {
        const selectedIds: string[] = field.value || []

        const handleToggle = (id: string) => {
          let newSelected: string[]
          if (selectedIds.includes(id)) {
            newSelected = selectedIds.filter((i) => i !== id)
          } else {
            newSelected = [...selectedIds, id]
          }
          field.onChange(newSelected)
        }

        return (
          <Flex className='mt-10 flex-wrap gap-2'>
            {CHIP_TAGS.map((category) => (
              <Chip
                type={'button'}
                as='button'
                key={category.id}
                icon={category.icon}
                label={category.label}
                onToggle={() => handleToggle(category.id)}
                initialActiveValue={tagInitialValues.includes(category.id)}
              />
            ))}
          </Flex>
        )
      }}
    />
  )
}
