import MainMap from '@/components/map/MainMap'
import useFormWizard from '@/hooks/useFormWizard'
import { Container } from '@mui/material'
import { useJsApiLoader } from '@react-google-maps/api'
import { useQuery } from '@tanstack/react-query'
import type { Location } from 'LocationTypes'
import axios from 'axios'
import mixpanel from 'mixpanel-browser'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

const LIBRARIES = ['places'] as any

const fetchLocations = (filter?: string | string[]) => async () => {
  const query = filter ? `?filter=${filter}` : ''
  const res = await axios.get(`https://92e9pbwbok.execute-api.il-central-1.amazonaws.com/default/items${query}`)

  if (res.data) {
    const locs = await JSON.parse(res.data.body)
    locs.forEach((l: any) => {
      l.Coordinates_c = {
        lat: Number(l.CoordinateLat_c),
        lng: Number(l.CoordinateLng_c),
      }
      if (!l.FormattedAddress) {
        l.FormattedAddress = `${l.Address_c}, ${l.Settelment_c}`
      }
    })
    console.log(locs)

    return locs
  }
  return []
}

const MapPage = () => {
  const router = useRouter()
  const {
    query: { filter },
  } = router
  const {
    formData: { medicineQuantity },
    stepTo,
  } = useFormWizard()

  const locationData = useQuery<Location[]>(['locations'], fetchLocations())
  const [openDialog, setOpenDialog] = useState(true)

  const closeDialog = () => {
    setOpenDialog(false)
  }

  const { isLoaded: isMapLoaded } = useJsApiLoader({
    id: 'google-map-script',
    libraries: LIBRARIES,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  })

  const openNavigation = (location: Location) => {
    mixpanel.track('navigation_clicked', { locationId: location._id })
    const address = encodeURIComponent(location.FormattedAddress)
    const url = `https://www.google.com/maps/dir/?api=1&destination=${address}`
    window.open(url, '_blank')
  }

  const goToDetails = () => {
    mixpanel.track('cant_go_clicked')
    router.push('/', undefined, { shallow: true })
    stepTo('details')
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
            handleCantGo={goToDetails}
            hasLotsOfMedicine={medicineQuantity && medicineQuantity !== '1-10'}
          />
        )}
      </Container>
    </>
  )
}

export default MapPage
