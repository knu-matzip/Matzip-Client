import { z } from 'zod'
import { CategorySchema } from '@/_apis/schemas/category'

export const BasePlaceSchema = z.object({
  placeId: z.number().transform(String),
  placeName: z.string(),
  address: z.string(),
  categories: z.array(CategorySchema),
  tags: z.array(CategorySchema),
})

export type RankingPlaceSort = 'views' | 'likes'

export type BasePlace = z.infer<typeof BasePlaceSchema>
