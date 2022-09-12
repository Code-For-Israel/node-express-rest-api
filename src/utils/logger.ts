import winston from 'winston'
import { name, version } from '../../package.json'
import { config } from './config'

export const logger = winston.createLogger({
  level: config.isDevelopment ? 'debug' : 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json(), winston.format.prettyPrint()),
  defaultMeta: { service: name, version },
  transports: [new winston.transports.Console()],
})
