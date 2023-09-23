import LoaderOverlay from '@/components/elements/LoaderOverlay'
import MainMap from '@/components/map/MainMap'
import { Container } from '@mui/material'
import { useJsApiLoader } from '@react-google-maps/api'
import { useQuery } from '@tanstack/react-query'
import type { Location } from 'LocationTypes'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

const LIBRARIES = ['places'] as any

const fetchLocations = (filter?: string | string[]) => async () => {
  const query = filter ? `?filter=${filter}` : ''
  const res = await axios.get(`https://92e9pbwbok.execute-api.il-central-1.amazonaws.com/default/items${query}`)

  if (res.data) {
    const locs: Location[] = await JSON.parse(res.data.body)
    locs.forEach((l: any) => {
      l.Coordinates_c = {
        lat: Number(l.CoordinateLat_c),
        lng: Number(l.CoordinateLng_c),
      }
      if (!l.FormattedAddress) {
        l.FormattedAddress = `${l.Address_c}, ${l.Settelment_c}`
      }
    })
    return locs
  }
  return []
}

const MapPage = () => {
  const router = useRouter()
  const {
    query: { filter },
  } = router

  const locationRquest = useQuery<Location[]>(['locations'], fetchLocations(), { refetchOnWindowFocus: false })
  const [openDialog, setOpenDialog] = useState(true)

  const closeDialog = () => {
    setOpenDialog(false)
  }

  const { isLoaded: isMapLoaded } = useJsApiLoader({
    id: 'google-map-script',
    libraries: LIBRARIES,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  })

  return (
    <>
      <Head>
        <title>חברים לרפואה - מפת מוקדים</title>
        <meta name="description" content="חברים לרפואה - מפת מוקדים" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth={'md'} sx={{ boxShadow: 2, p: 0, position: 'relative', height: '100svh' }}>
        <LoaderOverlay loading={locationRquest.isFetching || locationRquest.isLoading} />
        {isMapLoaded && locationRquest.data && (
          <MainMap
            closeDialog={closeDialog}
            openDialog={openDialog}
            filter={filter}
            locations={locationRquest.data}
            loadingLocations={locationRquest.isFetching || locationRquest.isLoading}
          />
        )}
      </Container>
    </>
  )
}

export default MapPage
