import useFormWizard from '@/hooks/useFormWizard'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import ColdManyItems from './ColdManyItems'

const Cold = () => {
  const { updateFormData, formData, submitData } = useFormWizard()
  const { medicineQuantity } = formData
  const { t } = useStaticTranslation()
  const router = useRouter()

  const handleNext = (hasCold: boolean) => () => {
    updateFormData({ hasCold: hasCold })
    submitData('map')
    router.push({ pathname: '/map', query: hasCold ? { filter: 'store_cold' } : undefined })
  }

  if (medicineQuantity && medicineQuantity === '1-10')
    return (
      <Stack gap={2} pb={2} alignItems={'center'} width={'100%'} justifyContent={'space-between'}>
        <Stack gap={2} textAlign={'center'}>
          <Typography variant="h1">{t('cold_page_title_few')}</Typography>
          <Typography variant="body2">{t('cold_page_subtitle_few')}</Typography>
        </Stack>
        <Stack direction={'row'} gap={2} width={'100%'}>
          <Button variant="outlined" onClick={handleNext(true)}>
            {t('yes')}
          </Button>
          <Button onClick={handleNext(false)}>{t('no')}</Button>
        </Stack>
      </Stack>
    )
  return <ColdManyItems />
}

export default Cold
