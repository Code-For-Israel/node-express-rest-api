import { renderLocationIcon } from '@/util/mapFunctions'
import { Box, Typography } from '@mui/material'
import { OverlayView, OverlayViewF } from '@react-google-maps/api'
import type { Location } from 'LocationTypes'
import Image from 'next/image'
import { memo } from 'react'

type Props = {
  location: Location
  onClick: (l: Location) => void
}

const MapPin = ({ location, onClick }: Props) => {
  const { Coordinates_c } = location

  const handleClick = () => {
    onClick(location)
  }

  return (
    <OverlayViewF position={Coordinates_c} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
      <Box
        sx={{
          display: 'flex',
          transform: 'translate(50%, -50%)',
          flexDirection: 'column',
          rowGap: 0.3,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={handleClick}
      >
        <Box
          component={Image}
          sx={{
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15))',
          }}
          src={renderLocationIcon(location)}
          alt="icon"
        />
        <Box sx={{ bgcolor: 'white', borderRadius: 100, px: '8px', mt: '2px', boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, 0.08)' }}>
          <Typography variant="caption" fontSize={'12px'} lineHeight={'24px'} fontWeight={600} color="primary.main">
            {location.Name_c}
          </Typography>
        </Box>
      </Box>
    </OverlayViewF>
  )
}

export default memo(MapPin)
