import { ReactDOMServer } from 'next/dist/server/route-modules/app-page/vendored/ssr/entrypoints'
import { Marker, useNavermaps } from 'react-naver-maps'
import { type Coord, toLatLng } from '@/map/_utils/toLatLng'
import { type IconType, Icon } from '@repo/ui/components/Icon'
import { Column } from '@repo/ui/components/Layout'

/**
 * 사용자의 현재 위치를 나타내는 마커
 * @param position
 */
export const UserMarker = ({ position }: { position: Coord }) => {
  const naverMaps = useNavermaps()
  const MarkerIcon = ReactDOMServer.renderToString(
    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/30'>
      <div className='h-[18px] w-[18px] rounded-full border-2 border-white bg-blue-500' />
    </div>,
  )

  return (
    <Marker
      position={new naverMaps.LatLng(toLatLng(position))}
      icon={{
        content: MarkerIcon,
        anchor: [20, 20],
      }}
    ></Marker>
  )
}

/**
 * 맛집 위치를 나타내는 마커
 * @param icon
 * @param position
 * @param handlePreviewPlace
 */
export const PlaceMarker = ({
  icon,
  position,
  handlePreviewPlace,
}: {
  icon: IconType
  position: Coord
  handlePreviewPlace?: VoidFunction
}) => {
  const naverMaps = useNavermaps()
  const MarkerIcon = ReactDOMServer.renderToString(
    <Column className='relative items-center'>
      <Icon type={'mapMarker'} size={56} />
      <Icon type={icon} size={26} className={'top-1/5 absolute'} />
    </Column>,
  )

  return (
    <Marker
      onClick={handlePreviewPlace}
      position={new naverMaps.LatLng(toLatLng(position))}
      icon={{
        content: MarkerIcon,
        anchor: [28, 56],
      }}
    ></Marker>
  )
}
