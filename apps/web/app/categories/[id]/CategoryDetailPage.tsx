'use client'

import { useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useCategoryQueries } from '@/_apis/queries/category'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { Header } from '@repo/ui/components/Header'
import { Column, Flex } from '@repo/ui/components/Layout'
import { HeaderBackButton } from '@/_components/HeaderBackButton'
import { RowCategories, Places } from './_components'

type Props = {
  initId: string
}

export const CategoryDetailPage = ({ initId }: Props) => {
  const [id, setId] = useState(initId)

  const { data: categories } = useSuspenseQuery(useCategoryQueries.list())
  const activeCategory = categories.find((category) => category.id === id)

  const setIdFunc = (id: string) => {
    setId(id)
  }

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
      <Column className={'gap-2.5 px-5 py-2.5'}>
        <RowCategories id={id} categories={categories} setIdFunc={setIdFunc} />
        <Places id={id} />
      </Column>
    </>
  )
}
