import useFormWizard from '@/hooks/useFormWizard'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Box, Button, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

const ColdManyItems = () => {
  const { t } = useStaticTranslation()
  const { stepTo, updateFormData, submitData } = useFormWizard()
  const [data, setData] = useState({
    hasCold: false,
    hasExpensive: false,
    noExpensiveOrCold: false,
  })
  const router = useRouter()

  const { hasCold, hasExpensive, noExpensiveOrCold: noBoth } = data

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    if (name === 'noExpensiveOrCold' && checked) {
      setData({
        hasCold: false,
        hasExpensive: false,
        noExpensiveOrCold: true,
      })
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.checked,
      })
    }
  }

  const onSubmit = () => {
    updateFormData(data)
    if (!!noBoth) {
      submitData('map')
      router.push({ pathname: '/map' })
    } else {
      stepTo('names')
    }
  }

  return (
    <Stack gap={2} pb={2} alignItems={'center'} width={'100%'} justifyContent={'space-between'}>
      <Box width={'100%'} textAlign={'center'}>
        <Typography variant="h1">{t('cold_page_title_many')}</Typography>
      </Box>
      <Stack mt={6} flex={1} gap={1.5} width={'100%'}>
        <FormControlLabel
          control={<Checkbox onChange={handleChange} checked={hasCold} name="hasCold" />}
          label={t('i_have_cold_medicine')}
          disabled={!!noBoth}
        />
        <FormControlLabel
          control={<Checkbox onChange={handleChange} checked={hasExpensive} name="hasExpensive" />}
          label={t('i_have_expensive_medicine')}
          disabled={!!noBoth}
        />
        <FormControlLabel control={<Checkbox onChange={handleChange} checked={noBoth} name="noExpensiveOrCold" />} label={t('dont_have')} />
      </Stack>
      <Stack gap={2} width={'100%'}>
        <Button variant="contained" disabled={!hasCold && !hasExpensive && !noBoth} onClick={onSubmit}>
          {t('continue')}
        </Button>
      </Stack>
    </Stack>
  )
}

export default ColdManyItems
