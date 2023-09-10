import Cold from '@/components/steps/cold/Cold'
import Details from '@/components/steps/Details'
import Home from '@/components/steps/Home'
import Names from '@/components/steps/Names'
import NamesSummary from '@/components/steps/NamesSummary'
import Quantity from '@/components/steps/Quantity'
import ThankYou from '@/components/steps/ThankYou'

import { FormStepType } from 'FormTypes'

const steps: FormStepType[] = [
  {
    path: 'start',
    showProgress: false,
    finalStep: false,
    component: Home,
  },
  {
    path: 'quantity',
    showProgress: true,
    finalStep: false,
    component: Quantity,
  },
  {
    path: 'names',
    showProgress: true,
    finalStep: false,
    component: Names,
  },
  {
    path: 'names-summary',
    showProgress: true,
    finalStep: false,
    component: NamesSummary,
  },
  {
    path: 'cold-storage',
    showProgress: true,
    finalStep: false,
    component: Cold,
  },
  {
    path: 'details',
    showProgress: false,
    finalStep: true,
    component: Details,
  },
  {
    path: 'thank-you',
    showProgress: false,
    finalStep: true,
    component: ThankYou,
  },
]

export default steps
