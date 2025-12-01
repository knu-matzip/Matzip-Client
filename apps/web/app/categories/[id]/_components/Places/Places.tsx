import { useSuspenseQuery } from '@tanstack/react-query'
import { useCampusStore } from '@/_store/campus'
import { usePlaceQueries } from '@/_apis/queries/place'
import { PlaceListItem } from '@/_components/PlaceListItem'
import { VerticalScrollArea } from '@repo/ui/components/Layout'
import { EmptyPlaces } from './EmptyPlaces'

type Props = {
  categoryId: string
}

export const Places = ({ categoryId }: Props) => {
  const { campus } = useCampusStore()
  const { data: places } = useSuspenseQuery(
    usePlaceQueries.byCategory(categoryId, campus),
  )

  return (
    <>
      {places.length === 0 ? (
        <EmptyPlaces />
      ) : (
        <VerticalScrollArea as={'ul'}>
          {places.map((place, index) => (
            <PlaceListItem
              key={place.placeId}
              {...place}
              showCategory={false}
              showBorder={index !== places.length - 1}
            />
          ))}
        </VerticalScrollArea>
      )}
    </>
  )
}
