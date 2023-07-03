import FormProgress from '@/components/form/FormProgress'
import useFormWizard from '@/hooks/useFormWizard'
import { Box } from '@mui/material'

const FormStep = () => {
  const { activeStep, getStepDetails, totalSteps } = useFormWizard()
  const { showProgress, component: Component } = getStepDetails(activeStep)

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 2,
          px: 4,
        }}
      >
        {showProgress && <FormProgress progress={activeStep} totalSteps={totalSteps} />}
        <Box
          sx={{
            pt: 4,
            display: 'flex',
            width: '100%',
            flex: 1,
          }}
        >
          {Component && <Component />}
        </Box>
      </Box>
    </>
  )
}

export default FormStep
