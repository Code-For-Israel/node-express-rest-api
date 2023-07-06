import useFormWizard from '@/hooks/useFormWizard'
import { Box, Button, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'
import { FormValuesType } from 'FormTypes'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'

const Cold = () => {
  const { stepTo, updateFormData, formData, submitData } = useFormWizard()
  const { medicineQuantity } = formData
  const { register, handleSubmit, watch } = useForm()
  const { t } = useTranslation()

  const handleNext = (hasCold: boolean) => () => {
    updateFormData({ hasCold: hasCold })
    if (medicineQuantity && medicineQuantity !== '1-10') {
      stepTo('names')
    } else {
      submitData('map')
      stepTo('map')
    }
  }

  if (medicineQuantity && medicineQuantity === '1-10')
    return (
      <Stack gap={2} pb={3} alignItems={'center'} width={'100%'} justifyContent={'space-between'}>
        <Box width={'100%'} textAlign={'center'}>
          <Typography variant="h1">{t('cold_page_title_few')}</Typography>
        </Box>
        <Stack direction={'row'} gap={2} width={'100%'}>
          <Button variant="outlined" onClick={handleNext(true)}>
            {t('yes')}
          </Button>
          <Button onClick={handleNext(false)}>{t('no')}</Button>
        </Stack>
      </Stack>
    )

  const { hasCold: watchHasCold, hasExpensive: watchHasExpensive } = watch()
  const onSubmit = (data: FormValuesType) => {
    updateFormData(data)
    stepTo('names')
  }

  return (
    <Stack gap={2} pb={3} alignItems={'center'} width={'100%'} justifyContent={'space-between'} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box width={'100%'} textAlign={'center'}>
        <Typography variant="h1">{t('cold_page_title_many')}</Typography>
      </Box>
      <Stack mt={6} flex={1} width={'100%'}>
        <FormControlLabel control={<Checkbox {...register('hasCold')} />} label={t('i_have_cold_medicine')} />
        <FormControlLabel control={<Checkbox {...register('hasExpensive')} />} label={t('i_have_expensive_medicine')} />
      </Stack>
      <Stack gap={2} width={'100%'}>
        <Button variant="contained" disabled={!watchHasCold && !watchHasExpensive} type="submit">
          {t('continue')}
        </Button>
        <Button variant="text" disabled={!!watchHasCold || !!watchHasExpensive} onClick={handleNext(false)}>
          {t('no_dont_have')}
        </Button>
      </Stack>
    </Stack>
  )
}

export default Cold
