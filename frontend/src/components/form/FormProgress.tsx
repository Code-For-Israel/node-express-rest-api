import { Box } from '@mui/material'

type Props = { progress: number; totalSteps: number }

const FormProgress = ({ progress, totalSteps }: Props) => {
  const progressPercent = (progress / (totalSteps - 1)) * 100

  return (
    <Box
      sx={{
        width: '95%',
        height: 14,
        bgcolor: '#E3E3E3',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: 20,
        mb: 4,
      }}
    >
      <Box
        sx={{
          transition: 'width 0.5s ease-in-out',
          width: `${progressPercent}%`,
          position: 'absolute',
          left: 0,
          height: 14,
          borderRadius: 20,
          background: 'linear-gradient(180deg, #F99F4F 0, #FF8600 100%)',
        }}
      />
    </Box>
  )
}

export default FormProgress
