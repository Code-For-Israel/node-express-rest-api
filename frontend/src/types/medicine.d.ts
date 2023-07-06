declare module 'MedicineTypes' {
  export interface MedicineItemType {
    id: number
    name: string
    englishName: string
    description?: string
    price?: number
    image?: string
    needCold?: boolean
  }
}
