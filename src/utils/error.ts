import { NextFunction, Request, Response } from 'express'

export const catchAllWrapper = (handlerFunction: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) => {
  const functionBeforeWrapping = handlerFunction
  const functionNameBeforeWrapping = handlerFunction['name']
  const catchAllWrapper = (req: Request, res: Response, next: NextFunction) => {
    functionBeforeWrapping(req, res, next).catch((error: Error) => {
      next(error)
    })
  }
  Object.defineProperty(catchAllWrapper, 'name', { value: `catchAll(${functionNameBeforeWrapping})`, writable: false })
  return catchAllWrapper
}
