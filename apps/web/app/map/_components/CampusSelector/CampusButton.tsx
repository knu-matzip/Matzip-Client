import { type CampusType, CAMPUS, CAMPUS_COLOR } from '@/_constants/campus'
import { cn } from '@repo/ui/utils/cn'
import { Text } from '@repo/ui/components/Text'

type Props = {
  campus: CampusType
  isActive: boolean
  onClick: VoidFunction
}

export const CampusButton = ({ campus, isActive, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'border-3 rounded-xl p-2',
        CAMPUS_COLOR[campus].background,
        CAMPUS_COLOR[campus].border.default,
        isActive && [CAMPUS_COLOR[campus].border.active],
      )}
    >
      <Text
        fontSize='sm'
        fontWeight={isActive ? 'semibold' : 'medium'}
        className={cn(CAMPUS_COLOR[campus].text)}
      >
        {CAMPUS[campus]}
      </Text>
    </button>
  )
}
