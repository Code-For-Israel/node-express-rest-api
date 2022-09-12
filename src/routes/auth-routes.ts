import { Router } from 'express'
import { authController } from '../controllers/auth-controller'

export const router = Router()

const basePath = 'auth'
// @ts-ignore
router.post(`${basePath}/login`, authController.login)
// @ts-ignore
router.post(`${basePath}/token`, authController.refreshToken)
