import type { PlaceByStatus } from '@/_apis/schemas/place'
import { COLOR_VARIANTS } from '@repo/ui/consts/colorVariant'

export type RegisterStatus = PlaceByStatus['registerStatus']

export const STATUS_COLOR: Record<
  RegisterStatus,
  (typeof COLOR_VARIANTS)[keyof typeof COLOR_VARIANTS]
> = {
  APPROVED: COLOR_VARIANTS.blue,
  PENDING: COLOR_VARIANTS.yellow,
  REJECTED: COLOR_VARIANTS.red,
}

export const STATUS_LABEL: Record<RegisterStatus, string> = {
  APPROVED: '등록 완료',
  PENDING: '심사 대기',
  REJECTED: '등록 거절',
}
