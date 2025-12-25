import { Text } from '@repo/ui/components/Text'
import { PlaceDetail } from '@/_apis/schemas/place'

type Props = {
  description: PlaceDetail['description']
}

export const Description = ({ description }: Props) => {
  return (
    <Text variant={'body2'} className={'whitespace-pre-wrap'}>
      {description}
    </Text>
  )
}
