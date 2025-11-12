import { queryOptions } from '@tanstack/react-query'
import {
  getPublicEventInfo,
  getPrivateEventInfo,
  getEventResult,
} from '@/_apis/services/event'

export const EventQueryKeys = {
  all: () => ['event'] as const,
  publicInfo: () => [...EventQueryKeys.all(), 'info', 'public'] as const,
  privateInfo: () => [...EventQueryKeys.all(), 'info', 'private'] as const,
  result: () => [...EventQueryKeys.all(), 'result'] as const,
}

export const useEventQueries = {
  publicInfo: () =>
    queryOptions({
      queryKey: EventQueryKeys.publicInfo(),
      queryFn: getPublicEventInfo,
    }),
  privateInfo: () =>
    queryOptions({
      queryKey: EventQueryKeys.privateInfo(),
      queryFn: getPrivateEventInfo,
    }),
  result: () =>
    queryOptions({
      queryKey: EventQueryKeys.result(),
      queryFn: getEventResult,
    }),
}
