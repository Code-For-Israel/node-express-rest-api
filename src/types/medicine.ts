export interface Medicine {
    medicineId: string,
    names: string[]
};

export interface MedicineDetails {
    medicineId: string,
    barcode: string,
    name: string,
    englishName: string | undefined,
    genericName: string | undefined,
    nameOptions: string,
    isExpensive: boolean,
    isInLowSupply: boolean,
    requireRefrigeration: boolean,
    buyPrice: number,
    salePrice: number
};