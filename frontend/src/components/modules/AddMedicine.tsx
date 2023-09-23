import FormRadio from '@/components/elements/FormRadio'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { RadioGroup, Stack, Typography } from '@mui/material'
import { MedicineItemType } from 'MedicineTypes'
import { ChangeEvent } from 'react'

type Props = { medicine: MedicineItemType; onSave: (medicine: MedicineItemType, state: MedicineItemType['expiryState']) => void }

const AddMedicine = ({ medicine, onSave }: Props) => {
  const { t } = useStaticTranslation()

  const handlePick = (_: ChangeEvent<HTMLInputElement>, value: string) => {
    onSave(medicine, value as MedicineItemType['expiryState'])
  }

  return (
    <Stack
      direction={'column'}
      gap={'5svh'}
      pb={2}
      mt={'25px'}
      px={4}
      sx={{ width: '100%', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}
    >
      <Stack pt={3} justifyContent={'center'} alignItems={'center'} textAlign={'center'} overflow={'hidden'} whiteSpace={'nowrap'}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          {t('will_expire_soon')}
        </Typography>
        <Typography
          variant="body1"
          textAlign={'center'}
          textTransform={'capitalize'}
          sx={{ direction: 'rtl', overflow: 'hidden', width: '100%', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
        >
          {medicine.englishName.toLowerCase()}
        </Typography>
        <Typography
          variant="body1"
          textAlign={'center'}
          sx={{
            overflow: 'hidden',
            width: '100%',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            display: medicine.Name === medicine.englishName ? 'none' : 'block',
          }}
        >
          {medicine.Name}
        </Typography>
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
