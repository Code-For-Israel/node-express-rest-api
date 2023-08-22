import MainMap from '@/components/map/MainMap'
import { Container } from '@mui/material'
import { useJsApiLoader } from '@react-google-maps/api'
import { useQuery } from '@tanstack/react-query'
import type { Location } from 'LocationTypes'
import axios from 'axios'
import mixpanel from 'mixpanel-browser'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

const fetchLocations = (filter?: string | string[]) => async () => {
  const query = filter ? `?filter=${filter}` : ''
  const res = await axios.get(`https://kh152rtckc.execute-api.us-east-1.amazonaws.com/items${query}`)
  if (res.data) {
    res.data.forEach((l: any) => {
      l.Coordinates_c = {
        lat: Number(l.Coordinates_lat_c),
        lng: Number(l.Coordinates_lng_c),
      }
    })
    return res.data
  }
  return []
}

const MapPage = () => {
  const router = useRouter()
  const {
    query: { filter },
  } = router

  const locationData = useQuery<Location[]>(['locations'], fetchLocations(), { placeholderData: [] })
  const [openDialog, setOpenDialog] = useState(true)

  const closeDialog = () => {
    setOpenDialog(false)
  }

  const { isLoaded: isMapLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  })

  const openNavigation = (location: Location) => {
    mixpanel.track('navigation_clicked', { locationId: location._id })
    const address = encodeURIComponent(location.FormattedAddress)
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
        {isMapLoaded && !locationData.isError && !locationData.isLoading && (
          <MainMap
            closeDialog={closeDialog}
            openDialog={openDialog}
            filter={filter}
            locations={locationData.data}
            loadingLocations={locationData.isFetching}
            handleNavigation={openNavigation}
          />
        )}
      </Container>
    </>
  )
}

export default MapPage
