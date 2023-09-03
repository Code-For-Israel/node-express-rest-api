import Autocomplete from '@/components/elements/Autocomplete'
import MedicinePreviewItem from '@/components/elements/MedicinePreviewItem'
import AddMedicine from '@/components/modules/AddMedicine'
import useDebounce from '@/hooks/useDebounce'
import useFormWizard from '@/hooks/useFormWizard'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { secondaryColor } from '@/styles/theme'
import { Box, Button, Stack, SwipeableDrawer, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { MedicineItemType } from 'MedicineTypes'
import axios from 'axios'
import { easeInOut, motion } from 'framer-motion'
import mixpanel from 'mixpanel-browser'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { DotLoader } from 'react-spinners'

const searchMedicines = (query: string) => async () => {
  const res = await axios.post('https://israeldrugs.health.gov.il/GovServiceList/IDRServer/SearchByName', {
    val: query,
    prescription: false,
    healthServices: false,
    pageIndex: 1,
    orderBy: 0,
  })
  if (res) {
    mixpanel.track('search_medicine', { query })
    const data = res.data.results.map((d: any) => ({
      _id: `${d.dragEnName}-${d.dragRegNum}`,
      Name: d.dragHebName,
      englishName: d.dragEnName,
      ...d,
    }))
    const deDuppedNames = data.filter((m: any, index: number, self: any) => self.findIndex((t: any) => t.englishName === m.englishName) === index)
    return deDuppedNames
  }
  return []
}

const Names = () => {
  const [searchValue, setSearchValue] = useState('')
  const [animate, setAnimate] = useState<string | null>(null)

  const debouncedQuery = useDebounce(searchValue, 600)
  const { stepTo, formData, updateFormData, submitData } = useFormWizard()
  const { medicineQuantity, hasExpensive, hasCold } = formData
  const isManyMedicines = medicineQuantity && medicineQuantity !== '1-10'

  const { t } = useStaticTranslation()
  const router = useRouter()

  const [selectedMedicine, setSelectedMedicine] = useState<MedicineItemType | null>(null)
  const [savedMedicines, setSavedMedicines] = useState<MedicineItemType[]>(formData?.medicines || [])

  const {
    data: medicineData,
    isFetching,
    isFetched,
  } = useQuery(['medicines', debouncedQuery], searchMedicines(debouncedQuery), {
    enabled: debouncedQuery.trim().length > 2,
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
    setAnimate(medicine._id)
  }

  const handleSave = (medicine: MedicineItemType, state: string) => {
    const medWithState = { ...medicine, state }
    setSavedMedicines([...savedMedicines, medWithState])
    updateFormData({ medicines: [...savedMedicines, medWithState] })
    setSelectedMedicine(null)
    mixpanel.track('add_medicine', { medicine: medicine.englishName, state })
  }

  const handleRemove = (medicine: MedicineItemType) => {
    const newMedicines = savedMedicines.filter((m: MedicineItemType) => m._id !== medicine._id)
    setSavedMedicines(newMedicines)
    updateFormData({ ...formData, medicines: newMedicines })
    mixpanel.track('remove_medicine', { medicine: medicine.englishName })
  }

  const handleDone = () => {
    stepTo('names-summary')
  }

  const handleSkip = () => {
    mixpanel.track('skip_names')
    if (isManyMedicines) {
      if (hasExpensive) {
        stepTo('details')
      } else {
        submitData('map')
        router.push({ pathname: '/map', query: hasCold ? { filter: 'store_cold' } : undefined })
      }
    } else {
      stepTo('cold-storage')
    }
  }

  const isMedicineAdded = useCallback(
    (id: string) => {
      return savedMedicines.some((m: MedicineItemType) => m._id === id)
    },
    [savedMedicines],
  )

  const hideText = searchValue.trim().length > 2

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
        <Typography variant="h1">{isManyMedicines ? t('names_page_many_title') : t('names_page_title')}</Typography>
        <Typography variant="body1" textAlign={'center'}>
          {isManyMedicines ? t('names_page_many_subtitle') : t('names_page_subtitle')}
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
        <Box pt={2} position={'relative'} sx={{ width: '100%', height: '100%', maxHeight: 'calc(90svh - 250px)', overflowY: 'auto' }}>
          {isFetching && (
            <Box
              sx={{
                position: 'absolute',
                background: 'rgba(255, 255, 255, 0.8)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                right: 0,
                top: 50,
                zIndex: 1000,
              }}
            >
              <DotLoader color={secondaryColor} loading={isFetching} size={30} speedMultiplier={2} />
            </Box>
          )}
          {hideText &&
            medicineData.length > 0 &&
            medicineData.map((m: MedicineItemType, i: number) => (
              <MedicinePreviewItem
                onClick={handleSelect}
                key={m._id}
                selected={isMedicineAdded(m._id)}
                index={i}
                animate={animate}
                medicine={m}
                onRemove={handleRemove}
              />
            ))}
          {isFetched && hideText && medicineData.length < 1 && (
            <Typography variant="body1" textAlign={'center'}>
              {t('no_medicines_found')}
            </Typography>
          )}
          <Button variant="text" sx={{ mt: '25px', display: medicineData.length > 0 ? 'none' : 'block' }} onClick={handleSkip}>
            {t('want_to_skip')}
          </Button>
        </Box>
      </motion.div>
      <SwipeableDrawer
        anchor="bottom"
        open={!!selectedMedicine}
        onOpen={() => false}
        onClose={handleClose}
        sx={{ '& .MuiPaper-root': { borderTopLeftRadius: 36, borderTopRightRadius: 36, height: '45%' } }}
      >
        <Box
          sx={{
            width: 40,
            height: 4,
            backgroundColor: '#696966',
            borderRadius: 3,
            position: 'absolute',
            top: 12,
            left: 'calc(50% - 20px)',
          }}
        />
        {selectedMedicine && <AddMedicine onSave={handleSave} medicine={selectedMedicine} />}
      </SwipeableDrawer>
      <Button
        variant="contained"
        disabled={savedMedicines.length < 1}
        sx={{ opacity: savedMedicines.length > 0 || (savedMedicines.length < 1 && hideText) ? 1 : 0 }}
        onClick={handleDone}
      >
        {t('im_done')} ({savedMedicines.length})
      </Button>
    </Stack>
  )
}

export default Names
