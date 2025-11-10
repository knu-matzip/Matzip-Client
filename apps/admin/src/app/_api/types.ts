import type { IconType } from '@repo/ui/components/Icon'
import { CampusType } from '@/consts/campus'

export type Category = {
  id: string
  name: string
  iconKey: IconType
}

export type Tag = {
  id: string
  name: string
  iconKey: IconType
}

export type Request = {
  placeId: string
  placeName: string
  requestDate: string
  campus: CampusType
  categories: Category[]
  tags: Tag[]
}
