export type Coord = { latitude: number; longitude: number }
type LatLng = { lat: number; lng: number }

export const toLatLng = ({ latitude, longitude }: Coord): LatLng => ({
  lat: latitude,
  lng: longitude,
})
