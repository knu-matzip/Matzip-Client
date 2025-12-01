import { useSuspenseQuery } from '@tanstack/react-query'
import { motion, PanInfo } from 'motion/react'
import { useCampusStore } from '@/_store/campus'
import { usePlaceQueries } from '@/_apis/queries/place'
import { PlaceListItem } from '@/_components/PlaceListItem'
import { VerticalScrollArea } from '@repo/ui/components/Layout'
import { EmptyPlaces } from './EmptyPlaces'

type Props = {
  id: string
  setId: (id: string) => void
}

// 스와이프 감도
const SWIPE_CONFIDENCE_THRESHOLD = 20

export const Places = ({ id, setId }: Props) => {
  const { campus } = useCampusStore()
  const { data: places } = useSuspenseQuery(
    usePlaceQueries.byCategory(id, campus),
  )

  const currentCategoryId = Number(id)
  const onDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo,
  ) => {
    const swipePower = Math.abs(offset.x) * velocity.x

    if (swipePower < -SWIPE_CONFIDENCE_THRESHOLD) {
      if (currentCategoryId < 15) {
        setId(String(currentCategoryId + 1))
      }
    } else if (swipePower > SWIPE_CONFIDENCE_THRESHOLD) {
      if (currentCategoryId > 1) {
        setId(String(currentCategoryId - 1))
      }
    }
  }

  const content =
    places.length === 0 ? (
      <EmptyPlaces />
    ) : (
      <VerticalScrollArea as={'ul'} className={'px-8'}>
        {places.map((place, index) => (
          <PlaceListItem
            key={place.placeId}
            {...place}
            showCategory={false}
            showBorder={index !== places.length - 1}
          />
        ))}
      </VerticalScrollArea>
    )

  return (
    <div className='relative h-full w-full overflow-hidden'>
      <motion.div
        key={id}
        drag='x'
        dragConstraints={{
          right: currentCategoryId <= 1 ? 0 : undefined,
          left: currentCategoryId >= 15 ? 0 : undefined,
        }}
        dragElastic={0.2}
        onDragEnd={onDragEnd}
        className='relative h-full w-full bg-white'
      >
        {content}
      </motion.div>
    </div>
  )
}
