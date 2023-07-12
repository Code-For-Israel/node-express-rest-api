import { MedicineDetails } from '../types/medicine';

export const medicines: MedicineDetails[] = [
    {
        medicineId: '123',
        barcode: '12345678HL',
        name: 'שם תרופה #1',
        englishName: 'Medicine Name #1',
        genericName: 'Generic Name #1',
        nameOptions: 'Name Option 1, Name Option 2',
        isExpensive: true,
        isInLowSupply: false,
        requireRefrigeration: true,
        buyPrice: 1200,
        salePrice: 1500
    },
    {
        medicineId: '456',
        barcode: '22345678HL',
        name: 'שם תרופה #2',
        englishName: 'Medicine Name #2',
        genericName: 'Generic Name #2',
        nameOptions: 'Name Option 1, Name Option 2',
        isExpensive: false,
        isInLowSupply: false,
        requireRefrigeration: true,
        buyPrice: 1200,
        salePrice: 1500
    },
    {
        medicineId: '789',
        barcode: '22345678BG',
        name: 'שם תרופה #3',
        englishName: 'Medicine Name #3',
        genericName: 'Generic Name #3',
        nameOptions: 'Name Option 1, Name Option 2',
        isExpensive: false,
        isInLowSupply: true,
        requireRefrigeration: true,
        buyPrice: 1200,
        salePrice: 1500
    },
    {
        medicineId: '987',
        barcode: '22355678BG',
        name: 'שם תרופה #4',
        englishName: 'Medicine Name #4',
        genericName: 'Generic Name #4',
        nameOptions: 'Name Option 1, Name Option 2',
        isExpensive: false,
        isInLowSupply: true,
        requireRefrigeration: false,
        buyPrice: 1200,
        salePrice: 1500
    }
];