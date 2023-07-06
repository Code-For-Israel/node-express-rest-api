import FormRadio from '@/components/elements/FormRadio'
import { Button, RadioGroup, Stack, Typography } from '@mui/material'
import { MedicineItemType } from 'MedicineTypes'
import { useTranslation } from 'next-i18next'
import { Controller, useForm } from 'react-hook-form'

type Props = { medicine: MedicineItemType; onSave: (medicine: MedicineItemType, state: string) => void }

const AddMedicine = ({ medicine, onSave }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
    watch,
  } = useForm()
  const { t } = useTranslation()

  const onSubmit = (data: any) => {
    onSave(medicine, data.expiredState)
  }

  const expiredState = watch('expiredState')

  return (
    <Stack
      direction={'column'}
      component={'form'}
      gap={1}
      py={3}
      px={5}
      justifyContent={'space-between'}
      sx={{ height: '100%', width: '100%', overflowY: 'auto' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack width="100%" sx={{ textAlign: 'center' }}>
        <Typography variant="h1">{medicine.name}</Typography>
        <Typography variant="h1">{medicine.englishName}</Typography>
      </Stack>
      <Typography variant="body1">{t('will_expire_soon')}</Typography>
      <Controller
        name="expiredState"
        control={control}
        defaultValue={''}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <RadioGroup sx={{ width: 'fit-content' }} aria-label="expired-state" value={value} onChange={onChange}>
            <FormRadio value="inAMonth" label="כן" selected={expiredState} />
            <FormRadio value="noOrUnknown" label="לא / לא ידוע" selected={expiredState} />
            <FormRadio value="expired" label="פג תוקף" selected={expiredState} />
          </RadioGroup>
        )}
      />
      <Button variant="contained" sx={{ mb: 3 }} disabled={!isValid} type="submit">
        {t('add_medicine')}
      </Button>
    </Stack>
  )
}

export default AddMedicine
