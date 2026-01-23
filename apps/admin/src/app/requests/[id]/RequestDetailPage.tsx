'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDisclosure } from '@heroui/react'

import { Header } from '@repo/ui/components/Header'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { Column, VerticalScrollArea } from '@repo/ui/components/Layout'
import { Carousel } from '@repo/ui/components/Carousel'

import type { RequestDetail } from './_api/types'
import { CLIENT_PATH } from '@/consts/path'
import { requestReview } from './_api/services/request'
import { Section } from './_components/Section'
import { Location } from './_components/Location'
import { Menus } from './_components/Menus'
import { Description } from './_components/Description'
import { Tags } from './_components/Tags'
import { ActionButtonGroup } from './_components/ActionButtonGroup'
import { RejectModal } from './_components/RejectModal'

type Props = {
  data: RequestDetail
}

export const RequestDetailPage = ({ data }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { back, replace } = useRouter()
  const { placeId, placeName, menus, description, tags, photos, location } =
    data

  const handleReview = async (rejectedReason?: string) => {
    const status = rejectedReason ? 'REJECTED' : 'APPROVED'
    const reason = rejectedReason ?? null // rejectedReason이 있으면 그 값을, 없으면 null을 사용

    await requestReview(placeId, {
      status,
      rejectedReason: reason,
    })

    alert('완료했슈~')
    replace(CLIENT_PATH.MAIN)
  }

  return (
    <>
      <Header
        left={
          <button onClick={back}>
            <Icon type={'arrowLeft'} />
          </button>
        }
        center={<Text variant={'heading2'}>{placeName}</Text>}
      />
      <VerticalScrollArea className={'flex-1 py-5'}>
        {photos.length > 0 && (
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
        )}
        <Column className={'flex-1 justify-around gap-4 px-5'}>
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
          <ActionButtonGroup onOpen={onOpen} handleReview={handleReview} />
        </Column>
      </VerticalScrollArea>
      <RejectModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleReview={handleReview}
      />
    </>
  )
}
