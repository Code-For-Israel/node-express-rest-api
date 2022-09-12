import { Router } from 'express'
import { userController } from '../controllers/user-controller'

export const router = Router()

const basePath = 'user'
router.post(`${basePath}/register`, userController.register)
router.get(`${basePath}/me`, userController.getMe)
