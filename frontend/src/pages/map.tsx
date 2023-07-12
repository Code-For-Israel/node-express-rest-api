import AppDrawer from '@/components/elements/AppDrawer'
import PlacePreviewItem from '@/components/elements/PlacePreviewItem'
import MapLocationDialog from '@/components/modules/MapLocationDialog'
import { Box, ClickAwayListener, Container } from '@mui/material'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useQuery } from '@tanstack/react-query'
import { PlaceType } from 'PlaceTypes'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const center = {
  lat: 32.0901294,
  lng: 34.8253887,
}

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
    const bounds = new window.google.maps.LatLngBounds()
    mapRef.current = map
    map.fitBounds(bounds)
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
        <title>חברים לרפואה</title>
        <meta name="description" content="חברים לרפואה- תרומת תרופות" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="sm" sx={{ boxShadow: 2, position: 'relative' }}>
        <Box
          component={'main'}
          sx={{
            height: '100svh',
            width: '100%',
            position: 'relative',
          }}
        >
          {isLoaded && (
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onLoad}>
              <Marker position={center} />
            </GoogleMap>
          )}
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'lightgray',
            }}
          ></Box>
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
