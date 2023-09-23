import MapDrawer from '@/components/map/MapDrawer'
import MapFilters from '@/components/map/MapFilters'
import MapLocationDialog from '@/components/map/MapLocationDialog'
import MapPin from '@/components/map/MapPin'
import PlacesAutocomplete from '@/components/map/PlacesAutocomplete'
import { calculateDistance } from '@/util/mapFunctions'
import { Box } from '@mui/material'
import { GoogleMap, MarkerF } from '@react-google-maps/api'
import type { Location } from 'LocationTypes'
import mixpanel from 'mixpanel-browser'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

const mapContainerStyle = {
  width: '100%',
  height: '65svh',
}

const mapCenter = {
  lat: 32.0901294,
  lng: 34.8253887,
}

const initialZoom = 14

type Props = {
  locations: Location[]
  openDialog: boolean
  closeDialog: () => void
  loadingLocations: boolean
  filter?: string | string[]
}

const MainMap = ({ locations, openDialog, filter, loadingLocations, closeDialog }: Props) => {
  const mapRef = useRef<google.maps.Map>()
  const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral | null>(null)
  const [mapLocations, setMapLocations] = useState<Location[]>(locations)
  const sortedCache = useRef<{ [key: string]: Location[] }>({})

  const updateLocationsCoordinates = (position: google.maps.LatLngLiteral) => {
    const cached = sortedCache.current[JSON.stringify(position)]
    if (cached) {
      return cached
    }
    const locs = locations.reduce((acc: Location[], l: Location) => {
      if (l.Coordinates_c) {
        const distance = calculateDistance(position, l.Coordinates_c)
        return [...acc, { ...l, distance }]
      }
      return acc
    }, [])
    const sorted = locs.sort((a, b) => (a.distance as number) - (b.distance as number))
    sortedCache.current = { [JSON.stringify(position)]: sorted }
    return sorted
  }

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
  }, [])

  const filteredLocations = mapLocations
    .filter((l: Location) => (filter === 'store_cold' ? `${l.RefrigeratedMedicines_c}`.toLowerCase() === 'true' : true))
    .slice(0, 20)

  const handleMapIdle = useCallback(() => {
    const bounds = mapRef.current?.getBounds()
    let locs = [...locations]
    if (userPosition) {
      locs = updateLocationsCoordinates(userPosition)
    }
    const filtered = locs.filter(l => !!l.Coordinates_c && bounds?.contains(l.Coordinates_c))
    setMapLocations(filtered)
  }, [userPosition, locations])

  useEffect(() => {
    setMapLocations(locations)
    handleMapIdle()
  }, [locations, loadingLocations])

  const handleLocationApproved = (position: GeolocationPosition) => {
    mixpanel.track('location_approved')
    const { latitude: lat, longitude: lng } = position.coords
    mapRef.current?.setZoom(14)
    mapRef.current?.panTo({ lat, lng })
    setUserPosition({ lat, lng })
    closeDialog()
  }

  const focusMap = (address: google.maps.LatLngLiteral | google.maps.LatLng, bounds?: google.maps.LatLngBounds) => {
    if (bounds) {
      mapRef.current?.fitBounds(bounds)
      mapRef.current?.setZoom(14)
    } else {
      mapRef.current?.setZoom(15)
      mapRef.current?.panTo(address)
    }
  }

  const handlePinClick = (location: Location) => {
    const listItem = document.getElementById(`listLocation-${location._id}`)
    listItem?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
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
          <PlacesAutocomplete onSelect={focusMap} />
        </Box>
        <MapFilters />
        <GoogleMap
          onIdle={handleMapIdle}
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={initialZoom}
          onLoad={onLoad}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            maxZoom: 16,
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
          }}
        >
          {filteredLocations.map((l, index) => {
            if (l.Coordinates_c) {
              return <MapPin key={index} location={l} onClick={handlePinClick} />
            }
          })}
          {userPosition && (
            <MarkerF
              position={userPosition}
              icon={{
                url: '/icons/position.svg',
              }}
              clickable={false}
            />
          )}
        </GoogleMap>
      </Box>
      <MapLocationDialog open={openDialog} onClose={closeDialog} onLocationApproved={handleLocationApproved} />
      <MapDrawer locations={filteredLocations} focusMap={focusMap} loadingLocations={loadingLocations} />
    </Box>
  )
}

export default memo(MainMap)
