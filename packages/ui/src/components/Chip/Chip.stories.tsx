import type { Meta, StoryObj } from '@storybook/nextjs'
import { Chip } from './Chip'
import { Flex } from '../Layout'
import { IconType } from '../Icon'

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

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Chip>

export const Default: Story = {
  render: () => (
    <Flex className='ui:gap-2'>
      {CHIP_TAGS.map((category) => (
        <Chip key={category.id} icon={category.icon} label={category.label} />
      ))}
    </Flex>
  ),
}

export const ClickableChips: Story = {
  render: () => (
    <Flex className='ui:gap-2'>
      {CHIP_TAGS.map((category) => (
        <Chip
          key={category.id}
          icon={category.icon}
          label={category.label}
          onToggle={() => {
            console.log(`${category.label} 클릭됨!`)
          }}
        />
      ))}
    </Flex>
  ),
}
