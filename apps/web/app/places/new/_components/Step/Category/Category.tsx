import { useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import type { UseFormSetValue } from 'react-hook-form'
import { useCategoryQueries } from '@/_apis/queries/category'
import type { NewPlaceRequest } from '@/_apis/schemas/place'
import type { Category as CategoryType } from '@/_apis/schemas/category'
import { CategoryBox } from './CategoryBox'
import { ChoiceCategoryBox } from './ChoiceCategoryBox'
import { Title } from '../../Title'
import { Button } from '@repo/ui/components/Button'

type Props = {
  setValue: UseFormSetValue<NewPlaceRequest>
  getValues: () => NewPlaceRequest
  isLoading: boolean
}

export const Category = ({ setValue, getValues, isLoading }: Props) => {
  const { data: categories } = useSuspenseQuery(useCategoryQueries.list())
  const initialValues = getValues().categoryIds
  const initialCategory = categories.filter((category) =>
    initialValues.includes(category.id),
  )
  const [choiceCategories, setChoiceCategories] =
    useState<CategoryType[]>(initialCategory)

  const addCategory = (category: CategoryType) => {
    const currentIds = getValues().categoryIds || []

    if (choiceCategories.length >= 5 || currentIds.includes(category.id)) {
      // Todo: Toast 처리
      return
    }
    const updated = [...choiceCategories, category]
    setChoiceCategories(updated)
    setValue(
      'categoryIds',
      updated.map((c) => c.id),
    )
  }

  const removeCategory = (category: CategoryType) => {
    const updated = choiceCategories.filter((c) => c.id !== category.id)
    setChoiceCategories(updated)
    setValue(
      'categoryIds',
      updated.map((c) => c.id),
    )
  }

  const includeInCategories = (category: CategoryType) => {
    return choiceCategories.some((c) => c.id === category.id)
  }

  return (
    <>
      <Title
        title={'내가 알리고 싶은 맛집의 종류는?'}
        description={'어울리는 카테고리를 모두 골라주세요!'}
      />
      <ChoiceCategoryBox
        choiceCategories={choiceCategories}
        removeCategory={removeCategory}
      />
      <CategoryBox
        categories={categories}
        addCategory={addCategory}
        removeCategory={removeCategory}
        includeInCategories={includeInCategories}
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
