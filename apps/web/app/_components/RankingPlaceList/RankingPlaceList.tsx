import { Column } from '@repo/ui/components/Layout'
import { IconType } from '@repo/ui/components/Icon'
import { SubTitle } from '@/_components/SubTitle'
import { RankingPlace } from '@/_apis/schemas/place'
import { PlaceListItem } from '@/_components/PlaceListItem'

type Props = {
  title: string
  icon: IconType
  places: RankingPlace[]
}

export const RankingPlaceList = ({ title, icon, places }: Props) => {
  return (
    <Column className={'gap-1.5 px-5'}>
      <SubTitle title={title} icon={icon} />
      <ul className={'px-3'}>
        {places.map((place, index) => (
          <PlaceListItem
            key={place.placeId}
            {...place}
            showBorder={index !== places.length - 1}
          />
        ))}
      </ul>
    </Column>
  )
}
