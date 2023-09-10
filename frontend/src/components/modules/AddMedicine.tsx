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
  }

  return (
    <Stack direction={'column'} gap={7} py={3} px={4} sx={{ width: '100%' }}>
      <Stack gap={2} pt={3} justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
        <Typography variant="h3">{t('will_expire_soon')}</Typography>
        <Stack>
          <Typography variant="body1" textAlign={'center'} textTransform={'capitalize'}>
            {medicine.englishName.toLowerCase()}
          </Typography>
          <Typography variant="body1" textAlign={'center'} sx={{ display: medicine.Name === medicine.englishName ? 'none' : 'block' }}>
            {medicine.Name}
          </Typography>
        </Stack>
      </Stack>
      <RadioGroup sx={{ width: 'fit-content', pl: 4, rowGap: 1 }} aria-label="expired-state" onChange={handlePick}>
        <FormRadio value="noOrUnknown" label={t('no_unknown')} />
        <FormRadio value="inAMonth" label={t('yes')} />
        <FormRadio value="expired" label={t('expired')} />
      </RadioGroup>
    </Stack>
  )
}

export default AddMedicine
