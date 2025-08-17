import { queryOptions } from '@tanstack/react-query'
import { getCategories } from '@/_apis/services/category'

export const CategoryQueryKeys = {
  all: () => ['category'] as const,
  list: () => [...CategoryQueryKeys.all(), 'list'] as const,
  items: (categoryId: string) =>
    [...CategoryQueryKeys.all(), 'items', categoryId] as const,
}

export const useCategoryQueries = {
  list: () =>
    queryOptions({
      queryKey: CategoryQueryKeys.list(),
      queryFn: getCategories,
    }),
}
