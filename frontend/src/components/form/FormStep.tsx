import FormProgress from '@/components/form/FormProgress'
import useFormWizard from '@/hooks/useFormWizard'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const FormStep = () => {
  const { activeStep, getStepDetails, totalSteps, stepBack } = useFormWizard()
  const { showProgress, component: Component, path } = getStepDetails(activeStep)
  const router = useRouter()

  useEffect(() => {
    if (activeStep >= 0 && router.query?.step !== path) router.replace({ query: { step: path } }, undefined, { shallow: true })
    router.beforePopState(({ as }) => {
      const currentPath = router.asPath
      if (as !== currentPath) {
        window.history.pushState(null, '', as)
        stepBack()
      }
      return true
    })

    return () => {
      router.beforePopState(() => true)
    }
  }, [router, stepBack])

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
          pt: 2,
          px: 2,
          pb: 4,
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
