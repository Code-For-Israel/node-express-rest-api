import type { Request } from 'express'

export type ApiRequest<T = unknown> = Omit<Request, 'body' | 'query'> & { body: T } & { query: T }
