import FormRadio from '@/components/elements/FormRadio'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { RadioGroup, Stack, Typography } from '@mui/material'
import { MedicineItemType } from 'MedicineTypes'
import { ChangeEvent } from 'react'

type Props = { medicine: MedicineItemType; onSave: (medicine: MedicineItemType, state: string) => void }

const AddMedicine = ({ medicine, onSave }: Props) => {
  const { t } = useStaticTranslation()

  const handlePick = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    onSave(medicine, value)
    console.log(e)
  }

  return (
    <Stack direction={'column'} gap={7} py={3} px={4} sx={{ width: '100%', overflowY: 'auto' }}>
      <Stack gap={2} pt={3} justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
        <Typography variant="h3">{t('will_expire_soon')}</Typography>
        <Stack>
          <Typography variant="body1" textAlign={'center'} textTransform={'capitalize'}>
            {medicine.englishName.toLowerCase()}
          </Typography>
          <Typography variant="body1" textAlign={'center'}>
            {medicine.Name}
          </Typography>
        </Stack>
      </Stack>
      <RadioGroup sx={{ width: 'fit-content', pl: 4, rowGap: 1 }} aria-label="expired-state" onChange={handlePick}>
        <FormRadio value="inAMonth" label="כן" />
        <FormRadio value="noOrUnknown" label="לא / לא ידוע" />
        <FormRadio value="expired" label="פג תוקף" />
      </RadioGroup>
    </Stack>
  )
}

export default AddMedicine
