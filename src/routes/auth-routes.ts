import { Router } from 'express'
import { authController } from '../controllers/auth-controller'

export const authRouter = Router()

const basePath = '/auth'

// @ts-ignore
authRouter.post(`${basePath}/login`, authController.login)
// @ts-ignore
authRouter.post(`${basePath}/token`, authController.refreshToken)
