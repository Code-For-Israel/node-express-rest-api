import AppDrawer from '@/components/elements/AppDrawer'
import PlacePreviewItem from '@/components/elements/PlacePreviewItem'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Box, Button, ClickAwayListener, Container, Dialog, DialogTitle, IconButton, Stack, Typography } from '@mui/material'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import CloseIcon from 'public/icons/close.svg'
import { useState } from 'react'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const center = {
  lat: -3.745,
  lng: -38.523,
}

const onLoad = (map: google.maps.Map) => {
  const bounds = new window.google.maps.LatLngBounds()
  map.fitBounds(bounds)
}

const MapPage = () => {
  const router = useRouter()
  const {
    query: { filter },
  } = router
  console.log(filter)

  const [openDrawer, setOpenDrawer] = useState(false)
  const [openDialog, setOpenDialog] = useState(true)
  const { t } = useStaticTranslation()

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
              <></>
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
          <Dialog open={openDialog} onClose={closeDialog} sx={{ '& .MuiPaper-root': { width: '100%', borderRadius: '24px' } }}>
            <DialogTitle sx={{ m: 0, py: 2.5 }}>
              <IconButton
                aria-label="close"
                onClick={closeDialog}
                sx={{
                  position: 'absolute',
                  right: 18,
                  top: 18,
                }}
              >
                <Image src={CloseIcon} alt="close" />
              </IconButton>
            </DialogTitle>
            <Stack
              gap={2}
              sx={{
                p: 3,
                width: '100%',
                height: '100%',
                overflow: 'auto',
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h1">{t('map_dialog_title')}</Typography>
              <Typography fontSize={17} variant="body1">
                {t('map_dialog_text')}
              </Typography>
              <Button variant="contained" sx={{ mt: 4 }} onClick={closeDialog}>
                {t('allow_location')}
              </Button>
              <Button variant="text" onClick={closeDialog}>
                {t('not_this_time')}
              </Button>
            </Stack>
          </Dialog>
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
