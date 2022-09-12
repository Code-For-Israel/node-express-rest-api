import { StatusCodes } from 'http-status-codes'

export class ApiError extends Error {
  constructor(message: string = 'An error has occurred', public status: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message)
  }
}
