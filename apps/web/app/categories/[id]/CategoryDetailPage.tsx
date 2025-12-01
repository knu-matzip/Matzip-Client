'use client'

import { usePathname } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useCategoryQueries } from '@/_apis/queries/category'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { Header } from '@repo/ui/components/Header'
import { Flex } from '@repo/ui/components/Layout'
import { HeaderBackButton } from '@/_components/HeaderBackButton'
import { RowCategories, Places } from './_components'
import { Suspense, useEffect } from 'react'
import { Spinner } from '@heroui/react'

export const CategoryDetailPage = () => {
  const { data: categories } = useSuspenseQuery(useCategoryQueries.list())
  const activeCategoryId = usePathname().split('/')[2] || '0'
  const activeCategory = categories.find(
    (category) => category.id === activeCategoryId,
  )

  const setId = (id: string) => {
    window.history.replaceState(null, '', `/categories/${id}`)
  }

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
        id={activeCategoryId}
        categories={categories}
        setId={setId}
      />
      {/*Todo: 맛집 리스트 스켈레톤으로 변경하기*/}
      <Suspense fallback={<Spinner className={'my-auto'} />}>
        <Places id={activeCategoryId} setId={setId} />
      </Suspense>
    </>
  )
}
