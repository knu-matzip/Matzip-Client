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
      <Chip chipType='SOLO_FRIENDLY' />
      <Chip chipType='GOOD_AMBIENCE' />
      <Chip chipType='VALUE_FOR_MONEY' />
      <Chip chipType='KIND_SERVICE' />
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
      ).map((chipType) => (
        <Chip
          key={chipType}
          chipType={chipType}
          onToggle={() => {
            console.log(`${chipType} 클릭됨!`)
          }}
        />
      ))}
    </Flex>
  ),
}
