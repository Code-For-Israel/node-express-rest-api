export interface MedicineName {
    medicine_id: string,
    name: string,
    name_in_second_lang: string
};

export function dbItems2MedicineNames(items: any[]): MedicineName[] {
    return items.map(({ medicine_id, name, name_in_second_lang }) => ({ medicine_id, name, name_in_second_lang }));
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