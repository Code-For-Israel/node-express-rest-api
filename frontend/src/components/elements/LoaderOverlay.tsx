import { secondaryColor } from '@/styles/theme'
import { Box } from '@mui/material'
import { DotLoader } from 'react-spinners'
import { LoaderSizeProps } from 'react-spinners/helpers/props'

const LoaderOverlay = ({ loading, ...rest }: LoaderSizeProps) => {
  if (!loading) return null
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.6)',
        zIndex: 1000,
      }}
    >
      <DotLoader color={secondaryColor} {...rest} size={30} speedMultiplier={2} />
    </Box>
  )
}

export default LoaderOverlay
