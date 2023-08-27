import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Button, Dialog, DialogTitle, IconButton, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import CloseIcon from 'public/icons/close.svg'
import { useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  onLocationApproved: (position: GeolocationPosition) => void
}

const MapLocationDialog = ({ open: openDialog, onClose, onLocationApproved }: Props) => {
  const [error, setError] = useState<string | null>(null)
  const { t } = useStaticTranslation()

  const handleLocationSelected = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onLocationApproved, error => {
        if (error.code == error.PERMISSION_DENIED) {
          console.log('User denied the request for Geolocation.')
          setError(t('location_declined'))
        } else {
          onClose()
        }
      })
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
          whiteSpace: 'pre-line',
        }}
      >
        <Typography variant="h1">{t('map_dialog_title')}</Typography>
        <Typography fontSize={17} variant="body1">
          {t('map_dialog_text')}
        </Typography>
        <Button variant="contained" sx={{ mt: 4 }} onClick={handleLocationSelected}>
          {t('allow_location')}
        </Button>
        {!!error && (
          <Typography fontSize={15} variant="body1" color={'error.main'}>
            {error}
          </Typography>
        )}
        <Button variant="text" onClick={onClose}>
          {t('not_this_time')}
        </Button>
      </Stack>
    </Dialog>
  )
}

export default MapLocationDialog
