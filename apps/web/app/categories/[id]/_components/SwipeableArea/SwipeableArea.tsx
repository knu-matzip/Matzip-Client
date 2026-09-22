import { motion, PanInfo } from 'motion/react'

type Props = {
  activeKey: string
  onNext: () => void
  onPrev: () => void
  canSwipePrev?: boolean
  canSwipeNext?: boolean
  children: React.ReactNode
}

const SWIPE_CONFIDENCE_THRESHOLD = 5000

export const SwipeableArea = ({
  activeKey,
  onNext,
  onPrev,
  canSwipePrev,
  canSwipeNext,
  children,
}: Props) => {
  const onDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo,
  ) => {
    const swipePower = Math.abs(offset.x) * velocity.x

    if (swipePower < -SWIPE_CONFIDENCE_THRESHOLD) {
      onNext()
    } else if (swipePower > SWIPE_CONFIDENCE_THRESHOLD) {
      onPrev()
    }
  }

  return (
    <div className='relative h-full w-full overflow-x-hidden px-6'>
      <motion.div
        key={activeKey}
        drag='x'
        dragConstraints={{
          right: canSwipePrev ? undefined : 0,
          left: canSwipeNext ? undefined : 0,
        }}
        dragElastic={0.2}
        dragSnapToOrigin
        onDragEnd={onDragEnd}
        className='relative h-full w-full bg-white'
      >
        {children}
      </motion.div>
    </div>
  )
}
