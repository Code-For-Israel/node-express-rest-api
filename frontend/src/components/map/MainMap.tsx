import MapDrawer from '@/components/map/MapDrawer'
import MapFilters from '@/components/map/MapFilters'
import MapLocationDialog from '@/components/map/MapLocationDialog'
import MapPin from '@/components/map/MapPin'
import PlacesAutocomplete from '@/components/map/PlacesAutocomplete'
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
  locations?: Location[]
  openDialog: boolean
  closeDialog: () => void
  loadingLocations: boolean
  updateLocationsCoordinates: (position: google.maps.LatLngLiteral) => void
  fetchError: string | null
}

const MainMap = ({ locations, openDialog, loadingLocations, closeDialog, fetchError, updateLocationsCoordinates }: Props) => {
  const mapRef = useRef<google.maps.Map>()
  const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral | null>(null)
  const [mapLocations, setMapLocations] = useState<Location[] | undefined>(locations)

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
  }, [])

  const handleMapIdle = useCallback(() => {
    if (!mapRef.current || !locations) return
    const bounds = mapRef.current?.getBounds()
    const filtered = locations.filter(l => !!l.Coordinates_c && bounds?.contains(l.Coordinates_c))
    setMapLocations(filtered)
  }, [locations])

  const handleLocationApproved = (position: GeolocationPosition) => {
    mixpanel.track('location_approved')
    const userPosition = { lat: position.coords.latitude, lng: position.coords.longitude }
    mapRef.current?.setZoom(14)
    mapRef.current?.panTo(userPosition)
    setUserPosition(userPosition)
    updateLocationsCoordinates(userPosition)
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

  useEffect(() => {
    handleMapIdle()
  }, [locations])

  const handlePinClick = (location: Location) => {
    const listItem = document.getElementById(`listLocation-${location._id}`)
    listItem?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  const slicedLocations = mapLocations?.slice(0, 20)

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
          {slicedLocations &&
            slicedLocations.map((l, index) => {
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
      <MapDrawer fetchError={fetchError} locations={slicedLocations} focusMap={focusMap} loadingLocations={loadingLocations} />
    </Box>
  )
}

export default memo(MainMap)
