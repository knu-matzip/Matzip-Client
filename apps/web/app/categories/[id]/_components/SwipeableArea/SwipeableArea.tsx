import { motion, PanInfo } from 'motion/react'

type Props = {
  categoryId: string
  setCategoryId: (id: string) => void
  children: React.ReactNode
}

const SWIPE_CONFIDENCE_THRESHOLD = 20

export const SwipeableArea = ({
  categoryId,
  setCategoryId,
  children,
}: Props) => {
  const NumberToCategoryId = Number(categoryId)

  const onDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo,
  ) => {
    const swipePower = Math.abs(offset.x) * velocity.x

    if (swipePower < -SWIPE_CONFIDENCE_THRESHOLD) {
      if (NumberToCategoryId < 15) {
        setCategoryId(String(NumberToCategoryId + 1))
      }
    } else if (swipePower > SWIPE_CONFIDENCE_THRESHOLD) {
      if (NumberToCategoryId > 1) {
        setCategoryId(String(NumberToCategoryId - 1))
      }
    }
  }

  return (
    <div className='relative h-full w-full overflow-hidden px-8'>
      <motion.div
        key={categoryId}
        drag='x'
        dragConstraints={{
          right: NumberToCategoryId <= 1 ? 0 : undefined,
          left: NumberToCategoryId >= 15 ? 0 : undefined,
        }}
        dragElastic={0.2}
        onDragEnd={onDragEnd}
        className='relative h-full w-full bg-white'
      >
        {children}
      </motion.div>
    </div>
  )
}
