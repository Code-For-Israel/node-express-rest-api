import { StatusCodes } from 'http-status-codes'

export class ApiError extends Error {
  constructor(message = 'An error has occurred', public status: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message)
  }
}

export class ApiBadRequestError extends ApiError {
  constructor(message = 'An error has occurred') {
    super(message, StatusCodes.BAD_REQUEST)
  }
}

export class InternalServerError extends ApiError {
  constructor(message = 'An error has occurred') {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR)
  }
}
