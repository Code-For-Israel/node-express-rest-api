declare module 'FormTypes' {
  import { ComponentType } from 'react'
  export interface FormStepType {
    path: string
    showProgress: boolean
    progress: number
    component: ComponentType<any>
    finalStep: boolean
  }
  export interface FormValuesType {
    [key: string]: any
  }
}
