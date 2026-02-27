import { queryOptions } from '@tanstack/react-query'
import {
  getEventByPublic,
  getEventByPrivate,
  getEventResult,
  getEventByEntries,
} from '@/_apis/services/event'

export const EventQueryKeys = {
  all: () => ['event'] as const,
  byPublic: () => [...EventQueryKeys.all(), 'info', 'public'] as const,
  byPrivate: () => [...EventQueryKeys.all(), 'info', 'private'] as const,
  byEntry: () => [...EventQueryKeys.all(), 'entry'] as const,
  result: (eventId: string) =>
    [...EventQueryKeys.all(), 'result', eventId] as const,
}

export const useEventQueries = {
  byPublic: () =>
    queryOptions({
      queryKey: EventQueryKeys.byPublic(),
      queryFn: getEventByPublic,
    }),
  byPrivate: () =>
    queryOptions({
      queryKey: EventQueryKeys.byPrivate(),
      queryFn: getEventByPrivate,
    }),
  byEntry: () =>
    queryOptions({
      queryKey: EventQueryKeys.byEntry(),
      queryFn: getEventByEntries,
    }),
  result: (eventId: string) =>
    queryOptions({
      queryKey: EventQueryKeys.result(eventId),
      queryFn: () => getEventResult(eventId),
    }),
}
