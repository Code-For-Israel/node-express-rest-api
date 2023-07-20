import AppDrawer from '@/components/elements/AppDrawer'
import PlacePreviewItem from '@/components/elements/PlacePreviewItem'
import MapFilters from '@/components/map/MapFilters'
import MapLocationDialog from '@/components/map/MapLocationDialog'
import { Box, ClickAwayListener, Container, Typography } from '@mui/material'
import { GoogleMap, OverlayView, OverlayViewF, useJsApiLoader } from '@react-google-maps/api'
import { useQuery } from '@tanstack/react-query'
import { PlaceType } from 'PlaceTypes'
import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import LocationPinIcon from 'public/icons/location-pin.svg'
import { useCallback, useRef, useState } from 'react'

const mapContainerStyle = {
  width: '100%',
  height: '100%',
}

const mapCenter = {
  lat: 32.0901294,
  lng: 34.8253887,
}

const initialZoom = 16

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

  const [openDrawer, setOpenDrawer] = useState(false)
  const [openDialog, setOpenDialog] = useState(true)
  const { data: places, isLoading } = useQuery(['places'], getPlaces(filter), { enabled: false })
  const mapRef = useRef<google.maps.Map>()

  const onLoad = useCallback((map: google.maps.Map) => {
    map.setOptions({
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP,
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

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen)
  }

  const closeDialog = () => {
    setOpenDrawer(true)
    setOpenDialog(false)
  }

  const handleClickAway = () => {
    setOpenDrawer(false)
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  })

  const handleLocationApproved = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    mapRef.current?.setCenter({ lat: latitude, lng: longitude })
    mapRef.current?.setZoom(17)
    closeDialog()
  }

  const openNavigation = (place: PlaceType) => {
    const address = encodeURIComponent(place.address)
    const url = `https://www.google.com/maps/dir/?api=1&destination=${address}`
    window.open(url, '_blank')
  }

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
            <MapFilters />
            {isLoaded && (
              <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={initialZoom} onLoad={onLoad}>
                <OverlayViewF position={mapCenter} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                  <Box
                    sx={{
                      display: 'flex',
                      transform: 'translate(50%, -50%)',
                      flexDirection: 'column',
                      rowGap: 0.3,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image src={LocationPinIcon} alt="icon" width={38} height={38} />
                    <Box sx={{ bgcolor: 'white', borderRadius: 100, px: 1, boxShadow: 1 }}>
                      <Typography variant="caption" color="primary.main">
                        {'חברים לרפואה'}
                      </Typography>
                    </Box>
                  </Box>
                </OverlayViewF>
              </GoogleMap>
            )}
          </Box>
          <MapLocationDialog open={openDialog} onClose={closeDialog} onLocationApproved={handleLocationApproved} />
          <AppDrawer hideBackdrop open={openDrawer} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
            {!openDialog && (
              <ClickAwayListener onClickAway={handleClickAway}>
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
                  {[...Array(10)].map((_, index) => (
                    <PlacePreviewItem
                      key={index}
                      onClick={openNavigation}
                      place={{
                        name: 'סופר פארם',
                        id: 1,
                        address: 'מיכאל 12, רמת גן',
                        distance: 1.2,
                        type: 'pharmacy',
                        hasCold: true,
                      }}
                    />
                  ))}
                </Box>
              </ClickAwayListener>
            )}
          </AppDrawer>
        </Box>
      </Container>
    </>
  )
}

export default MapPage
