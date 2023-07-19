import { Medicine, MedicineDetails } from "../types/medicine";

const MEDICINE_NAMES_SEPARATOR = ',';

export const extractMedicineNames: (medicines: MedicineDetails[]) => Medicine[] = (medicines: MedicineDetails[]) => {
    return medicines.map(medicine => 
        ({
            medicineId: medicine.medicineId,
            names:
                [
                    medicine.name || '', medicine.englishName || '', medicine.genericName || '',
                    ...(medicine.nameOptions?.split(MEDICINE_NAMES_SEPARATOR).map(name => name.trim()) || [])
                ]
                .filter(name => !!name)
        })
    );
};

   