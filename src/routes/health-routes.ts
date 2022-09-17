import { Router } from 'express'
import { healthCheckController } from '../controllers/health-check-controller'

export const healthRouter = Router()

healthRouter.get(`/health-check`, healthCheckController.healthCheck)
