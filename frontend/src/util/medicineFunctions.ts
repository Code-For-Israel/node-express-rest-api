import { MedicineItemType } from 'MedicineTypes'
import axios from 'axios'

export const checkMedicineDetails = async (medicine: MedicineItemType) => {
  let barcode = medicine.barcodes.split(' ')[0]
  const isExpensive = medicine.customerPrice && medicine.customerPrice >= 1000 ? true : false
  const isRare = false
  if (barcode.trim().length > 0) {
    const medicineDetails = await axios
      .post('https://israeldrugs.health.gov.il/GovServiceList/IDRServer/GetSpecificDrug', {
        dragRegNum: medicine.dragRegNum,
      })
      .catch(e => {
        console.log(e)
      })
    if (medicineDetails && medicineDetails.data) {
      const packageWithBarcode = medicineDetails.data.packages.filter((p: any) => p.barcode.trim().length > 0)
      if (packageWithBarcode.length > 0) {
        barcode = packageWithBarcode[0].barcode
      }
    }
  }
  return { isExpensive, isRare }
}
