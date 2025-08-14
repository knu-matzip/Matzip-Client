import type { Meta, StoryObj } from '@storybook/nextjs'
import { Chip } from './Chip'
import { Flex } from '../Layout'

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
      <Chip type='SOLO_FRIENDLY' />
      <Chip type='GOOD_AMBIENCE' />
      <Chip type='VALUE_FOR_MONEY' />
      <Chip type='KIND_SERVICE' />
    </Flex>
  ),
}

export const ClickableChips: Story = {
  render: () => (
    <Flex className='ui:gap-2'>
      {(
        [
          'SOLO_FRIENDLY',
          'VALUE_FOR_MONEY',
          'GOOD_AMBIENCE',
          'KIND_SERVICE',
        ] as const
      ).map((type) => (
        <Chip
          key={type}
          type={type}
          onToggle={() => {
            console.log(`${type} 클릭됨!`)
          }}
        />
      ))}
    </Flex>
  ),
}
