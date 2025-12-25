'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useCampusStore } from '@/_store/campus'
import { PlaceQueryKeys, usePlaceQueries } from '@/_apis/queries/place'
import { Banner } from '@repo/ui/components/Banner'
import { HeaderBackButton } from '@/_components/HeaderBackButton'
import { Text } from '@repo/ui/components/Text'
import { Header } from '@repo/ui/components/Header'
import { Column, VerticalScrollArea } from '@repo/ui/components/Layout'
import { Section } from '@/_components/Section'
import { Description, LikeButton, Location, Menus, Tags } from './_components'

export const PlaceDetailPage = ({ id }: { id: string }) => {
  const { data } = useSuspenseQuery(usePlaceQueries.detail(id))
  const {
    placeId,
    placeName,
    photos,
    menus,
    description,
    location,
    isLiked,
    tags,
  } = data
  const { campus } = useCampusStore()
  const queryClient = useQueryClient()

  useEffect(() => {
    // 상세 페이지 진입 시, '조회수' 쿼리를 무효화하여 최신 조회수 반영
    queryClient.invalidateQueries({
      queryKey: [...PlaceQueryKeys.byRanking('views', campus)],
    })
  }, [campus, queryClient])

  return (
    <>
      <Header
        left={<HeaderBackButton className={'px-2'} />}
        center={
          <Text variant={'heading2'} className={'truncate'}>
            {placeName}
          </Text>
        }
        right={<LikeButton placeId={placeId} initIsLiked={isLiked} />}
      />
      <VerticalScrollArea className={'flex-1'}>
        <Banner
          contents={photos.map((photo, index) => (
            <Image
              key={photo.displayOrder}
              src={photo.photoUrl}
              alt='place-photo'
              width={450}
              height={180}
              className={'max-h-[180px] object-contain'}
              priority={index === 0}
            />
          ))}
          minHeight={180}
          showIndicator={true}
        />
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
