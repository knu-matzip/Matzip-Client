import type { IconType } from '@repo/ui/components/Icon'
import type { Coord } from '@/app/request/[id]/_utils/toLatLng'

type Photo = { photoId: string; photoUrl: string; displayOrder: number }

type Menu = { name: string; price: number; isRecommended: boolean }

type Category = {
  id: string
  name: string
  iconKey: IconType
}

type Tag = {
  id: string
  name: string
  iconKey: IconType
}

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
