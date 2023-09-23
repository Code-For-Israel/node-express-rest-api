import MedicinePreviewItem from '@/components/elements/MedicinePreviewItem'
import useFormWizard from '@/hooks/useFormWizard'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Box, Button, Stack, Typography } from '@mui/material'
import { MedicineItemType } from 'MedicineTypes'
import { useRouter } from 'next/router'

const NamesSummary = () => {
  const { stepTo, stepBack, formData, updateFormData, submitData } = useFormWizard()
  const { t } = useStaticTranslation()
  const router = useRouter()
  const { hasMoreProducts, hasCold, hasExpensive, expensiveDetected, expiringDetected } = formData
  const selectedMedicines = formData?.medicines

  const handleFinish = () => {
    if (hasExpensive || expensiveDetected || hasMoreProducts || expiringDetected) {
      stepTo('details')
    } else {
      submitData('map')
      router.push({ pathname: '/map', query: hasCold ? { filter: 'store_cold' } : undefined })
    }
  }

  const handleBack = () => {
    stepBack()
  }

  const handleRemove = (medicine: MedicineItemType) => {
    const newMedicines = selectedMedicines?.filter((m: MedicineItemType) => m._id !== medicine._id)
    updateFormData({ ...formData, medicines: newMedicines })
  }

  return (
    <Stack gap={2} pb={2} alignItems={'center'} width={'100%'} position={'relative'} justifyContent={'space-between'}>
      <Typography variant="h1">{t('names_summary_page_title')}</Typography>
      <Box sx={{ display: 'flex', flex: 1, width: '100%', height: '100%', mt: 3 }}>
        {selectedMedicines?.length === 0 && (
          <Stack
            sx={{
              width: '100%',
              borderRadius: '12px',
              height: 'fit-content',
              maxHeight: '40svh',
              overflowY: 'auto',
              px: 3,
              py: 1,
              boxShadow: '0.5px 1px 4px 2px rgba(0, 0, 0, 0.08)',
            }}
          >
            {selectedMedicines.map((m: MedicineItemType, i: number) => (
              <MedicinePreviewItem medicine={m} key={i} onRemove={handleRemove} selected hideLastBorder />
            ))}
          </Stack>
        )}
      </Box>
      <Button variant="contained" sx={{ mt: 4 }} onClick={handleFinish}>
        {t('continue')}
      </Button>
      <Button variant="text" color="info" onClick={handleBack}>
        {t('back_to_medicine_search')}
      </Button>
    </Stack>
  )
}

export default NamesSummary
