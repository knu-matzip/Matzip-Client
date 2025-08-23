import { motion } from 'motion/react'
import { Text } from '@repo/ui/components/Text'
import { Column } from '@repo/ui/components/Layout'

type Props = {
  title: string
  description?: string
}

export const Title = ({ title, description }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={'mb-10'}
    >
      <Column className={'gap-0.5'}>
        <Text fontSize={'2xl'} fontWeight={'bold'}>
          {title}
        </Text>
        {description && (
          <Text variant={'body3'} className={'text-gray-300'}>
            {description}
          </Text>
        )}
      </Column>
    </motion.div>
  )
}
