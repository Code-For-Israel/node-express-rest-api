import { Chip, ChipProps } from '@mui/material'

type Props = { color?: string; bgcolor?: string } & ChipProps

const AppChip = ({ color, bgcolor, ...rest }: Props) => (
  <Chip
    size="small"
    sx={{
      fontSize: 12,
      bgcolor: bgcolor || '#E5EBFF',
      color: color || 'primary.main',
      fontWeight: 600,
      py: 0.25,
      px: 1,
      mb: -0.25,
      '& .MuiChip-label': {
        p: 0,
        m: 0,
      },
    }}
    {...rest}
  />
)

export default AppChip
