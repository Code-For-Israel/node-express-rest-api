import 'dotenv/config';
import { bool, cleanEnv, port, str } from 'envalid';

const DEFAULT_PORT = 3000;

enum Environment {
  Development = 'development',
  Production = 'production'
}

export const config = cleanEnv(process.env, {
  NODE_ENV: str({ choices: Object.values(Environment), default: Environment.Production }),
  IS_CLOUD: bool({ default: true }),
  PORT: port({ default: DEFAULT_PORT }),
  JWT_PUBLIC_KEY: str({ default: '' }),
  JWT_PRIVATE_KEY: str({ default: '' }),
  JWT_TOKEN_EXPIRY: str({ default: '' }),
  JWT_REFRESH_TOKEN_EXPIRY: str({ default: '' }),
})
