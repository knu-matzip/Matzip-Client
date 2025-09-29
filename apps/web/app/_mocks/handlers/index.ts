import { CategoryHandlers } from './categoryHandlers'
import { PlaceHandlers } from './placeHandlers'
import { EventHandlers } from './eventHandlers'
import { LikeHandlers } from './likeHandlers'
import { RequestHandlers } from './requestHandlers'

export const handlers = [
  ...CategoryHandlers,
  ...PlaceHandlers,
  ...EventHandlers,
  ...LikeHandlers,
  ...RequestHandlers,
]
