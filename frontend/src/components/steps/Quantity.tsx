import FormRadio from '@/components/elements/FormRadio'
import useFormWizard from '@/hooks/useFormWizard'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Box, Button, Checkbox, FormControlLabel, RadioGroup, Stack, Typography } from '@mui/material'
import { FormValuesType } from 'FormTypes'
import { Controller, useForm } from 'react-hook-form'

const Quantity = () => {
  const { updateFormData, stepTo, formData } = useFormWizard()
  const {
    control,
    handleSubmit,
    formState: { isValid },
    register,
  } = useForm()
  const { t } = useStaticTranslation()

  const onSubmit = (data: FormValuesType) => {
    if (!isValid) return
    updateFormData(data)
    stepTo('cold-storage')
  }

  return (
    <Stack
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
          pt: '60px',
          alignItems: 'start',
          display: 'flex',
          width: '100%',
        }}
      >
        <Controller
          name="medicineQuantity"
          control={control}
          defaultValue={formData.medicineQuantity || ''}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <RadioGroup aria-label="quantity" value={value} onChange={onChange} sx={{ rowGap: '5px' }}>
              <FormRadio value="1-10" label={t('max_10_items')} />
              <FormRadio value="11-40" label={t('max_40_items')} />
              <FormRadio value="40+" label={t('40_plus_items')} />
            </RadioGroup>
          )}
        />
      </Box>
      <FormControlLabel
        sx={{ alignItems: 'flex-start', ml: -1, mb: 3.5 }}
        control={
          <Checkbox {...register('hasMoreProducts')} defaultChecked={formData.hasMoreProducts || false} size="small" sx={{ p: 0, px: 1, py: 0.5 }} />
        }
        label={t('i_have_more_products_to_donate')}
      />
      <Button type="submit" disabled={!isValid}>
        המשך
      </Button>
    </Stack>
  )
}

export default Quantity
