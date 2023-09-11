import MapFilters from '@/components/map/MapFilters'
import MapLocationDialog from '@/components/map/MapLocationDialog'
import MapPin from '@/components/map/MapPin'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { calculateDistance } from '@/util/mapFunctions'
import { Box, Button, Typography } from '@mui/material'
import { GoogleMap, MarkerF } from '@react-google-maps/api'
import type { Location } from 'LocationTypes'
import mixpanel from 'mixpanel-browser'
import { useCallback, useEffect, useRef, useState } from 'react'
import LoaderOverlay from '../elements/LoaderOverlay'
import LocationPreviewItem from '../elements/LocationPreviewItem'
import PlacesAutocomplete from './PlacesAutocomplete'

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
  handleNavigation: (l: Location) => void
  loadingLocations: boolean
  filter?: string | string[]
  hasLotsOfMedicine?: boolean
  handleCantGo: () => void
}

const MainMap = ({ locations, openDialog, filter, loadingLocations, closeDialog, handleCantGo, hasLotsOfMedicine, handleNavigation }: Props) => {
  const { t } = useStaticTranslation()
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
    .slice(0, 12)

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
  }, [locations])

  const handleLocationApproved = (position: GeolocationPosition) => {
    mixpanel.track('location_approved')
    const { latitude: lat, longitude: lng } = position.coords
    mapRef.current?.setCenter({ lat, lng })
    mapRef.current?.setZoom(14)
    setUserPosition({ lat, lng })
    closeDialog()
  }

  const focusMap = useCallback(
    (location: google.maps.LatLngLiteral) => {
      mapRef.current?.setCenter(location)
      mapRef.current?.setZoom(15)
    },
    [mapRef.current],
  )

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
          <PlacesAutocomplete onSelect={place => focusMap(place)} />
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
              return <MapPin key={index} location={l} />
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
          {filteredLocations.map((l, index) => (
            <LocationPreviewItem key={index} onClick={handleNavigation} location={l} focusMap={focusMap} />
          ))}
          {!loadingLocations && filteredLocations.length < 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '100%' }}>
              <Typography variant="body1">{t('no_locations_found')}</Typography>
            </Box>
          )}
        </Box>
        {hasLotsOfMedicine && (
          <Box sx={{ width: '100%', pt: 1, display: 'flex', justifyContent: 'center' }}>
            <Button variant="text" color="info" fullWidth={false} onClick={handleCantGo}>
              {t('cant_go_to_location')}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default MainMap
