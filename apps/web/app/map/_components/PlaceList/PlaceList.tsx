'use client'

// import 'react-spring-bottom-sheet/dist/style.css'
// import { useRef } from 'react'
// import { BottomSheet, type BottomSheetRef } from 'react-spring-bottom-sheet'
import type { PlaceByMap } from '@/_apis/schemas/place'
import { PlaceListItem } from '@/_components/PlaceListItem'
import { EmptyFallback } from '@/_components/EmptyFallback'
import { type DialogProps, Drawer } from 'vaul'
import { cn } from '@repo/ui/utils/cn'

export const PlaceList = ({ places }: { places: PlaceByMap[] }) => {
  return (
    <BottomSheet>
      <EmptyFallback
        isEmpty={places.length === 0}
        fallbackDescription={'주위 검색된 맛집이 없습니다'}
      >
        <ul className={'pb-15 px-5'}>
          {places.map((place) => (
            <PlaceListItem key={place.placeId} {...place} />
          ))}
        </ul>
      </EmptyFallback>
    </BottomSheet>
  )
}

const BottomSheet = ({ children, ...props }: DialogProps) => {
  return (
    <Drawer.Root
      open={true}
      dismissible={false}
      snapPoints={[0.2, 0.9]}
      modal={false}
      disablePreventScroll={true}
      // preventScrollRestoration={false}
      {...props}
    >
      <Drawer.Portal>
        <Drawer.Title />
        <Drawer.Content
          className={cn(
            'fixed bottom-0 left-0 right-0',
            'z-[15]',
            'mx-auto',
            'flex flex-col',
            'h-[96%] max-h-[96%] w-full max-w-[450px]',
            'rounded-t-2xl bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] outline-none',
          )}
        >
          <Drawer.Handle className='mx-auto my-3 h-1 w-[30px] rounded-sm bg-gray-200' />
          <div className='flex-1 overflow-y-auto pb-[100px]'>{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
