import { z } from 'zod'
import { CategorySchema } from '@/_apis/schemas/category'
import { CAMPUS_LIST } from '@/_constants/campus'

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

export const PlaceByPreviewSchema = z.object({
  alreadyRegistered: z.boolean(),
  placeName: z.string(),
  address: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  photos: z.array(
    z.object({
      photoId: z.number().transform(String),
      photoUrl: z.url(),
      displayOrder: z.number(),
    }),
  ),
  menus: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      isRecommended: z.boolean(),
    }),
  ),
})

export const NewPlaceRequestSchema = z.object({
  kakaoPlaceId: z.string(),
  campus: z.enum(CAMPUS_LIST),
  description: z.string().nonempty('설명을 입력해주세요'),
  menus: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      isRecommended: z.boolean(),
    }),
  ),
  tagIds: z.array(z.string()),
  categoryIds: z
    .array(z.string())
    .min(1, '카테고리를 최소 1개 이상 선택해주세요'),
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
export type PlaceByPreview = z.infer<typeof PlaceByPreviewSchema>
export type NewPlaceRequest = z.infer<typeof NewPlaceRequestSchema>
