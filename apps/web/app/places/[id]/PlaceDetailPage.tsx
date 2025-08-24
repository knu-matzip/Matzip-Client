'use client'

import Image from 'next/image'
import { useSuspenseQuery } from '@tanstack/react-query'
import { usePlaceQueries } from '@/_apis/queries/place'
import { Banner } from '@/_components/Banner'
import { HeaderBackButton } from '@/_components/HeaderBackButton'
import { Text } from '@repo/ui/components/Text'
import { Header } from '@repo/ui/components/Header'
import { Column, VerticalScrollArea } from '@repo/ui/components/Layout'
import { Description, LikeButton, Location, Menus } from './_components'

export const PlaceDetailPage = ({ id }: { id: string }) => {
  const { data } = useSuspenseQuery(usePlaceQueries.detail(id))
  const { placeName, photos, menus, description, location } = data

  return (
    <>
      <Header
        left={<HeaderBackButton />}
        center={<Text variant={'heading2'}>{placeName}</Text>}
        right={<LikeButton />}
      />
      <VerticalScrollArea className={'flex-1'}>
        <Banner
          contents={photos.map((photo) => (
            <Image
              key={photo.displayOrder}
              src={photo.photoUrl}
              alt='place-photo'
              width={450}
              height={180}
              className={'max-h-[180px] object-contain'}
            />
          ))}
          minHeight={180}
        />
        <Column className={'flex-1 justify-around gap-4 p-5'}>
          <Location location={location} />
          <Menus menus={menus} />
          <Description description={description} />
        </Column>
      </VerticalScrollArea>
    </>
  )
}
