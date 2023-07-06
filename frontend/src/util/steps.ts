import Cold from '@/components/steps/Cold'
import Details from '@/components/steps/Details'
import Home from '@/components/steps/Home'
import Map from '@/components/steps/Map'
import Names from '@/components/steps/Names'
import NamesSummary from '@/components/steps/NamesSummary'
import Quantity from '@/components/steps/Quantity'
import ThankYou from '@/components/steps/ThankYou'

import { FormStepType } from 'FormTypes'

const steps: FormStepType[] = [
  {
    path: 'start',
    showProgress: false,
    progress: 0,
    finalStep: false,
    component: Home,
  },
  {
    path: 'quantity',
    showProgress: true,
    progress: 10,
    finalStep: false,
    component: Quantity,
  },
  {
    path: 'names',
    showProgress: true,
    progress: 20,
    finalStep: false,
    component: Names,
  },
  {
    path: 'names-summary',
    showProgress: true,
    progress: 30,
    finalStep: false,
    component: NamesSummary,
  },
  {
    path: 'cold-storage',
    showProgress: true,
    progress: 60,
    finalStep: false,
    component: Cold,
  },
  {
    path: 'details',
    showProgress: true,
    progress: 100,
    finalStep: true,
    component: Details,
  },
  {
    path: 'map',
    showProgress: false,
    progress: 100,
    finalStep: true,
    component: Map,
  },
  {
    path: 'thank-you',
    showProgress: false,
    progress: 100,
    finalStep: true,
    component: ThankYou,
  },
]

export default steps
