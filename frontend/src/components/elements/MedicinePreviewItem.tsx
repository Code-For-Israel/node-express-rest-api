import { Box, ButtonBase, ButtonBaseProps, IconButton, Stack, Typography } from '@mui/material'
import { MedicineItemType } from 'MedicineTypes'
import { motion } from 'framer-motion'
import Image from 'next/image'
import CloseIcon from 'public/icons/close.svg'
import PlaceholderIcon from 'public/icons/placeholder.svg'

type Props = {
  medicine: MedicineItemType
  onClick?: (medicine: MedicineItemType) => void
  onRemove: (medicine: MedicineItemType) => void
  selected: boolean
  index?: number
  animate?: string | null
  hideLastBorder?: boolean
} & Omit<ButtonBaseProps, 'onClick'>

const MedicinePreviewItem = ({ medicine, onClick, onRemove, selected, animate, hideLastBorder = false, index = 0 }: Props) => {
  const { Name, englishName, image } = medicine

  const handleClick = () => {
    if (onClick) onClick(medicine)
  }

  const handleRemove = () => {
    onRemove(medicine)
  }

  return (
    <Box
      sx={{
        height: 65,
        py: 5,
        borderBottom: '1px solid #B3B3B3',
        width: '100%',
        '&:last-of-type': {
          borderBottom: hideLastBorder ? 'none' : '1px solid #B3B3B3',
        },
        position: 'relative',
      }}
    >
      <Stack direction={'row'} gap={2} sx={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <ButtonBase onClick={handleClick} disabled={selected} disableRipple sx={{ width: '100%', position: 'relative' }}>
          {selected && animate === medicine._id && (
            <Box
              component={motion.div}
              animate={{
                opacity: [1, 1, 1, 0],
                scale: [1, 1.5, 1.5, 1],
                x: ['calc(0px)', 'calc(-35vw)', 'calc(-40vw)', 'calc(-50vw + 62px)'],
                y: ['0vh', '0vh', '60vh', '60vh'],
                transitionEnd: {
                  display: 'none',
                },
              }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.4 }}
              sx={{
                position: 'absolute',
                left: 0,
                zIndex: 1000 + index,
                ...BASIC_IMAGE_STYLE,
              }}
            >
              <Image src={image || PlaceholderIcon} alt="medicine" />
            </Box>
          )}
          <Box
            sx={{
              mr: 2,
              ...BASIC_IMAGE_STYLE,
            }}
          >
            <Image src={image || PlaceholderIcon} alt="medicine" />
          </Box>
          <Box
            sx={{
              textAlign: 'start',
              flex: 1,
              overflow: 'hidden',
            }}
          >
            <Typography variant="body2">{Name.split(' ')[0]}</Typography>
            <Typography variant="body2">{englishName || ''}</Typography>
          </Box>
        </ButtonBase>
        <Box
          sx={{
            display: !!selected ? 'block' : 'none',
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

const BASIC_IMAGE_STYLE = {
  borderRadius: 2,
  width: 48,
  height: 48,
  bgcolor: '#EEEEEE',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
