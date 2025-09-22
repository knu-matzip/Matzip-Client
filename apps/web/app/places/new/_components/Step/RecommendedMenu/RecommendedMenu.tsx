import { CheckboxGroup, Checkbox } from '@heroui/react'
import { type Control, Controller } from 'react-hook-form'
import type { NewPlaceRequest } from '@/_apis/schemas/place'
import { Title } from '@/places/new/_components/Title'
import { Text } from '@repo/ui/components/Text'
import { JustifyBetween, VerticalScrollArea } from '@repo/ui/components/Layout'
import { Button } from '@repo/ui/components/Button'

type Props = {
  control: Control<NewPlaceRequest>
  nextStep: VoidFunction
}

export const RecommendedMenu = ({ control, nextStep }: Props) => {
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
            const selectedNames = field.value
              .filter((m) => m.isRecommended)
              .map((m) => m.name)

            const isDisabled = (menuName: string) =>
              !selectedNames.includes(menuName) && selectedNames.length >= 3

            return (
              <CheckboxGroup
                className='flex-1'
                radius='full'
                value={selectedNames}
                onValueChange={(newSelectedNames: string[]) => {
                  // 최대 3개 선택 제한
                  if (newSelectedNames.length <= 3) {
                    const updatedMenus = field.value.map((menu) => ({
                      ...menu,
                      isRecommended: newSelectedNames.includes(menu.name),
                    }))
                    field.onChange(updatedMenus)
                  }
                }}
              >
                {field.value.map((menu) => (
                  <Checkbox
                    key={menu.name}
                    value={menu.name}
                    size='md'
                    isDisabled={isDisabled(menu.name)}
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
                        {menu.price.toLocaleString()} 원
                      </Text>
                    </JustifyBetween>
                  </Checkbox>
                ))}
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
