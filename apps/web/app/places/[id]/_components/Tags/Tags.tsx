import { Flex } from '@repo/ui/components/Layout'
import { Chip } from '@repo/ui/components/Chip'
import { PlaceDetail } from '@/_apis/schemas/place'

type Props = {
  tags: PlaceDetail['tags']
}

export const Tags = ({ tags }: Props) => (
  <Flex className={'flex-wrap gap-2'}>
    {tags.map((tag) => (
      <Chip key={tag.id} icon={tag.iconKey} label={tag.name} />
    ))}
  </Flex>
)
