import type { Category as CategoryType } from '@/_apis/schemas/category'
import { Column, JustifyAround } from '@repo/ui/components/Layout'
import { AnimatePresence, motion } from 'motion/react'
import { ChoiceCategoryItem } from '@/places/new/_components/Step/Category/ChoiceCategoryItem'
import { Text } from '@repo/ui/components/Text'

type Props = {
  choiceCategories: CategoryType[]
  removeCategories: (category: CategoryType) => void
}

export const ChoiceCategoryBox = ({
  choiceCategories,
  removeCategories,
}: Props) => {
  const MAX_COUNT = 5
  const slots = Array.from({ length: MAX_COUNT }, (_, index) => {
    return choiceCategories[index] || null
  })

  return (
    <Column className={'mb-5 gap-2'}>
      <JustifyAround>
        {slots.map((category, index) => (
          <div key={`slot-${index}`} className='min-w-16.5 min-h-18.5'>
            <AnimatePresence mode='wait'>
              {category ? (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.6,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: 'easeInOut',
                  }}
                >
                  <ChoiceCategoryItem
                    category={category}
                    removeCategories={() => removeCategories(category)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key='empty'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeOut',
                  }}
                >
                  <EmptyCategoryItem />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </JustifyAround>
      <Text variant={'body3'} className={'ml-auto text-gray-300'}>
        첫 번째 카테고리가 대표 카테고리로 선택돼요!
      </Text>
    </Column>
  )
}

// 빈 상자 컴포넌트
const EmptyCategoryItem = () => (
  <div className='min-w-16.5 min-h-18.5 rounded-md bg-gray-50'></div>
)
