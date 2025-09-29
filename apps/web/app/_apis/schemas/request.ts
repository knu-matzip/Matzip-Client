import { z } from 'zod'
import { CategorySchema } from '@/_apis/schemas/category'

export const RequestSchema = z.object({
  placeId: z.number().transform(String),
  placeName: z.string(),
  categories: z.array(CategorySchema),
  requestDate: z.string(),
  registerStatus: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
})

export type Request = z.infer<typeof RequestSchema>
