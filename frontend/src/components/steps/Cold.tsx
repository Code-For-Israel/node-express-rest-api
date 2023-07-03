import useFormWizard from '@/hooks/useFormWizard'
import { Box, Button, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'
import { FormValuesType } from 'FormTypes'
import { useForm } from 'react-hook-form'

const Cold = () => {
  const { stepTo, updateFormData, formData } = useFormWizard()
  const { medicineQuantity } = formData
  const { register, handleSubmit, watch } = useForm()

  const handleNext = (isCold: boolean) => () => {
    updateFormData({ isCold: isCold })
    if (medicineQuantity && medicineQuantity !== '1-10') {
      stepTo('names')
    } else stepTo('map')
  }

  if (medicineQuantity && medicineQuantity === '1-10')
    return (
      <Stack gap={2} pb={2} alignItems={'center'} width={'100%'} justifyContent={'space-between'}>
        <Box width={'100%'} textAlign={'center'}>
          <Typography variant="h1">האם חלק מהתרופות שלך שמורות במקרר?</Typography>
        </Box>
        <Stack direction={'row'} gap={2} width={'100%'}>
          <Button variant="outlined" onClick={handleNext(true)}>
            כן
          </Button>
          <Button onClick={handleNext(false)}>לא</Button>
        </Stack>
      </Stack>
    )

  const { isCold: watchIsCold, isExpensive: watchIsExpensive } = watch()
  const onSubmit = (data: FormValuesType) => {
    updateFormData(data)
    stepTo('names')
  }

  return (
    <Stack gap={2} pb={2} alignItems={'center'} width={'100%'} justifyContent={'space-between'} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box width={'100%'} textAlign={'center'}>
        <Typography variant="h1">האם יש לך תרופות במקרר או יקרות?</Typography>
      </Box>
      <Stack mt={6} flex={1} width={'100%'}>
        <FormControlLabel control={<Checkbox {...register('isCold')} />} label="יש לי תרופה במקרר" />
        <FormControlLabel control={<Checkbox {...register('isExpensive')} />} label="יש לי תרופה יקרה" />
      </Stack>
      <Stack gap={2} width={'100%'}>
        <Button variant="contained" disabled={!watchIsCold && !watchIsExpensive} type="submit">
          המשך
        </Button>
        <Button variant="text" disabled={!!watchIsCold || !!watchIsExpensive} onClick={handleNext(false)}>
          לא, אין לי
        </Button>
      </Stack>
    </Stack>
  )
}

export default Cold
