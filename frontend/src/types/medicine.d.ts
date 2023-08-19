declare module 'MedicineTypes' {
  export interface MedicineItemType {
    _id: string
    Name: string
    englishName: string
    description?: string
    price?: number
    image?: string
    needCold?: boolean
  }
}
