import { z } from 'zod'

export const EventPrizeSchema = z.object({
  description: z.string(),
  imageUrl: z.string(),
})

export const BaseEventSchema = z.object({
  eventId: z.number().transform(String),
  prize: EventPrizeSchema,
  totalWinnersCount: z.number(),
  participantsCount: z.number(),
  eventEndDate: z.string(),
})

export const EventByPublicSchema = z.nullable(
  z.object({
    prize: EventPrizeSchema,
  }),
)

export const EventByPrivateSchema = z.nullable(
  BaseEventSchema.extend({
    usedTicketsCount: z.number(),
    remainingTicketsCount: z.number(),
  }),
)

export const EventEntrySchema = BaseEventSchema

export const EventResultSchema = z.object({
  eventId: z.number().transform(String),
  isWinner: z.boolean(),
  participantsCount: z.number(),
  usedTicketsCount: z.number(),
})

export const EventWinnerPhoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, '전화번호를 입력해주세요.')
    .regex(
      /^010-\d{4}-\d{4}$/,
      '올바른 형식으로 입력해주세요 (예: 010-1234-5678)',
    ),
})

export type EventByPublic = z.infer<typeof EventByPublicSchema>
export type EventByPrivate = z.infer<typeof EventByPrivateSchema>
export type EventEntry = z.infer<typeof EventEntrySchema>
export type EventResult = z.infer<typeof EventResultSchema>
export type EventWinnerPhone = z.infer<typeof EventWinnerPhoneSchema>
