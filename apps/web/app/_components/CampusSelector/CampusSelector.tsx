'use client'

import type { Selection } from '@heroui/react'
import type { SharedSelection } from '@heroui/system'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'

import { CAMPUS, CAMPUS_LIST, type CampusType } from '@/_constants/campus'
import { useCampusStore } from '@/_store/campus'

export const CampusSelector = () => {
  const { campus, setCampus } = useCampusStore()
  const selectedKeys = new Set([campus]) as Selection

  const onSelectionChange = ({ currentKey }: SharedSelection) => {
    if (isCampusType(currentKey)) setCampus(currentKey)
  }

  return (
    <Dropdown>
      <DropdownTrigger className='flex items-center gap-1'>
        <Text
          as={'button'}
          fontSize='base'
          fontWeight='semibold'
          className='text-gray-300'
        >
          <Icon type='swapArrow' size={18} />
          {CAMPUS[campus]}캠퍼스
        </Text>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label='캠퍼스 변경'
        selectedKeys={selectedKeys}
        selectionMode='single'
        variant='flat'
        onSelectionChange={onSelectionChange}
      >
        {CAMPUS_LIST.map((campusKey) => (
          <DropdownItem key={campusKey}>{CAMPUS[campusKey]}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

function isCampusType(value: string | undefined): value is CampusType {
  if (value === undefined) return false

  return value in CAMPUS
}
