import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Box, Button, ClickAwayListener, Dialog, DialogTitle, IconButton, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import CloseIcon from 'public/icons/close.svg'
import { useState } from 'react'
import AppDrawer from '../elements/AppDrawer'
import PlacePreviewItem from '../elements/PlacePreviewItem'
const MapStep = () => {
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
    </>
  )
}

export default MapStep
