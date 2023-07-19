import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Box, Typography } from '@mui/material'

const LostPage = () => {
  const { t } = useStaticTranslation()
  return (
    <Box sx={{ height: '100svh', widht: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h1">{t('404_page_text')}</Typography>
    </Box>
  )
}

export default LostPage
