import { bool, cleanEnv, port, str } from 'envalid'

export enum Environment {
  Development = 'development',
}

export const config = cleanEnv(process.env, {
  NODE_ENV: str({ choices: [Environment.Development] }),
  PORT: port(),
  JWT_PUBLIC_KEY: str(),
  JWT_PRIVATE_KEY: str(),
  JWT_TOKEN_EXPIRY: str(),
  JWT_REFRESH_TOKEN_EXPIRY: str(),
  DATABASE_URL: str(),
  IS_CLOUD: bool({ default: false }),
})
