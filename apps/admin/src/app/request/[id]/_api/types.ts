import { Coord } from '../_utils/toLatLng'
import type { Tag, Category } from '@/app/_api/types'

type Photo = { photoId: string; photoUrl: string; displayOrder: number }

type Menu = { name: string; price: number; isRecommended: boolean }

export type RequestDetail = {
  placeId: string
  placeName: string
  requestDate: string
  photos: Photo[]
  address: string
  location: Coord
  description: string
  menus: Menu[]
  categories: Category[]
  tags: Tag[]
}

export type RequestReview = {
  status: 'APPROVED' | 'REJECTED'
  rejectedReason: string | null
}
