import { z } from 'zod'
import { CategorySchema } from '@/_apis/schemas/category'

export const BasePlaceSchema = z.object({
  placeId: z.number().transform(String),
  placeName: z.string(),
  address: z.string(),
  categories: z.array(CategorySchema),
  tags: z.array(CategorySchema),
})

export const PlaceByMapSchema = BasePlaceSchema.extend({
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
})

export const PlaceDetailSchema = BasePlaceSchema.extend({
  photos: z.array(
    z.object({
      photoId: z.number().transform(String),
      photoUrl: z.url(),
      displayOrder: z.number(),
    }),
  ),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  isLiked: z.boolean(),
  description: z.string(),
  menus: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      isRecommended: z.boolean(),
    }),
  ),
})

export type RankingPlaceSort = 'views' | 'likes'
export type MapBounds = {
  minLatitude: number
  minLongitude: number
  maxLatitude: number
  maxLongitude: number
}

export type BasePlace = z.infer<typeof BasePlaceSchema>
export type PlaceByMap = z.infer<typeof PlaceByMapSchema>
export type PlaceDetail = z.infer<typeof PlaceDetailSchema>
