import { JwtUser } from './types/jwt-user'

declare global {
  namespace Express {
    export interface Request {
      user?: JwtUser
    }
  }
}

export {}
