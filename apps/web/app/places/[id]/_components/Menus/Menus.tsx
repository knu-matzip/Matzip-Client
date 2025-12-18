import type { PlaceDetail } from '@/_apis/schemas/place'
import { SubTitle } from '../SubTitle'
import { Menu } from './Menu'
import { cn } from '@repo/ui/utils/cn'
import { Text } from '@repo/ui/components/Text'
import { Column, VerticalScrollArea } from '@repo/ui/components/Layout'
import { EmptyFallback } from '@/_components/EmptyFallback'

type Props = {
  menus: PlaceDetail['menus']
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
  const showDivider = recommendedMenu.length > 0 && unRecommendedMenu.length > 0

  return (
    <Column className={'gap-2.5'}>
      <SubTitle icon={'note'} title={'메뉴'} />
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
        <EmptyFallback
          isEmpty={menus.length === 0}
          fallbackDescription={'등록된 메뉴가 존재하지 않습니다'}
        >
          {recommendedMenu.length > 0 && (
            <Text variant={'caption1'} className={'text-gray-300'}>
              추천메뉴
            </Text>
          )}
          {recommendedMenu.map((menu, index) => (
            <Menu key={index} menu={menu} />
          ))}
          {showDivider && <hr className={'w-full border border-gray-200'} />}
          {unRecommendedMenu.map((menu, index) => (
            <Menu key={index} menu={menu} />
          ))}
        </EmptyFallback>
      </VerticalScrollArea>
    </Column>
  )
}
