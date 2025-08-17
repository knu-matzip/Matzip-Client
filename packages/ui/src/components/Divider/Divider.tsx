import { cn } from '../../utils/cn'

export const Divider = ({ className }: { className?: string }) => (
  <hr className={cn('ui:border-[#EFF1F3] ui:border-[4px]', className)} />
)
