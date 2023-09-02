import winston from 'winston'
import { name, version } from '../../package.json'
import { config } from './config'

const logFormatters = [winston.format.timestamp(), winston.format.json()]
if (!config.IS_CLOUD) {
  // If you are not in cloud, it is nice to have a human readable log
  logFormatters.push(winston.format.prettyPrint())
}

export const logger = winston.createLogger({
  level: config.isDevelopment ? 'debug' :  process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(...logFormatters),
  defaultMeta: { service: name, version },
  transports: [new winston.transports.Console()],
})
