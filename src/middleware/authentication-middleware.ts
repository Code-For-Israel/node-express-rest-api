import { NextFunction, Request, RequestHandler, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ApiError } from '../types/api-error'
import { JwtUser } from '../types/jwt-user'
import { verifyToken } from '../utils/jwt'

/**
 * A middleware that checks if the request has a valid token in it's header.
 */
export const authenticationMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization ?? ''
    const authParts = authHeader.split(' ')
    if (authParts && authParts.length == 2 && authParts[0] == 'Bearer') {
      const tokenUser = verifyToken(authParts[1]) as JwtUser
      req.user = tokenUser
      next()
    } else {
      next(new ApiError('Invalid auth token', StatusCodes.UNAUTHORIZED))
    }
  } catch (err) {
    next(new ApiError('Invalid auth token', StatusCodes.UNAUTHORIZED))
  }
}
