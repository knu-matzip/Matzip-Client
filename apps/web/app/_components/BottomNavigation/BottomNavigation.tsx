import { TabItem, type TabItemProps } from './TabItem'
import { cn } from '@repo/ui/utils/cn'
import { JustifyBetween } from '@repo/ui/components/Layout'

const tabs: TabItemProps[] = [
  { path: 'MAIN', label: '메인', icon: 'home' },
  { path: 'MAP', label: '주변 맛집', icon: 'map' },
  { path: 'PLACE_NEW', label: '', icon: 'circlePlus', iconSize: 50 },
  { path: 'LIKES', label: '찜', icon: 'navHeart' },
  { path: 'PROFILE', label: '내 정보', icon: 'navUser' },
]

export const BottomNavigation = () => {
  return (
    <JustifyBetween
      as={'nav'}
      className={cn(
        'border-t-1',
        'border-gray-50',
        'h-15',
        'mt-auto',
        'px-5 py-2.5',
      )}
    >
      {tabs.map((tab: TabItemProps) => (
        <TabItem key={tab.path} {...tab} />
      ))}
    </JustifyBetween>
  )
}
