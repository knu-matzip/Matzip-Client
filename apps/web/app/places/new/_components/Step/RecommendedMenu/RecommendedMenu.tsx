import { Title } from '@/places/new/_components/Tilte'
import { CheckboxGroup, Checkbox } from '@heroui/react'
import { Text } from '@repo/ui/components/Text'
import { JustifyBetween } from '@repo/ui/components/Layout'
import { Button } from '@repo/ui/components/Button'
import { useState } from 'react'

const Menus = [
  { name: '짜장면', price: 3000 },
  { name: '짬뽕', price: 4000 },
  { name: '볶음밥', price: 5000 },
  { name: '탕수육', price: 6000 },
]

export const RecommendedMenu = () => {
  const [selectedMenus, setSelectedMenus] = useState<string[]>([])

  const handleSelectionChange = (values: string[]) => {
    if (values.length <= 3) {
      setSelectedMenus(values)
    }
  }

  const isDisabled = (menuName: string) => {
    // 현재 선택되지 않은 항목이고, 이미 3개가 선택된 경우 비활성화
    return !selectedMenus.includes(menuName) && selectedMenus.length >= 3
  }

  return (
    <>
      <Title
        title={'내가 좋아하는 맛집의 메뉴는?'}
        description={`추천하는 메뉴 최대 3가지를 골라주세요!`}
      />
      <CheckboxGroup
        className={'flex-1'}
        radius={'full'}
        value={selectedMenus}
        onValueChange={handleSelectionChange}
      >
        {Menus.map((menu) => (
          <Checkbox
            key={menu.name}
            value={menu.name}
            size={'md'}
            isDisabled={isDisabled(menu.name)}
            classNames={{
              base: 'max-w-full',
              label: 'w-full',
            }}
          >
            <JustifyBetween>
              <Text fontSize={'lg'} fontWeight={'semibold'} className={'ml-2'}>
                {menu.name}
              </Text>
              <Text
                fontSize={'base'}
                fontWeight={'semibold'}
                className={'text-gray-300'}
              >
                {menu.price.toLocaleString()} 원
              </Text>
            </JustifyBetween>
          </Checkbox>
        ))}
      </CheckboxGroup>
      <Button size={'medium'} className={'ui:min-w-full'}>
        다음
      </Button>
    </>
  )
}
