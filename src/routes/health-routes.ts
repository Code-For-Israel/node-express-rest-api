import { Router } from 'express'
import { healthCheckController } from '../controllers/health-check-controller'

export const router = Router()

router.post(`health-check`, healthCheckController.healthCheck)
