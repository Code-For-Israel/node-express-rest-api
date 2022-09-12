import express from 'express'
import helmet from 'helmet'
import { errorMiddleware } from './middleware/error-middleware'
import { router as authRouter } from './routes/auth-routes'
import { router as healthRouter } from './routes/health-routes'
import { router as userRouter } from './routes/user-routes'
import { config } from './utils/config'
import { logger } from './utils/logger'

const app = express()

// Middleware
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
const routes = [healthRouter, authRouter, userRouter]
routes.forEach(route => app.use('/', route))

// Error handling
app.use(errorMiddleware)

// Start server
app.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`)
})
