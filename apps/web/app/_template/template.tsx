'use client'
import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface TemplateProps {
  children: ReactNode
}

export default function Template({ children }: TemplateProps) {
  return (
    <motion.div
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -10, opacity: 0 }}
      transition={{
        type: 'tween',
        ease: 'easeOut',
        duration: 0.3,
      }}
    >
      {children}
    </motion.div>
  )
}
