import { Request } from 'express'
import jwt from 'jsonwebtoken'
import { JwtUser } from '../types/jwt-user'
import { config } from './config'

const verifyToken = (_req: Request, token: string): JwtUser => {
  // this is needed to handle an issue with passing a RSA key in env variables
  const publicKey = config.JWT_PUBLIC_KEY.replace(/\\n/gm, '\n')
  const tokenContent = jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as JwtUser
  return tokenContent
}

export { verifyToken }
