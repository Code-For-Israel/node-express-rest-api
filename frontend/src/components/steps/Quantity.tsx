import useFormWizard from '@/hooks/useFormWizard'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Box, Button, RadioGroup, Stack, Typography } from '@mui/material'
import { FormValuesType } from 'FormTypes'
import { Controller, useForm } from 'react-hook-form'
import FormRadio from '../elements/FormRadio'
const Quantity = () => {
  const { updateFormData, stepTo } = useFormWizard()
  const {
    control,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm()
  const { t } = useStaticTranslation()

  const onSubmit = (data: FormValuesType) => {
    if (!isValid) return
    updateFormData(data)
    if (data.medicineQuantity !== '1-10') {
      stepTo('cold-storage')
    } else {
      stepTo('names')
    }
  }
  const quantity = watch('medicineQuantity')

  return (
    <Stack
      gap={2}
      pb={3}
      alignItems={'center'}
      width={'100%'}
      position={'relative'}
      justifyContent={'space-between'}
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h1">{t('quantity_page_title')}</Typography>
      <Box
        sx={{
          flex: 1,
          pt: 8,
          alignItems: 'start',
          display: 'flex',
          width: '100%',
        }}
      >
        <Controller
          name="medicineQuantity"
          control={control}
          defaultValue={''}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <RadioGroup aria-label="quantity" value={value} onChange={onChange} sx={{ rowGap: 1 }}>
              <FormRadio value="1-10" label={t('max_10_items')} selected={quantity} />
              <FormRadio value="11-40" label={t('max_40_items')} selected={quantity} />
              <FormRadio value="40+" label={t('40_plus_items')} selected={quantity} />
            </RadioGroup>
          )}
        />
      </Box>
      <Button type="submit" disabled={!isValid}>
        המשך
      </Button>
    </Stack>
  )
}

export default Quantity
