import { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prismaClient } from '../db'
import { logger } from '../utils/logger'

export const healthRouter = Router()

healthRouter.get(`/health-check`, async (req: Request, res: Response) => {
  try {
    // A basic health check to see if the database is up
    await prismaClient.$queryRawUnsafe('SELECT 1')
    res.status(StatusCodes.OK).send('OK')
  } catch (e: any) {
    logger.error(e.message, e)
    res.status(StatusCodes.SERVICE_UNAVAILABLE).send('SERVICE_UNAVAILABLE')
  }
})
