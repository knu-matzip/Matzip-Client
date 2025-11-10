import { Text } from '@repo/ui/components/Text'
import { Column, VerticalScrollArea } from '@repo/ui/components/Layout'
import { cn } from '@repo/ui/utils/cn'
import type { RequestDetail } from '@/app/requests/[id]/_api/types'
import { Menu } from './Menu'

type Props = {
  menus: RequestDetail['menus']
}

export const Menus = ({ menus }: Props) => {
  const { recommendedMenu, unRecommendedMenu } = menus.reduce(
    (acc, menu) => {
      if (menu.isRecommended) acc.recommendedMenu.push(menu)
      else acc.unRecommendedMenu.push(menu)
      return acc
    },
    {
      recommendedMenu: [] as typeof menus,
      unRecommendedMenu: [] as typeof menus,
    },
  )

  return (
    <Column className={'gap-2.5'}>
      <Text>메뉴</Text>
      <VerticalScrollArea
        className={cn(
          'gap-2.5',
          'rounded-xl',
          'bg-gray-50',
          'px-4 py-3',
          'max-h-60',
          'show-scrollbar',
        )}
      >
        {/*메뉴 존재 유무*/}
        {menus.length === 0 && (
          <Text
            fontSize={'sm'}
            fontWeight={'semibold'}
            className={'mx-auto my-3'}
          >
            등록된 메뉴가 존재하지 않습니다
          </Text>
        )}
        {/*추천 메뉴 존재 유무*/}
        {recommendedMenu.length > 0 && (
          <>
            <Text variant={'caption1'} className={'text-gray-300'}>
              추천메뉴
            </Text>
            {recommendedMenu.map((menu, index) => (
              <Menu key={index} menu={menu} />
            ))}
            <hr className={'w-full border border-gray-200'} />
          </>
        )}
        {unRecommendedMenu.map((menu, index) => (
          <Menu key={index} menu={menu} />
        ))}
      </VerticalScrollArea>
    </Column>
  )
}
