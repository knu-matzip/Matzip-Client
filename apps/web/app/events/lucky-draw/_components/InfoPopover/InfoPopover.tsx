'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { Column } from '@repo/ui/components/Layout'

export const InfoPopover = () => (
  <Popover placement='bottom-end'>
    <PopoverTrigger>
      <button>
        <Icon type={'questionMark'} />
      </button>
    </PopoverTrigger>
    <PopoverContent>
      <Column className='gap-1 px-1 py-2'>
        <Text fontWeight={'light'} fontSize={'xs'}>
          • 맛집 1개 등록 시 이벤트 자동 응모
        </Text>
        <Text fontWeight={'light'} fontSize={'xs'}>
          • 등록한 맛집은 관리자 승인 후 응모 완료
        </Text>
        <Text fontWeight={'light'} fontSize={'xs'}>
          • 맛집 등록 개수 제한 없음
        </Text>
        <Text fontWeight={'light'} fontSize={'xs'}>
          • 맛집을 많이 등록할수록 당첨 확률 증가
        </Text>
        <Text fontWeight={'light'} fontSize={'xs'}>
          • 이벤트당 1회만 &#34;당첨&#34; 가능
        </Text>
        <Text fontWeight={'light'} fontSize={'xs'}>
          • 당첨 시 전화번호 등록 후 연락
        </Text>
      </Column>
    </PopoverContent>
  </Popover>
)
