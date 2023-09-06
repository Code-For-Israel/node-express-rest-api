declare module 'MedicineTypes' {
  export interface MedicineItemType {
    _id: string
    Name: string
    englishName: string
    barcodes: string
    storeCold?: boolean
  }
}
