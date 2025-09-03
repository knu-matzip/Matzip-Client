import { AnimatePresence, motion } from 'motion/react'
import { Category } from '@/_apis/schemas/category'
import { Icon } from '@repo/ui/components/Icon'

type SlotColumnProps = {
  delay?: number
  isSpinning: boolean
  selectedCategory: Category | null
  categories: Category[]
}

export const SlotColumn = ({
  delay = 0,
  isSpinning,
  selectedCategory,
  categories,
}: SlotColumnProps) => (
  <div className='border-yellow h-30 relative w-24 overflow-hidden rounded-lg border-4 shadow-lg'>
    <AnimatePresence>
      {isSpinning && (
        <motion.div
          className='absolute inset-0 flex flex-col'
          initial={{ y: 0 }}
          animate={{ y: -1300 }}
          transition={{
            duration: 3,
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {[...Array(27)].map((_, index: number) => {
            const categoryIndex: number = index % categories.length
            const category: Category = categories[categoryIndex]!
            return (
              <div
                key={`${index}-${category.id}`}
                className={`flex h-40 flex-col items-center justify-center`}
              >
                <Icon type={category.iconKey} className='mb-2 text-4xl' />
                <div className='px-1 text-center text-xs font-bold'>
                  {category.name}
                </div>
              </div>
            )
          })}
        </motion.div>
      )}
    </AnimatePresence>

    {!isSpinning && selectedCategory && (
      <motion.div
        className={`flex h-full flex-col items-center justify-center`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        <Icon type={selectedCategory.iconKey} size={40} className='mb-2' />
        <div className='px-1 text-center text-xs font-bold'>
          {selectedCategory.name}
        </div>
      </motion.div>
    )}

    {!isSpinning && !selectedCategory && (
      <div className='flex h-full items-center justify-center text-gray-600'>
        <div className='text-2xl'>?</div>
      </div>
    )}
  </div>
)
