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
  const { data } = await axiosInstance.get(API_PATH.EVENT.INFO)
  return PublicEventSchema.parse(data)
}

export const getPrivateEventInfo = async (): Promise<PrivateEvent> => {
  const { data } = await axiosInstance.get(API_PATH.EVENT.INFO)
  return PrivateEventSchema.parse(data)
}

export const participationEvent = async (body: {
  eventId: string
  ticketsCount: number
}) => {
  const { data } = await axiosInstance.post(API_PATH.EVENT.PARTICIPATIONS, body)
  return data
}

export const getEventResult = async (): Promise<EventResult | null> => {
  const { data } = await axiosInstance.get(API_PATH.EVENT.RESULT)
  return EventResultSchema.parse(data)
}
