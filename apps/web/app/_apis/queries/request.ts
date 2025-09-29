import { queryOptions } from '@tanstack/react-query'
import { getRequests } from '@/_apis/services/request'

export const RequestQueryKeys = {
  all: () => ['request'] as const,
  list: () => [...RequestQueryKeys.all(), 'list'] as const,
}

export const useRequestQueries = {
  list: () =>
    queryOptions({
      queryKey: RequestQueryKeys.list(),
      queryFn: getRequests,
    }),
}
