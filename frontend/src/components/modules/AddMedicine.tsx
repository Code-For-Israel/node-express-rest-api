import FormRadio from '@/components/elements/FormRadio'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Box, Button, RadioGroup, Stack, Typography } from '@mui/material'
import { MedicineItemType } from 'MedicineTypes'
import { Controller, useForm } from 'react-hook-form'

type Props = { medicine: MedicineItemType; onSave: (medicine: MedicineItemType, state: string) => void }

const AddMedicine = ({ medicine, onSave }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm()
  const { t } = useStaticTranslation()

  const onSubmit = (data: any) => {
    onSave(medicine, data.expiredState)
  }

  return (
    <Stack
      direction={'column'}
      component={'form'}
      gap={1}
      py={3}
      px={4}
      justifyContent={'space-between'}
      sx={{ height: '100%', width: '100%', overflowY: 'auto' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack gap={2} pt={3} justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
        <Typography variant="h3">{t('will_expire_soon')}</Typography>
        <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1em 1fr' }}>
          <Typography variant="body1" textAlign={'right'}>
            {medicine.name}
          </Typography>
          <Typography variant="body1" textAlign={'center'}>
            |
          </Typography>
          <Typography variant="body1" textAlign={'left'}>
            {medicine.englishName}
          </Typography>
        </Box>
      </Stack>
      <Controller
        name="expiredState"
        control={control}
        defaultValue={''}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <RadioGroup sx={{ width: 'fit-content' }} aria-label="expired-state" value={value} onChange={onChange}>
            <FormRadio value="inAMonth" label="כן" />
            <FormRadio value="noOrUnknown" label="לא / לא ידוע" />
            <FormRadio value="expired" label="פג תוקף" />
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
