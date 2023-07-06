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
        component={ButtonBase}
        direction={'row'}
        gap={2}
        {...rest}
        sx={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'flex-start', position: 'absolute', right: 0, top: 0 }}
        onClick={handleClick}
      >
        <Box
          sx={{
            borderRadius: 2,
            width: 48,
            height: 48,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#EEEEEE',
          }}
        >
          <Image src={image || PlaceholderIcon} alt="medicine" />
        </Box>
        <Box sx={{ textAlign: 'start' }}>
          <Typography variant="body2">{name}</Typography>
          <Typography variant="body2">{englishName}</Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          display: !!onRemove ? 'block' : 'none',
          position: 'absolute',
          right: 6,
          top: '50%',
          height: 13,
          width: 13,
          transform: 'translateY(-15px)',
        }}
      >
        <IconButton onClick={handleRemove} sx={{ p: 0 }}>
          <Image src={CloseIcon} alt="remove" />
        </IconButton>
      </Box>
    </Box>
  )
}

export default MedicinePreviewItem
