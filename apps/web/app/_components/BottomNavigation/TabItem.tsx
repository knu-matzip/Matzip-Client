'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CLIENT_PATH } from '@/_constants/path'
import { cn } from '@repo/ui/utils/cn'
import { Text } from '@repo/ui/components/Text'
import { Icon, IconType } from '@repo/ui/components/Icon'

export type TabItemProps = {
  path: keyof Pick<
    typeof CLIENT_PATH,
    'MAIN' | 'MAP' | 'LIKES' | 'PROFILE' | 'PLACE_NEW'
  >
  icon: IconType
  iconSize?: number
  label?: string
}

export const TabItem = ({ path, label, icon, iconSize = 26 }: TabItemProps) => {
  const pathname = usePathname()
  const href = CLIENT_PATH[path]
  const active = pathname === href

  return (
    <Link href={href} className={'w-12.5 flex flex-col items-center'}>
      <Icon
        type={icon}
        size={iconSize}
        color={active ? '--color-main' : '--color-gray-200'}
      />
      {label && (
        <Text
          fontWeight={'normal'}
          className={cn('text-[10px]', active ? 'text-main' : 'text-gray-200')}
        >
          {label}
        </Text>
      )}
    </Link>
  )
}
