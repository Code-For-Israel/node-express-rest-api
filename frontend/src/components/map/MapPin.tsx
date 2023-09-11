import { renderLocationIcon } from '@/util/mapFunctions'
import { Box, Typography } from '@mui/material'
import { OverlayView, OverlayViewF } from '@react-google-maps/api'
import type { Location } from 'LocationTypes'
import Image from 'next/image'

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
        <Box
          component={Image}
          sx={{
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15))',
          }}
          src={renderLocationIcon(location)}
          alt="icon"
          width={38}
          height={38}
        />
        <Box sx={{ bgcolor: 'white', borderRadius: 100, px: 1, boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, 0.08)' }}>
          <Typography variant="caption" color="primary.main">
            {location.Name_c}
          </Typography>
        </Box>
      </Box>
    </OverlayViewF>
  )
}

export default MapPin
