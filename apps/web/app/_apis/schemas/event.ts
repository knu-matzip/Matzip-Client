import { z } from 'zod'

export const PublicEventSchema = z.object({
  prize: z.object({
    description: z.string(),
    imageUrl: z.string(),
  }),
})

export const PrivateEventSchema = z.object({
  eventId: z.string(),
  prize: z.object({
    description: z.string(),
    imageUrl: z.string(),
  }),
  totalWinnersCount: z.number(),
  participantsCount: z.number(),
  usedTicketsCount: z.number(),
  remainingTicketsCount: z.number(),
  eventEndDate: z.string(),
})

export const EventResultSchema = z.object({
  eventId: z.string(),
  isWinner: z.boolean(),
  participantsCount: z.number(),
  usedTicketsCount: z.number(),
})

export type PublicEvent = z.infer<typeof PublicEventSchema>
export type PrivateEvent = z.infer<typeof PrivateEventSchema>
export type EventResult = z.infer<typeof EventResultSchema>
