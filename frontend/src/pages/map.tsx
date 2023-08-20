import Autocomplete from '@/components/elements/Autocomplete'
import LocationPreviewItem from '@/components/elements/LocationPreviewItem'
import MapFilters from '@/components/map/MapFilters'
import MapLocationDialog from '@/components/map/MapLocationDialog'
import MapPin from '@/components/map/MapPin'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import locations from '@/util/dummy-locations.json'
import { Box, Container } from '@mui/material'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useQuery } from '@tanstack/react-query'
import type { Location } from 'LocationTypes'
import axios from 'axios'
import mixpanel from 'mixpanel-browser'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'

const mapContainerStyle = {
  width: '100%',
  height: '60svh',
}

const mapCenter = {
  lat: 32.0901294,
  lng: 34.8253887,
}

const initialZoom = 15

const getPlaces = (filter?: string | string[]) => async () => {
  const query = filter ? `?filter=${filter}` : ''
  const res = await axios.get(`/places${query}`)
  if (res.data) {
    return res.data
  }
  return []
}

const MapPage = () => {
  const router = useRouter()
  const {
    query: { filter },
  } = router
  const { t } = useStaticTranslation()
  const [openDialog, setOpenDialog] = useState(true)
  const { data: places } = useQuery(['places'], getPlaces(filter), { enabled: false })
  const mapRef = useRef<google.maps.Map>()

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
    map.setOptions({
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
      clickableIcons: false,
      gestureHandling: 'greedy',
      styles: [
        {
          featureType: 'poi',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
      ],
    })
  }, [])

  const closeDialog = () => {
    setOpenDialog(false)
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  })

  const handleLocationApproved = (position: GeolocationPosition) => {
    mixpanel.track('location_approved')
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    mapRef.current?.setCenter({ lat: latitude, lng: longitude })
    mapRef.current?.setZoom(17)
    closeDialog()
  }

  const openNavigation = (location: Location) => {
    mixpanel.track('navigation_clicked', { locationId: location._id })
    const address = encodeURIComponent(location.address)
    const url = `https://www.google.com/maps/dir/?api=1&destination=${address}`
    window.open(url, '_blank')
  }

  const filteredLocations = (locations as Location[]).filter((l: Location) => (filter === 'store_cold' ? l.hasCold : true))

  return (
    <>
      <Head>
        <title>חברים לרפואה - מפת מוקדים</title>
        <meta name="description" content="חברים לרפואה - מפת מוקדים" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth={'md'} sx={{ boxShadow: 2, p: 0, position: 'relative' }}>
        <Box
          component={'main'}
          sx={{
            height: '100svh',
            width: '100%',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: '100%',
              height: 'calc(100% - 40px)',
              bgcolor: 'lightgray',
            }}
          >
            <Box sx={{ position: 'absolute', top: 20, right: 0, width: '100%', px: '35px', zIndex: 1000 }}>
              <Autocomplete
                onValueChange={value => {
                  console.log(value)
                }}
                placeholder={t('map_search_placeholder')}
              />
            </Box>
            <MapFilters />
            {isLoaded && (
              <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={initialZoom} onLoad={onLoad}>
                {(filteredLocations as Location[]).map((l, index) => (
                  <MapPin key={index} location={l} />
                ))}
              </GoogleMap>
            )}
          </Box>
          <MapLocationDialog open={openDialog} onClose={closeDialog} onLocationApproved={handleLocationApproved} />
          <Box
            sx={{
              borderRadius: '30px 30px 0 0',
              py: 2,
              width: '100%',
              background: 'white',
              height: '45svh',
              position: 'absolute',
              bottom: 0,
              boxShadow: '0px -3px 6px 0px rgba(0, 0, 0, 0.08)',
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
              {(filteredLocations as Location[]).map((l, index) => (
                <LocationPreviewItem key={index} onClick={openNavigation} location={l} />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default MapPage
