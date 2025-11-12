import axiosInstance from '@/_lib/axiosInstance'
import { API_PATH } from '@/_constants/path'
import {
  PrivateEventSchema,
  PublicEventSchema,
  EventResultSchema,
  type EventResult,
  type PrivateEvent,
  type PublicEvent,
} from '@/_apis/schemas/event'

export const getPublicEventInfo = async (): Promise<PublicEvent> => {
  const { data: response } = await axiosInstance.get(API_PATH.EVENT.INFO)
  const { data } = response
  return PublicEventSchema.parse(data)
}

export const getPrivateEventInfo = async (): Promise<PrivateEvent> => {
  const { data: response } = await axiosInstance.get(API_PATH.EVENT.INFO)
  const { data } = response
  return PrivateEventSchema.parse(data)
}

export const participationEvent = async (body: {
  eventId: string
  ticketsCount: number
}) => {
  const { data: response } = await axiosInstance.post(
    API_PATH.EVENT.PARTICIPATIONS,
    body,
  )
  const { data } = response
  return data
}

export const getEventResult = async (): Promise<EventResult | null> => {
  const { data: response } = await axiosInstance.get(API_PATH.EVENT.RESULT)
  const { data } = response
  return EventResultSchema.parse(data)
}
