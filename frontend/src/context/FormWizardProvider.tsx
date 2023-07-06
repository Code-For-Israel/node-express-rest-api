import steps from '@/util/steps'
import { FormStepType, FormValuesType } from 'FormTypes'
import { ReactNode, createContext, useState } from 'react'

type FormContextType = {
  activeStep: number
  setActiveStep: (step: number) => void
  formValues: FormValuesType
  setFormValues: (values: FormValuesType) => void
  steps: FormStepType[]
  stepHistory: string[]
  setStepHistory: (steps: string[]) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}
export const FormContext = createContext<FormContextType>({
  activeStep: 0,
  setActiveStep: () => undefined,
  formValues: {},
  setFormValues: () => undefined,
  steps: [],
  stepHistory: [],
  setStepHistory: () => undefined,
  loading: false,
  setLoading: () => undefined,
})

type Props = { children: ReactNode }
const FormWizardProvider = ({ children }: Props) => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [formValues, setFormValues] = useState<FormValuesType>({})
  const [stepHistory, setStepHistory] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <FormContext.Provider
      value={{
        activeStep,
        setActiveStep,
        formValues,
        setFormValues,
        steps,
        stepHistory,
        setStepHistory,
        loading,
        setLoading,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export default FormWizardProvider
