import { Box, ClickAwayListener, SwipeableDrawer } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useState } from 'react'
import PlacePreviewItem from '../elements/PlacePreviewItem'

const drawerBleeding = 40

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

      <SwipeableDrawer
        anchor="bottom"
        hideBackdrop
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 36,
            borderTopRightRadius: 36,
            right: 0,
            left: 0,
            bgcolor: 'white',
            height: drawerBleeding,
            visibility: 'visible',
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 4,
              backgroundColor: grey[900],
              borderRadius: 3,
              position: 'absolute',
              top: 10,
              left: 'calc(50% - 20px)',
            }}
          />
        </Box>
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
      </SwipeableDrawer>
    </>
  )
}

export default MapStep
