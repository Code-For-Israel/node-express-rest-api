import useFormWizard from '@/hooks/useFormWizard'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Button, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import DoneIcon from 'public/icons/done.svg'

const ThankYou = () => {
  const { stepTo, resetFormData } = useFormWizard()
  const { t } = useStaticTranslation()

  const handleClose = () => {
    resetFormData()
    stepTo('start')
  }

  return (
    <Stack gap={2} pt={2} pb={2} alignItems={'center'} width={'100%'} justifyContent={'space-between'}>
      <Stack gap={2} alignItems={'center'} textAlign={'center'} width={'100%'}>
        <Typography variant="h1">{t('thank_you_page_title')}</Typography>
        <Typography variant="body1" sx={{ mb: 5 }}>
          {t('thank_you_page_subtitle')}
        </Typography>
        <Image src={DoneIcon} alt="done" width={80} height={80} />
      </Stack>
      <Button onClick={handleClose}>{t('done')}</Button>
    </Stack>
  )
}

export default ThankYou
