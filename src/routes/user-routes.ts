import { Router } from 'express'
import { userController } from '../controllers/user-controller'
import { authenticationMiddleware } from '../middleware/authentication-middleware'

export const userRouter = Router()
const basePath = '/users'

// @ts-ignore
userRouter.post(`${basePath}/register`, userController.register)
// @ts-ignore
userRouter.get(`${basePath}/me`, authenticationMiddleware, userController.getMe)
