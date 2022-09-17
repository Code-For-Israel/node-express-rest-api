import type { Response } from 'express'
import type { StatusCodes } from 'http-status-codes'
import { name, version } from '../../package.json'

export interface ApiResponseStructure<T = unknown> {
  success: boolean
  data: T | null
  error: string | null
  stackTrace?: string
  version: string
  service: string
}

export type ApiResponse<T = unknown> = Omit<Response, 'json' | 'status'> & {
  json(data: ApiResponseStructure<T>): ApiResponse<T>
  jsonApiResponse(data: T): ApiResponse<T>
} & {
  status(code: StatusCodes): ApiResponse<T>
}

export const wrapApiResponse = <T = unknown>(data: T): ApiResponseStructure<T> => {
  return {
    success: true,
    data,
    error: null,
    version: version,
    service: name,
  }
}
