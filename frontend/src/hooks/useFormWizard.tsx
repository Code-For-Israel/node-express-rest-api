import { FormContext } from '@/context/FormWizardProvider'
import { FormValuesType } from 'FormTypes'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useContext } from 'react'

const useFormWizard = () => {
  const { activeStep, setActiveStep, steps, formValues, setFormValues, stepHistory, setStepHistory, loading, setLoading } = useContext(FormContext)
  const router = useRouter()

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
    router.push({ query: { step: steps[index].path } }, undefined, { shallow: true })
  }

  const stepBack = () => {
    const lastStep = stepHistory.pop()
    const index = steps.findIndex(step => step.path === lastStep)
    index === -1 ? setActiveStep(0) : setActiveStep(index)
    router.replace({ query: { step: steps[index].path } }, undefined, { shallow: true })
  }

  const updateFormData = (values: FormValuesType) => {
    setFormValues((curr: FormValuesType) => {
      return { ...curr, ...values }
    })
  }

  const resetFormData = () => {
    setFormValues({})
  }

  const submitData = async (endStage: string) => {
    const request = {
      id:
        'THIS_IS_NOT_REAL_' +
        Math.random()
          .toString(36)
          .substring(2, 16 + 2),
      endStage: endStage,
      data: formValues,
    }
    setLoading(true)
    const res = await axios.post('https://hook.eu1.make.com/p1w8frxwpzbsdhles91kw2yzybbtsewz', request).catch(err => console.log(err))
    console.log(res)
    setLoading(false)
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
    submitData,
    loading,
  }
}

export default useFormWizard
