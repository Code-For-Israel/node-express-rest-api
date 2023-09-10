import FormProgress from '@/components/form/FormProgress'
import Header from '@/components/modules/Header'
import useFormWizard from '@/hooks/useFormWizard'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const FormStep = () => {
  const { activeStep, getStepDetails, totalSteps, stepBack, stepHistory } = useFormWizard()
  const { showProgress, component: Component, path } = getStepDetails(activeStep)
  const router = useRouter()

  useEffect(() => {
    if (activeStep >= 0 && router.query?.step !== path) router.replace({ query: { step: path } }, undefined, { shallow: true })
    router.beforePopState(({ as }) => {
      const currentPath = router.asPath
      if (as !== currentPath) {
        window.history.replaceState(null, '', as)
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
          px: 3,
          pb: 4,
        }}
      >
        <Header />
        {showProgress && <FormProgress progress={stepHistory.length} totalSteps={totalSteps} />}
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: showProgress ? 'calc(100% - 150px)' : '100%',
            position: 'relative',
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
