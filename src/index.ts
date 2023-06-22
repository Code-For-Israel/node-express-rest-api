import cors from 'cors'
import express from 'express'
import listEndpoints from 'express-list-endpoints'
import helmet from 'helmet'
import { authRouter } from './controllers/auth-controller'
import { healthRouter } from './controllers/health-check-controller'
import { userRouter } from './controllers/user-controller'
import { errorMiddleware } from './middleware/error-middleware'
import { wrapApiResponse } from './types/api-response'
import { config } from './utils/config'
import { catchAllWrapper } from './utils/error'
import { logger } from './utils/logger'

const app = express()

// This is kind of a hack to extend express.Response
;(app.response as any).jsonApiResponse = function (data: unknown) {
  return this.json(wrapApiResponse(data))
}

// Allow all cors requests for development
if (config.isDevelopment) {
  app.use(cors())
}

// Middleware
app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
const routers = [healthRouter, authRouter, userRouter]
for (const router of routers) {
  // This is a hack to make sure that all routes are wrapped in a try/catch
  for (const layer of router.stack) {
    if (layer && layer.route && layer.route.stack && layer.route.stack.length > 0) {
      const lastRouteLayer = layer.route.stack[layer.route.stack.length - 1]
      lastRouteLayer.handle = catchAllWrapper(lastRouteLayer.handle)
    }
  }
  app.use(router)
}

// Error handling
app.use(errorMiddleware)

// Start server
app.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`)

  if (config.isDevelopment) {
    console.table(listEndpoints(app))
    console.debug('config:', config)
  }
})
