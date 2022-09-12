import { ErrorRequestHandler, NextFunction, Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { name, version } from '../../package.json'
import { ApiError } from '../types/api-error'
import { ApiResponse } from '../types/api-response'
import { config } from '../utils/config'
import { logger } from '../utils/logger'

/**
 * A middleware for handling all unhandled errors. structuring them as an ApiResponse and sending them back to the client.
 * @param error The unhandled error thrown somewhere in the application
 */
export const errorMiddleware: ErrorRequestHandler = (error: Error, req: Request, res: ApiResponse<undefined>, next: NextFunction) => {
  try {
    let status = StatusCodes.INTERNAL_SERVER_ERROR
    const message: string = error.message ?? 'An error has occurred'

    if (error instanceof ApiError) {
      status = error.status
    }

    const response = {
      success: false,
      data: undefined,
      error: message,
      stackTrace: config.isDevelopment ? error.stack : undefined,
      service: name,
      version: version,
    }

    res.status(status).json(response)
  } catch (error) {
    next(error)
  } finally {
    logger.error(error)
  }
}
