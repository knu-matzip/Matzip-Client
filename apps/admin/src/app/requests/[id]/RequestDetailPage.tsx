'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDisclosure } from '@heroui/react'

import { Header } from '@repo/ui/components/Header'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { Column, VerticalScrollArea } from '@repo/ui/components/Layout'
import { Banner } from '@repo/ui/components/Banner'

import type { RequestDetail } from './_api/types'
import { Location } from './_components/Location/Location'
import { Menus } from './_components/Menus/Menus'
import { Description } from './_components/Description'
import { ActionButtonGroup } from './_components/ActionButtonGroup'
import { RejectModal } from './_components/RejectModal'

type Props = {
  data: RequestDetail
}

export const RequestDetailPage = ({ data }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { back } = useRouter()
  const { placeName, menus, description, tags, photos } = data

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
            showIndicator={true}
          />
        )}
        <Column className={'flex-1 justify-around gap-4 px-5'}>
          <Location />
          <Menus menus={menus} />
          <Description description={description} tags={tags} />
          <ActionButtonGroup onOpen={onOpen} />
        </Column>
      </VerticalScrollArea>
      <RejectModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}
