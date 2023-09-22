import useFormWizard from '@/hooks/useFormWizard'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { IconButton, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import BackArrowIcon from 'public/icons/back-arrow.svg'
import { memo } from 'react'

const Header = () => {
  const { t } = useStaticTranslation()
  const { stepBack, stepHistory, getStepDetails, activeStep } = useFormWizard()
  const { finalStep } = getStepDetails(activeStep)

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      sx={{
        bgcolor: 'white',
        px: 2,
        mb: 4,
        height: 55,
        minHeight: 55,
        width: '100vw',
        position: 'relative',
        boxShadow: '0px 2px 0px 0px rgba(0, 0, 0, 0.10)',
      }}
    >
      {stepHistory.length > 0 && !finalStep && (
        <IconButton disableRipple onClick={stepBack} sx={{ position: 'absolute', left: 20 }}>
          <Image src={BackArrowIcon} alt="back arrow" />
        </IconButton>
      )}
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        {t('donate_for_health')}
      </Typography>
    </Stack>
  )
}

export default memo(Header)
