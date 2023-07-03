import { Box, ClickAwayListener } from '@mui/material'
import { useState } from 'react'
import AppDrawer from '../elements/AppDrawer'
import PlacePreviewItem from '../elements/PlacePreviewItem'

const MapStep = () => {
  const [open, setOpen] = useState(true)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'lightgray',
        }}
      >
        {/* <Map
          mapboxAccessToken="<Mapbox access token>"
          initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 14,
          }}
          style={{ width: 600, height: 400 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        /> */}
      </Box>
      <AppDrawer hideBackdrop open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <ClickAwayListener onClickAway={toggleDrawer(false)}>
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
      </AppDrawer>
    </>
  )
}

export default MapStep
