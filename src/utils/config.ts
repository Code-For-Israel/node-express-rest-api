import { cleanEnv, port, str } from 'envalid'

export enum Environment {
  Development = 'development',
}

export const config = cleanEnv(process.env, {
  NODE_ENV: str({ choices: [Environment.Development] }),
  PORT: port(),
  DB_HOST: str(),
  DB_PORT: port(),
  DB_USERNAME: str(),
  DB_PASSWORD: str(),
  DB_DATABASE: str(),
  JWT_PUBLIC_KEY: str(),
  JWT_PRIVATE_KEY: str(),
})
