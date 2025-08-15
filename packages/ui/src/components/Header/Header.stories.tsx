import type { Meta, StoryObj } from '@storybook/nextjs'
import type { ReactNode } from 'react'
import { Header, OnlyLeftHeader } from './Header'
import { Icon } from '../Icon'
import { Text } from '../Text'

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Header>

const Box = ({ children }: { children: ReactNode }) => (
  <div className={'ui:mx-auto ui:bg-gray-100 ui:h-[800px] ui:w-100'}>
    <div className={'ui:bg-white ui:mb-auto'}>{children}</div>
  </div>
)

// 기본 헤더: left, center, right 모두 존재
export const Default: Story = {
  render: () => (
    <Box>
      <Header
        left={<Icon type='arrowLeft' size={24} />}
        center={<Text variant={'heading2'}>페이지 제목</Text>}
        right={<Icon type='headerHeart' size={24} />}
      />
    </Box>
  ),
}

// right 없는 경우: invisible placeholder로 center 정렬 유지
export const WithoutRight: Story = {
  render: () => (
    <Box>
      <Header
        left={<Icon type='arrowLeft' size={24} />}
        center={<Text variant={'heading2'}>페이지 제목</Text>}
      />
    </Box>
  ),
}

// left만 존재
export const LeftOnly: Story = {
  render: () => (
    <Box>
      <OnlyLeftHeader icon={'markerWithMap'} name={'주변맛집'} />
    </Box>
  ),
}
