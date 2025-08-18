'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Icon } from '@repo/ui/components/Icon'

export const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const onClick = () => {
    setIsLiked((prev) => !prev)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 200) // 0.2초 동안 팝 애니메이션
  }

  return (
    <motion.button
      onClick={onClick}
      animate={{ scale: isAnimating ? 1.3 : 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className='relative flex items-center justify-center p-2'
    >
      <Icon
        type='headerHeart'
        size={26}
        color={isLiked ? '--color-red' : '--color-gray-100'}
      />

      {/* 작은 하트 파티클 */}
      {isLiked &&
        [0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className='absolute'
            initial={{ scale: 0, opacity: 1, y: 0, x: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [1, 1, 0],
              y: -30 - i * 5,
              x: (Math.random() - 0.5) * 20,
            }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          >
            <Icon type='headerHeart' size={12} color='--color-red' />
          </motion.div>
        ))}
    </motion.button>
  )
}
