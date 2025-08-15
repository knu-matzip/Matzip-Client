import type { Meta, StoryObj } from '@storybook/nextjs'
import { Textarea } from './Textarea'
import { useState } from 'react'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

// Playground용 Wrapper 컴포넌트로 useState 관리
const TextareaWrapper = (
  props: Partial<React.ComponentProps<typeof Textarea>>,
) => {
  const [value, setValue] = useState('')
  return (
    <div className={'ui:w-100'}>
      <Textarea value={value} setValue={setValue} {...props} />
    </div>
  )
}

// 기본 스토리
export const Default: Story = {
  render: () => <TextareaWrapper placeholder='내용을 입력해주세요' />,
}

// maxLength 테스트
export const WithMaxLength: Story = {
  render: () => (
    <TextareaWrapper
      maxLength={50}
      placeholder='최대 50자까지 입력 가능합니다'
    />
  ),
}

// maxHeight 테스트
export const WithMaxHeight: Story = {
  render: () => (
    <TextareaWrapper maxHeight={150} placeholder='최대 높이 150px' />
  ),
}
