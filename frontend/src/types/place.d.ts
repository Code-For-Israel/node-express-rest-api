declare module 'PlaceTypes' {
  export interface PlaceType {
    id: number
    name: string
    address: string
    distance: number
    type: 'private' | 'business' | 'pharmacy' | 'other'
    hasCold: boolean
    phone?: string
  }
}
