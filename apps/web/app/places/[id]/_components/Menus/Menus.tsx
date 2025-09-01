import type { PlaceDetail } from '@/_apis/schemas/place'
import { SubTitle } from '../SubTitle'
import { Menu } from './Menu'
import { cn } from '@repo/ui/utils/cn'
import { Text } from '@repo/ui/components/Text'
import { Column } from '@repo/ui/components/Layout'

type Props = {
  menus: PlaceDetail['menus']
}

export const Menus = ({ menus }: Props) => {
  const recommendedMenu = menus.filter((menu) => menu.isRecommended)
  const unRecommendedMenu = menus.filter((menu) => !menu.isRecommended)

  return (
    <Column className={'gap-2.5'}>
      <SubTitle icon={'note'} title={'메뉴'} />
      <Column
        className={cn('gap-2.5', 'rounded-xl', 'bg-gray-50', 'px-4 py-3')}
      >
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
      </Column>
    </Column>
  )
}
