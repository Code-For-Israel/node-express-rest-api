import type { Response } from 'express'
import type { StatusCodes } from 'http-status-codes'

export interface ApiResponseStructure<T> {
  success: boolean
  data?: T
  error?: string
  stackTrace?: string
  version: string
  service: string
}

export type ApiResponse<T = unknown> = Omit<Response, 'json' | 'status'> & {
  json(data: ApiResponseStructure<T>): ApiResponse<ApiResponseStructure<T>>
} & {
  status(code: StatusCodes): ApiResponse<ApiResponseStructure<T>>
}
