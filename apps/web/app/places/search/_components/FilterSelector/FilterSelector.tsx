import { Flex } from '@repo/ui/components/Layout/Flex'
import { cn } from '@repo/ui/utils/cn'

export type FilterOption = { key: string; label: string }

type Props<T extends FilterOption> = {
  value: T['key']
  onChange: (newKey: T['key']) => void
  // 제네릭 비 사용 시 (newKey: string) => void 로 추론됨
  options: T[]
}

// 재사용 시 파일 이동 고려
export const FilterSelector = <T extends FilterOption>({
  value,
  onChange,
  options,
}: Props<T>) => {
  return (
    <Flex className={'gap-2 px-5 py-3'}>
      {options.map((option) => (
        <FilterButton
          key={option.key}
          label={option.label}
          isSelected={value === option.key}
          onClick={() => onChange(option.key)}
        />
      ))}
    </Flex>
  )
}

export const FilterButton = ({
  label,
  isSelected,
  onClick,
}: {
  label: string
  isSelected: boolean
  onClick: VoidFunction
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full px-4 py-2 font-semibold transition-colors',
        'shadow-[0px_0px_8px_4px_rgba(0,0,0,0.1)]',
        isSelected
          ? 'bg-main text-white'
          : 'bg-white text-gray-500 hover:bg-gray-50',
      )}
    >
      {label}
    </button>
  )
}
