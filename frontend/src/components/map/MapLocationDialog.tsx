import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Button, Dialog, DialogTitle, IconButton, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import CloseIcon from 'public/icons/close.svg'

type Props = {
  open: boolean
  onClose: () => void
  onLocationApproved: (position: GeolocationPosition) => void
}

const MapLocationDialog = ({ open: openDialog, onClose, onLocationApproved }: Props) => {
  const { t } = useStaticTranslation()

  const handleLocationSelected = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onLocationApproved, onClose)
    } else {
      console.log('Geolocation not supported')
    }
  }

  return (
    <Dialog open={openDialog} onClose={onClose} sx={{ '& .MuiPaper-root': { width: '100%', borderRadius: '24px' } }}>
      <DialogTitle sx={{ m: 0, py: 2.5 }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 18,
            top: 18,
          }}
        >
          <Image src={CloseIcon} alt="close" />
        </IconButton>
      </DialogTitle>
      <Stack
        gap={2}
        sx={{
          p: 3,
          width: '100%',
          height: '100%',
          overflow: 'auto',
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h1">{t('map_dialog_title')}</Typography>
        <Typography fontSize={17} variant="body1">
          {t('map_dialog_text')}
        </Typography>
        <Button variant="contained" sx={{ mt: 4 }} onClick={handleLocationSelected}>
          {t('allow_location')}
        </Button>
        <Button variant="text" onClick={onClose}>
          {t('not_this_time')}
        </Button>
      </Stack>
    </Dialog>
  )
}

export default MapLocationDialog
