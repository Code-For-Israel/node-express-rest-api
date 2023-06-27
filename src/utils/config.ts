import 'dotenv/config';
import { bool, cleanEnv, str } from 'envalid';

enum Environment {
  Development = 'development',
  Production = 'production'
}

export const config = cleanEnv(process.env, {
  NODE_ENV: str({ choices: Object.values(Environment), default: Environment.Production }),
  IS_CLOUD: bool({ default: false }),
})
