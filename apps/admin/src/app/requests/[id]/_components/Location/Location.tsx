'use client'

import { useState } from 'react'
import { Column } from '@repo/ui/components/Layout'
import { Container, NaverMap } from 'react-naver-maps'
import { Text } from '@repo/ui/components/Text'

export const Location = () => {
  const [, setMap] = useState<naver.maps.Map | null>(null)

  return (
    <Column className={'gap-1.5'}>
      <Text>위치</Text>
      <Container className={'h-[150px] overflow-hidden rounded-xl'}>
        <NaverMap ref={setMap}>
          {/*<PlaceMarker position={location} icon={'logo'} />*/}
        </NaverMap>
      </Container>
    </Column>
  )
}
