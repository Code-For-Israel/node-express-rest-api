import LoaderOverlay from '@/components/elements/LoaderOverlay'
import MedicinePreviewItem from '@/components/elements/MedicinePreviewItem'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Box, Button, Typography } from '@mui/material'
import { MedicineItemType } from 'MedicineTypes'
import { useState } from 'react'
import NewMedicineDialog from './NewMedicineDialog'

type Props = {
  medicineData: MedicineItemType[]
  savedMedicines: MedicineItemType[]
  isFetching: boolean
  hideText: boolean
  isFetched: boolean
  onSelect: (medicine: MedicineItemType) => void
  onRemove: (medicine: MedicineItemType) => void
  onSkip: () => void
  animate: string | null
  searchValue: string
}

const MedicineSuggestions = ({
  searchValue,
  medicineData,
  isFetching,
  hideText,
  isFetched,
  savedMedicines,
  onSelect,
  onRemove,
  onSkip,
  animate,
}: Props) => {
  const [openDialog, setOpenDialog] = useState(false)

  const { t } = useStaticTranslation()

  const isMedicineAdded = (id: string) => savedMedicines.some((m: MedicineItemType) => m._id === id)

  const closeNewMedicineDialog = () => {
    setOpenDialog(false)
  }
  const openNewMedicineDialog = () => {
    setOpenDialog(true)
  }

  const handleAddNew = (medicineName: string) => {
    onSelect({
      _id: `unknown-medicine-${medicineName}`,
      Name: medicineName,
      englishName: medicineName,
      dragRegNum: '',
      barcodes: '',
    })
    closeNewMedicineDialog()
  }

  return (
    <Box pt={2} position={'relative'} sx={{ width: '100%', height: '100%', maxHeight: 'calc(90svh - 250px)', overflowY: 'auto' }}>
      <LoaderOverlay loading={isFetching} />
      {openDialog && <NewMedicineDialog initialValue={searchValue} onAddNew={handleAddNew} open={openDialog} onClose={closeNewMedicineDialog} />}
      {hideText &&
        medicineData.length > 0 &&
        medicineData.map((m: MedicineItemType, i: number) => (
          <MedicinePreviewItem
            onClick={onSelect}
            key={m._id}
            selected={isMedicineAdded(m._id)}
            index={i}
            animate={animate}
            medicine={m}
            onRemove={onRemove}
          />
        ))}
      {isFetched && hideText && medicineData.length < 1 && (
        <Box sx={{ mt: '20px', textAlign: 'center' }}>
          <Typography variant="body2" textAlign={'center'}>
            {t('no_medicines_found')}
          </Typography>
          <Button
            variant="text"
            onClick={openNewMedicineDialog}
            color="primary"
            sx={{ width: 'fit-content', textAlign: 'center', margin: 'auto', mt: 0.5, fontSize: 18, fontWeight: 600 }}
          >
            {t('add_new_medicine')}
          </Button>
        </Box>
      )}
      <Button
        variant="text"
        color="info"
        sx={{ width: 'fit-content', textAlign: 'center', margin: 'auto', mt: 1, display: medicineData.length > 0 ? 'none' : 'block' }}
        onClick={onSkip}
      >
        {t('want_to_skip')}
      </Button>
    </Box>
  )
}

export default MedicineSuggestions
