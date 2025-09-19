import { CategoryHandlers } from './categoryHandlers'
import { PlaceHandlers } from './placeHandlers'
import { EventHandlers } from './eventHandlers'
import { LikeHandlers } from './likeHandlers'

export const handlers = [
  ...CategoryHandlers,
  ...PlaceHandlers,
  ...EventHandlers,
  ...LikeHandlers,
]