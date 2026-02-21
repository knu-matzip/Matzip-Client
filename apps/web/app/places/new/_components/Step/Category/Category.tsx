import { useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { Spinner } from '@heroui/react'
import { useCategoryQueries } from '@/_apis/queries/category'
import type { NewPlaceRequest } from '@/_apis/schemas/place'
import type { Category as CategoryType } from '@/_apis/schemas/category'
import { CategoryBox } from './CategoryBox'
import { SelectedCategoryBox } from './SelectedCategoryBox'
import { Title } from '../../Title'
import { Button } from '@repo/ui/components/Button'
import { Column } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'

type Props = {
  isLoading: boolean
}

export const Category = ({ isLoading }: Props) => {
  const { getValues, setValue } = useFormContext<NewPlaceRequest>()
  const { data: categories } = useSuspenseQuery(useCategoryQueries.list())

  const initialValues = getValues().categoryIds
  const initialCategory = initialValues
    .map((id) => categories.find((category) => category.id === id))
    .filter((category): category is CategoryType => category !== undefined)

  const [selectedCategories, setSelectedCategories] =
    useState<CategoryType[]>(initialCategory)

  const includeInCategories = (category: CategoryType) => {
    return selectedCategories.some((c) => c.id === category.id)
  }

  const syncFormCategories = (categories: CategoryType[]) => {
    setValue(
      'categoryIds',
      categories.map((c) => c.id),
    )
  }

  const addCategory = (category: CategoryType) => {
    const updated = [...selectedCategories, category]
    setSelectedCategories(updated)
    syncFormCategories(updated)
  }

  const removeCategory = (category: CategoryType) => {
    const updated = selectedCategories.filter((c) => c.id !== category.id)
    setSelectedCategories(updated)
    syncFormCategories(updated)
  }

  const onToggle = (category: CategoryType) => {
    if (includeInCategories(category)) {
      removeCategory(category)
    } else if (selectedCategories.length < 5) {
      addCategory(category)
    }
  }

  return (
    <>
      {isLoading && (
        <Spinner
          size={'lg'}
          className={
            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'
          }
        />
      )}
      <Title
        title={'내가 알리고 싶은 맛집의 종류는?'}
        description={'어울리는 카테고리를 모두 골라주세요!'}
      />
      <Column className={'mb-5 gap-2'}>
        <SelectedCategoryBox
          selectedCategories={selectedCategories}
          removeCategory={removeCategory}
        />
        <Text variant={'body3'} className={'ml-auto text-gray-300'}>
          첫 번째 카테고리가 대표 카테고리로 선택돼요!
        </Text>
      </Column>
      <CategoryBox
        categories={categories}
        onCategoryClick={onToggle}
        isSelected={includeInCategories}
      />
      <Button
        type='submit'
        size={'medium'}
        className={'ui:min-w-full mt-auto'}
        disabled={isLoading}
      >
        등록하기
      </Button>
    </>
  )
}
