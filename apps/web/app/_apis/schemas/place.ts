import { z } from 'zod'
import { CategorySchema } from '@/_apis/schemas/category'
import { CAMPUS_LIST } from '@/_constants/campus'

const location = z.object({
  latitude: z.number(),
  longitude: z.number(),
})

const menus = z.array(
  z.object({
    menuId: z.number(),
    name: z.string(),
    price: z.number(),
    isRecommended: z.boolean(),
  }),
)

const photos = z.array(
  z.object({
    photoId: z.nullable(z.number().transform(String)),
    photoUrl: z.url(),
    displayOrder: z.number(),
  }),
)

export const BasePlaceSchema = z.object({
  placeId: z.number().transform(String),
  placeName: z.string(),
  address: z.string(),
  categories: z.array(CategorySchema),
  tags: z.array(CategorySchema),
})

export const PlaceByMapSchema = BasePlaceSchema.extend({
  location,
  photos,
})

export const PlaceByNameSearchSchema = BasePlaceSchema.pick({
  placeId: true,
  placeName: true,
  address: true,
})

export const PlaceByMenuSearchSchema = z.object({
  placeId: z.number().transform(String),
  placeName: z.string(),
  menuName: z.string(),
})

export const PlaceDetailSchema = BasePlaceSchema.extend({
  location,
  isLiked: z.boolean(),
  description: z.string(),
  photos,
  menus,
})

export const PlaceByPreviewSchema = z.object({
  alreadyRegistered: z.boolean(),
  placeName: z.string(),
  address: z.string(),
  location,
  photos,
  menus,
})

export const NewPlaceRequestSchema = z.object({
  kakaoPlaceId: z.string(),
  campus: z.enum(CAMPUS_LIST),
  description: z.string().trim().nonempty('설명을 입력해주세요!'),
  tagIds: z.array(z.string()),
  categoryIds: z
    .array(z.string())
    .min(1, '카테고리를 최소 1개 이상 선택해주세요!'),
  menus,
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
export type PlaceByNameSearch = z.infer<typeof PlaceByNameSearchSchema>
export type PlaceByMenuSearch = z.infer<typeof PlaceByMenuSearchSchema>
export type PlaceDetail = z.infer<typeof PlaceDetailSchema>
export type PlaceByPreview = z.infer<typeof PlaceByPreviewSchema>
export type NewPlaceRequest = z.infer<typeof NewPlaceRequestSchema>
export type NewPlaceResponse = {
  placeId: number
}
