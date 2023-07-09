import Autocomplete from '@/components/elements/Autocomplete'
import MedicinePreviewItem from '@/components/elements/MedicinePreviewItem'
import AddMedicine from '@/components/modules/AddMedicine'
import useDebounce from '@/hooks/useDebounce'
import useFormWizard from '@/hooks/useFormWizard'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { secondaryColor } from '@/styles/theme'
import { Box, Button, Drawer, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { MedicineItemType } from 'MedicineTypes'
import axios from 'axios'
import { easeInOut, motion } from 'framer-motion'
import { useState } from 'react'
import { ClipLoader } from 'react-spinners'

const searchMedicines = (query: string) => async () => {
  const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`).catch(e => {
    console.log(e)
  })
  if (response) {
    console.log(response.data)
    return response.data.products
  }
  return []
}

const Names = () => {
  const [searchValue, setSearchValue] = useState('')
  const debouncedQuery = useDebounce(searchValue, 600)
  const { stepTo, formData, updateFormData, submitData } = useFormWizard()
  const { medicineQuantity } = formData
  const { t } = useStaticTranslation()

  const [selectedMedicine, setSelectedMedicine] = useState<MedicineItemType | null>(null)
  const [allMedicines, setAllMedicines] = useState<MedicineItemType[]>(formData?.medicines || [])

  const {
    data: medicineData,
    isFetching,
    isFetched,
  } = useQuery(['medicines', debouncedQuery], searchMedicines(debouncedQuery), {
    enabled: debouncedQuery.trim().length > 0,
    refetchOnWindowFocus: false,
    retry: false,
    initialData: [],
  })

  const handleClose = () => {
    setSelectedMedicine(null)
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  const handleSelect = (medicine: MedicineItemType) => {
    setSelectedMedicine(medicine)
  }

  const handleSave = (medicine: MedicineItemType, state: string) => {
    const medWithState = { ...medicine, state }
    setAllMedicines([...allMedicines, medWithState])
    updateFormData({ medicines: [...allMedicines, medWithState] })
    setSelectedMedicine(null)
  }

  const handleRemove = (medicine: MedicineItemType) => {
    const newMedicines = allMedicines.filter((m: MedicineItemType) => m.id !== medicine.id)
    setAllMedicines(newMedicines)
    updateFormData({ ...formData, medicines: newMedicines })
  }

  const handleDone = () => {
    stepTo('names-summary')
  }

  const handleSkip = () => {
    if (medicineQuantity && medicineQuantity !== '1-10') {
      submitData('map')
      stepTo('map')
    } else {
      stepTo('cold-storage')
    }
  }

  const isMedicineAdded = (id: number) => {
    return allMedicines.some((m: MedicineItemType) => m.id === id)
  }

  const hideText = searchValue.trim().length > 0

  return (
    <Stack gap={2} pb={3} alignItems={'center'} width={'100%'} position={'relative'} justifyContent={'space-between'}>
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
        <Typography variant="h1">{t('names_page_title')}</Typography>
        <Typography variant="body1" textAlign={'center'}>
          {t('names_page_subtitle')}
        </Typography>
      </Stack>
      <motion.div
        style={{
          width: '100%',
          flex: 1,
        }}
        layout
        transition={{ ease: easeInOut, type: 'spring', duration: 0.35 }}
      >
        <Autocomplete value={searchValue} onValueChange={handleSearch} placeholder={t('names_search_placeholder')} />
        <Box pt={2} position={'relative'} sx={{ width: '100%', height: '100%', maxHeight: 'calc(90svh - 150px)', overflowY: 'auto' }}>
          {isFetching && (
            <Box sx={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', right: 0, top: 40 }}>
              <ClipLoader color={secondaryColor} loading={isFetching} size={50} />
            </Box>
          )}
          {hideText &&
            medicineData.length > 0 &&
            medicineData.map((m: any, i: number) => (
              <MedicinePreviewItem
                onClick={handleSelect}
                disabled={isMedicineAdded(i)}
                key={i}
                medicine={{ id: m.id, name: m.title, englishName: m.brand }}
                onRemove={isMedicineAdded(i) ? handleRemove : undefined}
              />
            ))}
          {isFetched && hideText && medicineData.length < 1 && (
            <Typography variant="body1" textAlign={'center'}>
              {t('no_medicines_found')}
            </Typography>
          )}
        </Box>
      </motion.div>
      <Drawer
        anchor="bottom"
        open={!!selectedMedicine}
        onClose={handleClose}
        sx={{ '& .MuiPaper-root': { borderTopLeftRadius: 36, borderTopRightRadius: 36, height: '60%' } }}
      >
        {selectedMedicine && <AddMedicine onSave={handleSave} medicine={selectedMedicine} />}
      </Drawer>
      <Button variant="contained" disabled={allMedicines.length < 1} sx={{ opacity: allMedicines.length > 0 ? 1 : 0 }} onClick={handleDone}>
        {t('im_done')} ({allMedicines.length})
      </Button>
      <Button variant="text" sx={{ display: hideText || allMedicines.length > 0 ? 'none' : 'block' }} onClick={handleSkip}>
        {t('want_to_skip')}
      </Button>
    </Stack>
  )
}

export default Names
