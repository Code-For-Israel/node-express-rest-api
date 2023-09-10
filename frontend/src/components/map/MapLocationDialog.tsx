import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import BaseDialog from '../elements/BaseDialog'

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
    <BaseDialog open={openDialog} onClose={onClose}>
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
        <Button variant="text" color="info" onClick={onClose}>
          {t('not_this_time')}
        </Button>
      </Stack>
    </BaseDialog>
  )
}

export default MapLocationDialog
