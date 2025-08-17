'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useCategoryQueries } from '@/_apis/queries/category'
import { cn } from '@repo/ui/utils/cn'
import { CategoryItem } from './CategoryItem'

export const Categories = () => {
  const { data: categories } = useSuspenseQuery(useCategoryQueries.list())

  return (
    <div
      className={cn('grid grid-flow-row grid-cols-5 gap-y-6', 'px-7.5 py-2.5')}
    >
      {categories.map((category) => (
        <CategoryItem key={category.id} {...category} />
      ))}
    </div>
  )
}
