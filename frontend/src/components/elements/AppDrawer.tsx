import { Box, SwipeableDrawer, SwipeableDrawerProps } from '@mui/material'
import { grey } from '@mui/material/colors'
import { ReactNode } from 'react'

const drawerBleeding = 40

type Props = { children: ReactNode } & SwipeableDrawerProps

const AppDrawer = ({ children, ...rest }: Props) => {
  return (
    <SwipeableDrawer
      anchor="bottom"
      swipeAreaWidth={drawerBleeding}
      ModalProps={{
        keepMounted: true,
      }}
      {...rest}
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
      {children}
    </SwipeableDrawer>
  )
}

export default AppDrawer
