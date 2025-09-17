import axiosInstance from '@/_lib/axiosInstance'
import { API_PATH } from '@/_constants/path'
import { EventSchema, type Event } from '@/_apis/schemas/event'

export const getEventInfo = async (): Promise<Event> => {
  const { data } = await axiosInstance.get(API_PATH.EVENT.INFO)
  return EventSchema.parse(data)
}

export const participationEvent = async (body: {
  eventId: string
  ticketsCount: number
}) => {
  const { data } = await axiosInstance.post(API_PATH.EVENT.PARTICIPATIONS, body)
  return data
}
