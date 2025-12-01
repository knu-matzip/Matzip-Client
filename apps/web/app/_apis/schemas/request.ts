import { z } from 'zod'
import { CategorySchema } from '@/_apis/schemas/category'
import { PlaceDetailSchema } from '@/_apis/schemas/place'

const registerStatus = z.enum(['PENDING', 'APPROVED', 'REJECTED'])

export const RequestSchema = z.object({
  placeId: z.number().transform(String),
  placeName: z.string(),
  categories: z.array(CategorySchema),
  requestDate: z.string(),
  registerStatus,
})

export const RequestDetailSchema = PlaceDetailSchema.omit({
  isLiked: true,
}).extend({
  registerStatus,
  rejectedReason: z.nullable(z.string()),
})

export type Request = z.infer<typeof RequestSchema>
export type RequestDetail = z.infer<typeof RequestDetailSchema>
