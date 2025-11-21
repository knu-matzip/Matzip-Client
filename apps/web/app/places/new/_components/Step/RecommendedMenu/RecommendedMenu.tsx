import { CheckboxGroup, Checkbox } from '@heroui/react'
import {
  type Control,
  type UseFormGetValues,
  Controller,
} from 'react-hook-form'
import type { NewPlaceRequest } from '@/_apis/schemas/place'
import { formatPrice } from '@/_utils/formatPrice'
import { Title } from '@/places/new/_components/Title'
import { Text } from '@repo/ui/components/Text'
import { JustifyBetween, VerticalScrollArea } from '@repo/ui/components/Layout'
import { Button } from '@repo/ui/components/Button'

type Props = {
  control: Control<NewPlaceRequest>
  getValues: UseFormGetValues<NewPlaceRequest>
  nextStep: VoidFunction
}

export const RecommendedMenu = ({ control, getValues, nextStep }: Props) => {
  return (
    <>
      <Title
        title={'내가 좋아하는 맛집의 메뉴는?'}
        description={`추천하는 메뉴 최대 3가지를 골라주세요!`}
      />
      <VerticalScrollArea className={'show-scrollbar flex-1'}>
        <Controller
          name='menus'
          control={control}
          render={({ field }) => {
            const selectedCount = field.value.filter(
              (m) => m.isRecommended,
            ).length

            const handleSelect = (menuName: string, isSelected: boolean) => {
              const currentMenus = getValues('menus')
              const currentSelectedCount = currentMenus.filter(
                (m) => m.isRecommended,
              ).length

              if (isSelected && currentSelectedCount >= 3) {
                return
              }

              const updatedMenus = currentMenus.map((menu) =>
                menu.name === menuName
                  ? { ...menu, isRecommended: isSelected }
                  : menu,
              )

              field.onChange(updatedMenus)
            }

            return (
              <CheckboxGroup className='flex-1' radius='full'>
                {field.value.map((menu) => {
                  const isSelected = menu.isRecommended
                  const isDisabled = !isSelected && selectedCount >= 3

                  return (
                    <Checkbox
                      key={menu.name}
                      value={menu.name}
                      size='md'
                      isSelected={isSelected}
                      isDisabled={isDisabled}
                      onValueChange={(checked) =>
                        handleSelect(menu.name, checked)
                      }
                      classNames={{ base: 'max-w-full', label: 'w-full' }}
                    >
                      <JustifyBetween>
                        <Text
                          fontSize='lg'
                          fontWeight='semibold'
                          className='ml-2'
                        >
                          {menu.name}
                        </Text>
                        <Text
                          fontSize='base'
                          fontWeight='semibold'
                          className='text-gray-300'
                        >
                          {formatPrice(menu.price)}
                        </Text>
                      </JustifyBetween>
                    </Checkbox>
                  )
                })}
              </CheckboxGroup>
            )
          }}
        />
      </VerticalScrollArea>
      <Button
        size={'medium'}
        type={'button'}
        className={'ui:min-w-full mt-10'}
        onClick={nextStep}
      >
        다음
      </Button>
    </>
  )
}
