import useFormWizard from '@/hooks/useFormWizard'
import { Box, Button, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Autocomplete from '../elements/Autocomplete'
import MedicinePreviewItem from '../elements/MedicinePreviewItem'

const Names = () => {
  const [searchValue, setSearchValue] = useState('')
  const { stepTo, formData } = useFormWizard()
  const { medicineQuantity } = formData

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  const handleSkip = () => {
    if (medicineQuantity && medicineQuantity !== '1-10') {
      stepTo('map')
    } else {
      stepTo('cold-storage')
    }
  }

  const hideText = searchValue.trim().length > 0

  return (
    <Stack gap={2} pb={2} alignItems={'center'} width={'100%'} position={'relative'} justifyContent={'space-between'}>
      <Stack
        gap={2}
        mb={4}
        alignItems={'center'}
        sx={{
          transition: 'display opacity 2.5s ease-in-out',
          opacity: hideText ? 0 : 1,
          display: hideText ? 'none' : 'flex',
        }}
      >
        <Typography variant="h1">אילו תרופות היית רוצה לתרום?</Typography>
        <Typography variant="body1" textAlign={'center'}>
          כדי שנוכל להיערך לקליטת התרופות, נצטרך לדעת איזה תרופות יש לך
        </Typography>
      </Stack>
      <Box
        sx={{
          width: '100%',
          flex: 1,
        }}
        component={motion.div}
        layout
        transition={{ ease: 'easeInOut', type: 'spring', duration: 0.5 }}
      >
        <Autocomplete value={searchValue} onValueChange={handleSearch} placeholder="שם התרופה בעברית או באנגלית" />
        <Box pt={2}>
          {hideText && [1, 2, 3, 4, 5].map(m => <MedicinePreviewItem key={m} medicine={{ id: 1, name: 'מירו 30', englishName: 'Miro' }} />)}
        </Box>
      </Box>
      <Button variant="text" sx={{ display: hideText ? 'none' : 'block' }} onClick={handleSkip}>
        לא הפעם
      </Button>
    </Stack>
  )
}

export default Names
