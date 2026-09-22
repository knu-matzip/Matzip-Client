'use client'
import { Suspense, useEffect } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useCategoryQueries } from '@/_apis/queries/category'
import { useCategoryIdFromUrl } from './_hooks/useCategoryIdFromUrl'

import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { Header } from '@repo/ui/components/Header'
import { Flex } from '@repo/ui/components/Layout'
import { HeaderBackButton } from '@/_components/HeaderBackButton'
import { PlaceListItem } from '@/_components/PlaceListItem'
import { RowCategories, Places } from './_components'
import { SwipeableArea } from './_components/SwipeableArea'

export const CategoryDetailPage = () => {
  const { data: categories } = useSuspenseQuery(useCategoryQueries.list())
  const [categoryId, setCategoryId] = useCategoryIdFromUrl()
  const activeCategory = categories.find(
    (category) => category.id === categoryId,
  )
  const activeIndex = categories.findIndex((category) => category.id === categoryId)
  const prevCategory = categories[activeIndex - 1]
  const nextCategory = categories[activeIndex + 1]

  useEffect(() => {
    document.title = `공주대 맛집 | ${activeCategory?.name}`
  }, [activeCategory])

  return (
    <>
      <Header
        left={<HeaderBackButton />}
        center={
          <Flex className={'gap-1.5'}>
            <Icon type={activeCategory?.iconKey || 'logo'} />
            <Text variant={'heading2'} className={'pr-6'}>
              {activeCategory?.name}
            </Text>
          </Flex>
        }
        className={'border-b-1 border-gray-50'}
      />
      <RowCategories
        categories={categories}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
      />
      <SwipeableArea
        activeKey={categoryId}
        canSwipePrev={Boolean(prevCategory)}
        canSwipeNext={Boolean(nextCategory)}
        onPrev={() => prevCategory && setCategoryId(prevCategory.id)}
        onNext={() => nextCategory && setCategoryId(nextCategory.id)}
      >
        <Suspense fallback={<PlaceListItem.Skeleton count={3} />}>
          <Places categoryId={categoryId} />
        </Suspense>
      </SwipeableArea>
    </>
  )
}
