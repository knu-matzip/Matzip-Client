import type { Category } from '@/_apis/schemas/category'
import { Flex } from '@repo/ui/components/Layout'
import { CategoryItem } from './CategoryItem'
import { cn } from '@repo/ui/utils/cn'

type Props = {
  categories: Category[]
  id: string
  setId: (id: string) => void
}

export const RowCategories = ({ id, categories, setId }: Props) => {
  return (
    <div className={'relative px-5 py-2.5'}>
      <Flex className={'scrollbar-hide gap-4 overflow-x-auto'}>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isActive={id === category.id}
            onClick={() => {
              setId(category.id)
            }}
          />
        ))}
      </Flex>
      <ScrollHintGradient />
    </div>
  )
}

const ScrollHintGradient = () => (
  <div
    className={cn(
      'absolute',
      'right-[-1px] top-0',
      'h-full w-10',
      'z-10',
      'pointer-events-none',
      'bg-gradient-to-l from-white to-transparent',
    )}
  />
)
