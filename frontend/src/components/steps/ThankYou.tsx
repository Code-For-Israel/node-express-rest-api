import useFormWizard from '@/hooks/useFormWizard'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Button, Stack, Typography } from '@mui/material'
const ThankYou = () => {
  const { stepTo, resetFormData } = useFormWizard()
  const { t } = useStaticTranslation()
  const handleClose = () => {
    resetFormData()
    stepTo('start')
  }

  return (
    <Stack gap={2} pt={5} pb={2} alignItems={'center'} width={'100%'} justifyContent={'space-between'}>
      <Stack gap={2} alignItems={'center'} textAlign={'center'} width={'100%'}>
        <Typography variant="h1">{t('thank_you_page_title')}</Typography>
        <Typography variant="body1">{t('thank_you_page_subtitle')}</Typography>
      </Stack>
      <Button onClick={handleClose}>{t('done')}</Button>
    </Stack>
  )
}

export default ThankYou
