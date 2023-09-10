declare module 'FormTypes' {
  import { MedicineItemType } from 'MedicineTypes'
  import { ComponentType } from 'react'
  export interface FormStepType {
    path: string
    showProgress: boolean
    component: ComponentType<any>
    finalStep: boolean
  }
  export interface FormValuesType {
    medicines?: MedicineItemType[]
    hasExpensive?: boolean
    expensiveDetected?: boolean
    hasCold?: boolean
    [key: string]: any
  }
}
