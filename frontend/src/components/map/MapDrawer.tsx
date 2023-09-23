import LoaderOverlay from '@/components/elements/LoaderOverlay'
import LocationPreviewItem from '@/components/elements/LocationPreviewItem'
import useFormWizard from '@/hooks/useFormWizard'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Box, Button, Typography } from '@mui/material'
import type { Location } from 'LocationTypes'
import mixpanel from 'mixpanel-browser'
import { useRouter } from 'next/router'
import { memo } from 'react'

type Props = {
  locations: Location[]
  loadingLocations: boolean
  focusMap: (address: google.maps.LatLngLiteral | google.maps.LatLng, bounds?: google.maps.LatLngBounds) => void
}

const MapDrawer = ({ locations, loadingLocations, focusMap }: Props) => {
  const { t } = useStaticTranslation()
  const router = useRouter()
  const {
    stepTo,
    formData: { medicineQuantity },
  } = useFormWizard()

  const handleCantGo = () => {
    mixpanel.track('cant_go_clicked')
    router.push('/', undefined, { shallow: true })
    stepTo('details')
  }

  const handleNavigation = (location: Location) => {
    mixpanel.track('navigation_clicked', { locationId: location._id })
    const address = encodeURIComponent(location.FormattedAddress)
    const url = `https://www.google.com/maps/dir/?api=1&destination=${address}`
    window.open(url, '_blank')
  }

  return (
    <Box
      sx={{
        borderRadius: '30px 30px 0 0',
        py: 2,
        width: '100%',
        background: 'white',
        height: '40svh',
        position: 'absolute',
        bottom: 0,
        boxShadow: '0px -3px 6px 0px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          pb: 2,
          pl: 4,
          pr: 3,
          height: '100%',
          overflow: 'auto',
          width: '100%',
        }}
      >
        <LoaderOverlay loading={loadingLocations} />
        {locations.map((l, index) => (
          <LocationPreviewItem key={index} onClick={handleNavigation} location={l} focusMap={focusMap} />
        ))}
        {!loadingLocations && locations.length < 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '100%' }}>
            <Typography variant="body1">{t('no_locations_found')}</Typography>
          </Box>
        )}
      </Box>
      {medicineQuantity && medicineQuantity !== '1-10' && (
        <Box sx={{ width: '100%', pt: 1, display: 'flex', justifyContent: 'center' }}>
          <Button variant="text" color="info" fullWidth={false} onClick={handleCantGo}>
            {t('cant_go_to_location')}
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default memo(MapDrawer)
