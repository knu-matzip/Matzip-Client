import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { CLIENT_PATH } from '@/_constants/path'
import { type PlaceByMap } from '@/_apis/schemas/place'
import { cn } from '@repo/ui/utils/cn'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'
import { Column, Flex } from '@repo/ui/components/Layout'

export const PlaceSummaryCard = ({ place }: { place: PlaceByMap }) => {
  const { placeId, placeName, categories, address, photos } = place
  const mainCategoryIcon = categories[0]?.iconKey || 'logo'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='absolute bottom-20 left-1/2 w-[90%] -translate-x-1/2'
    >
      <Link
        href={CLIENT_PATH.PLACE_DETAIL(placeId)}
        className={cn('flex justify-between', 'rounded-lg bg-white p-4')}
      >
        <Column>
          <Flex className='gap-1'>
            <Text as={'span'} variant='title2'>
              {placeName}
            </Text>
            <Icon type={mainCategoryIcon} size={18} />
          </Flex>
          <Text variant='caption2' className='text-gray-300'>
            {address}
          </Text>
          <Flex className='mt-1 gap-2'>
            {photos.slice(0, 5).map((photo) => (
              <Flex
                key={photo.photoId || photo.displayOrder}
                className={
                  'h-12.5 w-12.5 overflow-hidden rounded-xl bg-gray-100'
                }
              >
                <Image
                  src={photo.photoUrl}
                  width={50}
                  height={50}
                  alt={`place-photo-${photo.displayOrder}`}
                  className={'object-cover'}
                />
              </Flex>
            ))}
          </Flex>
        </Column>
        <Icon type='arrowRight' color='--color-gray-200' />
      </Link>
    </motion.div>
  )
}
