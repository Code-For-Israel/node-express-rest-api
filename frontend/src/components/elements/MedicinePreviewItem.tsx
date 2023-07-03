import { Box, ButtonBase, Stack, Typography } from '@mui/material'
import { MedicineItemType } from 'MedicineTypes'
import Image from 'next/image'
import PlaceholderIcon from 'public/icons/placeholder.svg'

type Props = { medicine: MedicineItemType; onClick: (medicine: MedicineItemType) => void }

const MedicinePreviewItem = ({ medicine, onClick }: Props) => {
  const { name, englishName, image } = medicine
  const handleClick = () => {
    onClick(medicine)
  }
  return (
    <Stack
      direction={'row'}
      component={ButtonBase}
      onClick={handleClick}
      gap={2}
      sx={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 65,
        py: 5,
        borderBottom: '1px solid #B3B3B3',
        width: '100%',
      }}
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
      <Box>
        <Typography variant="body2">{name}</Typography>
        <Typography variant="body2">{englishName}</Typography>
      </Box>
    </Stack>
  )
}

export default MedicinePreviewItem
