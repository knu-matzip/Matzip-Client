import { Text } from '@repo/ui/components/Text'
import type { RequestDetail } from '../../_api/types'

type Props = {
  description: RequestDetail['description']
}

export const Description = ({ description }: Props) => {
  return (
    <Text variant={'body2'} className={'whitespace-pre-wrap'}>
      {description}
    </Text>
  )
}
