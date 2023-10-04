import LoaderOverlay from '@/components/elements/LoaderOverlay'
import MainMap from '@/components/map/MainMap'
import { calculateDistance } from '@/util/mapFunctions'
import { Container } from '@mui/material'
import { useJsApiLoader } from '@react-google-maps/api'
import type { Location } from 'LocationTypes'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const LIBRARIES = ['places'] as any

const MapPage = () => {
  const router = useRouter()
  const {
    query: { filter },
  } = router
  const [locations, setLocations] = useState<Location[] | null>(null)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(true)

  const closeDialog = () => {
    setOpenDialog(false)
  }

  const { isLoaded: isMapLoaded } = useJsApiLoader({
    id: 'google-map-script',
    libraries: LIBRARIES,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  })

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // const query = filter ? `?filter=${filter}` : ''
        const res = await axios.get(`https://92e9pbwbok.execute-api.il-central-1.amazonaws.com/default/items`)
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
          setLocations(locs)
        }
      } catch (e: any) {
        console.log(e.message)
        setError(e.message)
        setLocations([])
      } finally {
        setIsFetching(false)
      }
    }

    fetchLocations()
  }, [])

  const updateLocationsCoordinates = (position: google.maps.LatLngLiteral) => {
    if (!locations) return
    const locs = locations.reduce((acc: Location[], l: Location) => {
      if (l.Coordinates_c) {
        const distance = calculateDistance(position, l.Coordinates_c)
        return [...acc, { ...l, distance }]
      }
      return acc
    }, [])
    const sorted = locs.sort((a, b) => (a.distance as number) - (b.distance as number))
    setLocations(sorted)
  }

  const filteredLocations = locations?.filter((l: Location) =>
    filter === 'store_cold' ? `${l.RefrigeratedMedicines_c}`.toLowerCase() === 'true' : true,
  )

  return (
    <>
      <Head>
        <title>חברים לרפואה - מפת מוקדים</title>
        <meta name="description" content="חברים לרפואה - מפת מוקדים" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth={'md'} sx={{ boxShadow: 2, p: 0, height: '100svh' }}>
        <LoaderOverlay loading={isFetching} />
        {isMapLoaded && (
          <MainMap
            closeDialog={closeDialog}
            openDialog={openDialog}
            locations={filteredLocations}
            loadingLocations={isFetching}
            fetchError={error}
            updateLocationsCoordinates={updateLocationsCoordinates}
          />
        )}
      </Container>
    </>
  )
}

export default MapPage
