import type { Category as CategoryType } from '@/_apis/schemas/category'
import { cn } from '@repo/ui/utils/cn'
import { CategoryItem } from '@/places/new/_components/Step/Category/CategoryItem'

type Props = {
  categories: CategoryType[]
  addCategories: (category: CategoryType) => void
  includeInCategories: (category: CategoryType) => boolean
}

export const CategoryBox = ({
  categories,
  addCategories,
  includeInCategories,
}: Props) => {
  return (
    <div className={cn('grid grid-flow-row grid-cols-5 gap-y-6', 'py-2.5')}>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          addCategories={() => addCategories(category)}
          includeInCategories={includeInCategories(category)}
        />
      ))}
    </div>
  )
}
