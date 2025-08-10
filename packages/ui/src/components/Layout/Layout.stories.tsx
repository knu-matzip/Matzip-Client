import type { Meta, StoryObj } from '@storybook/nextjs'
import { Flex, Column, JustifyAround, JustifyBetween, JustifyEnd } from '.'
import '../../styles.css'

const meta = {
  title: 'components/Layout',
  component: Flex,
  tags: ['autodocs'],
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: (args) => (
    <Flex {...args} className={'ui:w-1/2 ui:p-[10px] ui:bg-gray-300 ui:gap-1'}>
      <div className='ui:h-10 ui:w-10 ui:bg-gray-200' />
      <div className='ui:h-10 ui:w-10 ui:bg-gray-200' />
      <div className='ui:h-10 ui:w-10 ui:bg-gray-200' />
    </Flex>
  ),
}

export const BasicJustifyEnd: Story = {
  render: (args) => (
    <JustifyEnd
      {...args}
      className={'ui:w-1/2 ui:p-[10px] ui:bg-gray-300 ui:gap-1'}
    >
      <div className='ui:h-10 ui:w-10 ui:bg-gray-200' />
      <div className='ui:h-10 ui:w-10 ui:bg-gray-200' />
      <div className='ui:h-10 ui:w-10 ui:bg-gray-200' />
    </JustifyEnd>
  ),
}

export const BasicJustifyAround: Story = {
  render: (args) => (
    <JustifyAround {...args} className={'ui:w-1/2 ui:p-[10px] ui:bg-gray-300'}>
      <div className='ui:h-10 ui:w-10 ui:bg-gray-200' />
      <div className='ui:h-10 ui:w-10 ui:bg-gray-200' />
      <div className='ui:h-10 ui:w-10 ui:bg-gray-200' />
    </JustifyAround>
  ),
}

export const BasicJustifyBetween: Story = {
  render: (args) => (
    <JustifyBetween {...args} className={'ui:w-1/2 ui:p-[10px] ui:bg-gray-300'}>
      <div className='ui:h-10 ui:w-10 ui:bg-gray-200' />
      <div className='ui:h-10 ui:w-10 ui:bg-gray-200' />
      <div className='ui:h-10 ui:w-10 ui:bg-gray-200' />
    </JustifyBetween>
  ),
}

export const BasicColumn: Story = {
  render: (args) => (
    <Column
      {...args}
      className={'ui:w-fit ui:p-[10px] ui:bg-gray-300 ui:gap-1'}
    >
      <div className='ui:h-10 ui:w-10 ui:bg-gray-200' />
      <div className='ui:h-10 ui:w-10 ui:bg-gray-200' />
      <div className='ui:h-10 ui:w-10 ui:bg-gray-200' />
    </Column>
  ),
}
