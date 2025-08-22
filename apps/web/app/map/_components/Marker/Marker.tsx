import { Marker, useNavermaps } from 'react-naver-maps'
import { Coord, toLatLng } from '@/map/_utils/toLatLng'

/**
 * 사용자의 현재 위치를 나타내는 마커
 * @param position
 */
export const UserMarker = ({ position }: { position: Coord }) => {
  const naverMaps = useNavermaps()
  const MarkerIcon = `
    <div class="user-marker-icon-container">
      <div class="user-marker-icon"/>
    </div>
  `

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
