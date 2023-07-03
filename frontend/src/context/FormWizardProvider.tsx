import { FormStepType, FormValuesType } from "FormTypes";
import { ReactNode, createContext, useState } from "react";
import steps from "@/util/steps";

type FormContextType = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  formValues: FormValuesType;
  setFormValues: (values: FormValuesType) => void;
  steps: FormStepType[];
  stepHistory: string[];
  setStepHistory: (steps: string[]) => void;
};
export const FormContext = createContext<FormContextType>({
  activeStep: 0,
  setActiveStep: () => {},
  formValues: {},
  setFormValues: () => {},
  steps: [],
  stepHistory: [],
  setStepHistory: () => {},
});

type Props = { children: ReactNode };
const FormWizardProvider = ({ children }: Props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState<FormValuesType>({});
  const [stepHistory, setStepHistory] = useState<string[]>([]);

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
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormWizardProvider;
