import type { Meta, StoryObj } from '@storybook/nextjs'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
    },
    as: {
      control: { type: 'text' },
      description: 'Polymorphic prop: 렌더링할 HTML 태그나 컴포넌트',
    },
    className: {
      control: false,
    },
    children: {
      control: 'text',
    },
  },
  args: {
    size: 'medium',
    children: 'Button',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Button',
  },
}

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium Button',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
}

export const AsLink: Story = {
  args: {
    as: 'a',
    href: '#',
    size: 'medium',
    children: 'Link Button',
  },
}
