'use client'

import Image from 'next/image'
import { useSuspenseQuery } from '@tanstack/react-query'

import { useRequestQueries } from '@/_apis/queries/request'
import { Header } from '@repo/ui/components/Header'
import { Text } from '@repo/ui/components/Text'
import { Column, VerticalScrollArea } from '@repo/ui/components/Layout'
import { Carousel } from '@repo/ui/components/Carousel'
import { HeaderBackButton } from '@/_components/HeaderBackButton'
import { Description, Location, Menus, Tags } from '@/places/[id]/_components'
import { StatusChip } from '@/requests/_components/StatusChip'
import { RejectedReason } from './_components/RejectedReason'
import { Section } from '@/_components/Section'

export const RequestDetailPage = ({ id }: { id: string }) => {
  const { data } = useSuspenseQuery(useRequestQueries.detail(id))
  const {
    placeName,
    photos,
    menus,
    description,
    location,
    registerStatus,
    rejectedReason,
    tags,
  } = data

  return (
    <>
      <Header
        left={<HeaderBackButton />}
        center={
          <Text variant={'heading2'} className={'ml-10'}>
            {placeName}
          </Text>
        }
        right={<StatusChip registerStatus={registerStatus} />}
      />
      <VerticalScrollArea className={'flex-1'}>
        {rejectedReason && registerStatus === 'REJECTED' && (
          <RejectedReason rejectedReason={rejectedReason} />
        )}
        <Carousel minHeight={180} showIndicator={true}>
          {photos.map((photo) => (
            <Image
              key={photo.displayOrder}
              src={photo.photoUrl}
              alt='place-photo'
              width={450}
              height={180}
              className={'max-h-[180px] object-contain'}
            />
          ))}
        </Carousel>
        <Column className={'flex-1 justify-around gap-4 p-5'}>
          <Section icon={'pin'} title={'위치'}>
            <Location location={location} />
          </Section>
          <Section icon={'note'} title={'메뉴'}>
            <Menus menus={menus} />
          </Section>
          <Section icon={'smile'} title={'소개'}>
            <Description description={description} />
            <Tags tags={tags} />
          </Section>
        </Column>
      </VerticalScrollArea>
    </>
  )
}
