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

export const getEventResult = async (
  eventId: string,
): Promise<EventResult | null> => {
  const { data } = await axiosInstance.get(API_PATH.EVENT.RESULT(eventId))
  return EventResultSchema.parse(data)
}

// TODO: API 명세 확정 후 (인자, 반환값) 명확히 하기
export const submitWinnerPhoneNumber = async (
  eventId: string,
  phoneNumber: string,
): Promise<void> => {
  await axiosInstance.post(API_PATH.EVENT.APPLY(eventId), {
    phoneNumber,
  })
}
