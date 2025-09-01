import { useEffect, useRef } from 'react'
import { Column } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { cn } from '@repo/ui/utils/cn'
import type { Category } from '@/_apis/schemas/category'

type Props = {
  category: Category
  isActive: boolean
  onClick: VoidFunction
}

export const CategoryItem = ({ category, isActive, onClick }: Props) => {
  const activeCategory = useRef<HTMLButtonElement>(null)
  const { iconKey, name } = category

  useEffect(() => {
    activeCategory.current?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    })
  }, [isActive])

  return (
    <Column
      as={'button'}
      onClick={onClick}
      className={'w-10 items-center gap-1'}
      ref={(el) => {
        if (isActive) activeCategory.current = el
      }}
    >
      <Icon type={iconKey} size={26} />
      <Text
        fontSize={'xs'}
        fontWeight={isActive ? 'semibold' : 'light'}
        className={'text-nowrap'}
      >
        {name}
      </Text>
      <hr
        className={cn('border-main w-full rounded-full border-2', {
          invisible: !isActive,
        })}
      />
    </Column>
  )
}
