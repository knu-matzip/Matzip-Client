import { z } from 'zod'

export const PrizeSchema = z.nullable(
  z.object({
    description: z.string(),
    imageUrl: z.string(),
  }),
)

export const PublicEventSchema = z.object({
  prize: PrizeSchema,
})

// Todo: API에서 진행 중인 이벤트가 없는 경우에 대한 명확한 응답이 필요할 것 같습니다. (예: data: null 등)
export const PrivateEventSchema = z.object({
  eventId: z.nullable(z.number().transform(String)),
  prize: PrizeSchema,
  totalWinnersCount: z.number(),
  participantsCount: z.number(),
  usedTicketsCount: z.number(),
  remainingTicketsCount: z.number(),
  eventEndDate: z.nullable(z.string()),
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
export type EventResult = z.infer<typeof EventResultSchema>
export type WinnerPhoneNumber = z.infer<typeof WinnerPhoneNumberSchema>
