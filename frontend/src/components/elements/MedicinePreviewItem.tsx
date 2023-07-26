import { Box, ButtonBase, ButtonBaseProps, IconButton, Stack, Typography } from '@mui/material'
import { MedicineItemType } from 'MedicineTypes'
import Image from 'next/image'
import CloseIcon from 'public/icons/close.svg'
import PlaceholderIcon from 'public/icons/placeholder.svg'

type Props = {
  medicine: MedicineItemType
  onClick?: (medicine: MedicineItemType) => void
  onRemove?: (medicine: MedicineItemType) => void
} & Omit<ButtonBaseProps, 'onClick'>

const MedicinePreviewItem = ({ medicine, onClick, onRemove, ...rest }: Props) => {
  const { name, englishName, image } = medicine

  const handleClick = () => {
    if (onClick) onClick(medicine)
  }

  const handleRemove = () => {
    if (onRemove) onRemove(medicine)
  }

  return (
    <Box
      sx={{
        height: 65,
        py: 5,
        borderBottom: '1px solid #B3B3B3',
        width: '100%',
        '&:last-of-type': {
          borderBottom: 'none',
        },
        position: 'relative',
      }}
    >
      <Stack
        direction={'row'}
        gap={2}
        sx={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', right: 0, top: 0, px: 2 }}
      >
        <ButtonBase onClick={handleClick} disableRipple sx={{ width: '100%' }}>
          <Box
            sx={{
              borderRadius: 2,
              width: 48,
              height: 48,
              mr: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: '#EEEEEE',
            }}
          >
            <Image src={image || PlaceholderIcon} alt="medicine" />
          </Box>
          <Box
            sx={{
              textAlign: 'start',
              flex: 1,
            }}
          >
            <Typography variant="body2">{name}</Typography>
            <Typography variant="body2">{englishName}</Typography>
          </Box>
        </ButtonBase>
        <Box
          sx={{
            display: !!onRemove ? 'block' : 'none',
          }}
        >
          <IconButton onClick={handleRemove} sx={{ p: 0 }}>
            <Image src={CloseIcon} alt="remove" />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  )
}

export default MedicinePreviewItem
