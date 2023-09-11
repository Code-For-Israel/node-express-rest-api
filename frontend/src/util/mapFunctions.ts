import type { Location } from 'LocationTypes'
import LocationPinIcon from 'public/icons/location-pin.svg'
import MizrahiIcon from 'public/icons/mizrahi-icon.svg'
import SuperPharmIcon from 'public/icons/superpharm-icon.svg'

type Coordinates =
  | {
      lat: number
      lng: number
    }
  | google.maps.LatLng

export const calculateDistance = (point1: Coordinates, point2: Coordinates): number => {
  if (point1 instanceof google.maps.LatLng) point1 = { lat: point1.lat(), lng: point1.lng() }
  if (point2 instanceof google.maps.LatLng) point2 = { lat: point2.lat(), lng: point2.lng() }
  const R = 6371e3
  const toRad = (deg: number): number => (deg * Math.PI) / 180
  const lat1 = toRad(point1.lat)
  const lat2 = toRad(point2.lat)
  const dLat = toRad(point2.lat - point1.lat)
  const dLon = toRad(point2.lng - point1.lng)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export const renderLocationIcon = (location: Location) => {
  switch (location?.OrganizationName_c || '') {
    case 'SuperPharm':
      return SuperPharmIcon
    case 'MizrahiBank':
      return MizrahiIcon
    default:
      return LocationPinIcon
  }
}
