import { useSuspenseQuery } from '@tanstack/react-query'
import { useCampusStore } from '@/_store/campus'
import { usePlaceQueries } from '@/_apis/queries/place'
import { PlaceListItem } from '@/_components/PlaceListItem'
import { VerticalScrollArea } from '@repo/ui/components/Layout'
import { EmptyPlaces } from './EmptyPlaces'

export const Places = ({ id }: { id: string }) => {
  const { campus } = useCampusStore()
  const { data: places } = useSuspenseQuery(
    usePlaceQueries.byCategory(id, campus),
  )

  if (places.length === 0) {
    return <EmptyPlaces />
  }

  return (
    <VerticalScrollArea as={'ul'} className={'px-8'}>
      {places.map((place, index) => (
        <PlaceListItem
          key={place.placeId}
          {...place}
          showBorder={index !== places.length - 1}
        />
      ))}
    </VerticalScrollArea>
  )
}
