import { Column } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { CAMPUS, type CampusType } from '@/consts/campus'
import { RequestListItem } from '@/app/_components/RequestListItem'
import { Request } from '@/app/_api/types'

type Props = {
  campus: CampusType
  requestList: Request[]
}

export const RequestsByCampus = ({ campus, requestList }: Props) => (
  <Column as={'section'} className={'gap-1'}>
    <Text variant={'heading2'} className={'text-main'}>
      {CAMPUS[campus]}캠
    </Text>
    <ul>
      {requestList.map((request) => (
        <RequestListItem key={request.placeName} {...request} />
      ))}
    </ul>
  </Column>
)
