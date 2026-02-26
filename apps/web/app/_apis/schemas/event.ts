import { z } from 'zod'

export const PrizeSchema = z.object({
  description: z.string(),
  imageUrl: z.string(),
})

export const PublicEventSchema = z.nullable(
  z.object({
    prize: PrizeSchema,
  }),
)

export const PrivateEventSchema = z.nullable(
  z.object({
    eventId: z.number().transform(String),
    prize: PrizeSchema,
    totalWinnersCount: z.number(),
    participantsCount: z.number(),
    usedTicketsCount: z.number(),
    remainingTicketsCount: z.number(),
    eventEndDate: z.string(),
  }),
)

export const EntryEventSchema = z.object({
  eventId: z.string(),
  prize: PrizeSchema,
  totalWinnersCount: z.number(),
  participantsCount: z.number(),
  eventEndDate: z.string(),
})

export const EventResultSchema = z.object({
  eventId: z.string(),
  isWinner: z.boolean(),
  participantsCount: z.number(),
  usedTicketsCount: z.number(),
})

export const WinnerPhoneNumberSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, '전화번호를 입력해주세요.')
    .regex(
      /^010-\d{4}-\d{4}$/,
      '올바른 형식으로 입력해주세요 (예: 010-1234-5678)',
    ),
})

export type PublicEvent = z.infer<typeof PublicEventSchema>
export type PrivateEvent = z.infer<typeof PrivateEventSchema>
export type EntryEvent = z.infer<typeof EntryEventSchema>
export type EventResult = z.infer<typeof EventResultSchema>
export type WinnerPhoneNumber = z.infer<typeof WinnerPhoneNumberSchema>
