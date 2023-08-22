import { Box, Typography } from '@mui/material'
import { OverlayView, OverlayViewF } from '@react-google-maps/api'
import type { Location } from 'LocationTypes'
import Image from 'next/image'
import LocationPinIcon from 'public/icons/location-pin.svg'

type Props = {
  location: Location
}

const MapPin = ({ location }: Props) => {
  const { Coordinates_c } = location

  return (
    <OverlayViewF position={Coordinates_c} mapPaneName={OverlayView.MARKER_LAYER}>
      <Box
        sx={{
          display: 'flex',
          transform: 'translate(50%, -50%)',
          flexDirection: 'column',
          rowGap: 0.3,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image src={LocationPinIcon} alt="icon" width={38} height={38} />
        <Box sx={{ bgcolor: 'white', borderRadius: 100, px: 1, boxShadow: 1 }}>
          <Typography variant="caption" color="primary.main">
            {location.Name_c}
          </Typography>
        </Box>
      </Box>
    </OverlayViewF>
  )
}

export default MapPin
