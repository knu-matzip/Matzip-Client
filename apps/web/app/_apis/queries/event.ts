import { queryOptions } from '@tanstack/react-query'
import {
  getPublicEventInfo,
  getPrivateEventInfo,
  getEventResult,
  getEntriesEvent,
} from '@/_apis/services/event'

export const EventQueryKeys = {
  all: () => ['event'] as const,
  publicInfo: () => [...EventQueryKeys.all(), 'info', 'public'] as const,
  privateInfo: () => [...EventQueryKeys.all(), 'info', 'private'] as const,
  entry: () => [...EventQueryKeys.all(), 'entry'] as const,
  result: (eventId: string) =>
    [...EventQueryKeys.all(), 'result', eventId] as const,
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
  entry: () =>
    queryOptions({
      queryKey: EventQueryKeys.entry(),
      queryFn: getEntriesEvent,
    }),
  result: (eventId: string) =>
    queryOptions({
      queryKey: EventQueryKeys.result(eventId),
      queryFn: () => getEventResult(eventId),
    }),
}
