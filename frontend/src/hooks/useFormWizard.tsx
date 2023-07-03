import { FormContext } from '@/context/FormWizardProvider'
import { FormValuesType } from 'FormTypes'
import { useContext } from 'react'

const useFormWizard = () => {
  const { activeStep, setActiveStep, steps, formValues, setFormValues, stepHistory, setStepHistory } = useContext(FormContext)

  const getStepDetails = (index: number) => {
    return steps[index]
  }

  const totalSteps = steps.filter(s => s.finalStep === false).length

  const stepTo = (target: string) => {
    const index = steps.findIndex(step => step.path === target)
    if (index === -1) return
    const newHistory = [...stepHistory]
    newHistory.push(steps[activeStep].path)
    setStepHistory(newHistory)
    setActiveStep(index)
  }

  const stepBack = () => {
    const lastStep = stepHistory.pop()
    const index = steps.findIndex(step => step.path === lastStep)
    if (index === -1) return
    setActiveStep(index)
  }

  const updateFormData = (values: FormValuesType) => {
    setFormValues((curr: FormValuesType) => {
      console.log({ ...curr, ...values })
      return { ...curr, ...values }
    })
  }

  const resetFormData = () => {
    setFormValues({})
  }

  return {
    activeStep,
    totalSteps,
    getStepDetails,
    stepBack,
    stepTo: stepTo,
    updateFormData,
    resetFormData,
    formData: formValues,
  }
}

export default useFormWizard
