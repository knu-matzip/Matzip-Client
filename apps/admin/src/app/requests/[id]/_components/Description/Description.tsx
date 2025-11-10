import { Column, Flex } from '@repo/ui/components/Layout'
import { Chip } from '@repo/ui/components/Chip'
import { Text } from '@repo/ui/components/Text'
import { RequestDetail } from '../../_api/types'

type Props = {
  description: RequestDetail['description']
  tags: RequestDetail['tags']
}

export const Description = ({ description, tags }: Props) => {
  return (
    <Column className={'gap-1.5'}>
      <Text>소개</Text>
      <Text variant={'body2'} className={'whitespace-pre-wrap'}>
        {description}
      </Text>
      <Flex className={'gap-1'}>
        {tags.map((tag) => (
          <Chip key={tag.id} icon={tag.iconKey} label={tag.name} />
        ))}
      </Flex>
    </Column>
  )
}
