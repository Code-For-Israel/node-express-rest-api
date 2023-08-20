declare module 'LocationTypes' {
  export interface Location {
    _id: string
    name: string
    address: string
    type: 'private' | 'business' | 'pharmacy' | 'other'
    hasCold: boolean
    position?: google.maps.LatLngLiteral | google.maps.LatLng
    distance?: number
    phone?: string
  }
}
