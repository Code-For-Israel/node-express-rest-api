declare module 'LocationTypes' {
  export interface Location {
    _id: string | number
    SiteId: string | number
    Name_c: string
    FormattedAddress: string
    Settelment_c: string
    Address_c?: string | null
    Type: string
    RefrigeratedMedicines_c: boolean
    Coordinates_c?: google.maps.LatLngLiteral | google.maps.LatLng
    distance?: number
    WhatsappNumber_c?: string | null
  }
}
