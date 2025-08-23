import { useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useCategoryQueries } from '@/_apis/queries/category'
import type { Category as CategoryType } from '@/_apis/schemas/category'
import { CategoryBox } from './CategoryBox'
import { ChoiceCategoryBox } from './ChoiceCategoryBox'
import { Title } from '../../Tilte'
import { Button } from '@repo/ui/components/Button'

export const Category = () => {
  const { data: categories } = useSuspenseQuery(useCategoryQueries.list())
  const [choiceCategories, setChoiceCategories] = useState<CategoryType[]>([])

  const addCategories = (category: CategoryType) => {
    if (choiceCategories.length >= 5 || includeInCategories(category)) {
      // Todo: Toast 처리
      return
    }
    setChoiceCategories((prev) => [...prev, category])
  }

  const removeCategories = (category: CategoryType) => {
    if (choiceCategories.length === 0) {
      // Todo: Toast 처리
      return
    }
    setChoiceCategories((prev) => prev.filter((c) => c.id !== category.id))
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
        removeCategories={removeCategories}
      />
      <CategoryBox
        categories={categories}
        addCategories={addCategories}
        includeInCategories={includeInCategories}
      />
      <Button size={'medium'} className={'mt-auto w-full'}>
        등록하기
      </Button>
    </>
  )
}
