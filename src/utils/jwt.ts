import jwt from 'jsonwebtoken'
import _ from 'lodash'
import { config } from './config'

const verifyToken = (token: string): Record<string, unknown> => {
  // this is needed to handle an issue with passing a RSA key in env variables
  const publicKey = config.JWT_PUBLIC_KEY.replace(/\\n/gm, '\n')
  const tokenContent = jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as Record<string, unknown>
  return tokenContent
}

const createToken = (tokenBody: Record<string, unknown>, tokenExpiry: string | number): string => {
  const privateKey = config.JWT_PRIVATE_KEY.replace(/\\n/gm, '\n')

  // Adding a random number to prevent identical tokens of generated in the same second.
  const payload = {
    ...tokenBody,
    salt: _.random(1000, 9999),
  }

  const token = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: tokenExpiry,
  })

  return token
}

export { createToken, verifyToken }
