declare module 'LocationTypes' {
  export interface Location {
    _id: string | number
    SiteId: string | number
    Name_c: string
    FormattedAddress: string
    Settelment_c: string
    Address_c?: string | null
    Type: string
    RefrigeratedMedicines_c: boolean | 'TRUE' | 'FALSE'
    Coordinates_c?: google.maps.LatLngLiteral
    distance?: number
    WhatsappNumber_c?: string | null
    OrganizationName_c?: string
    OpeningHours_c?: string
  }
}
