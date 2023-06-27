import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import serverless from 'serverless-http';
import { healthRouter } from './src/controllers/health-check-controller';
import { errorMiddleware } from './src/middleware/error-middleware';
import { wrapApiResponse } from './src/types/api-response';
import { config } from './src/utils/config';
import { catchAllWrapper } from './src/utils/error';

const app = express();

// Middlewares
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorMiddleware);
// Allow all cors requests for development
if (config.isDevelopment) {
  app.use(cors())
};
// This is kind of a hack to extend express.Response
(app.response as any).jsonApiResponse = function (data: unknown) {
  return this.json(wrapApiResponse(data))
};

// Routes
const routers = [healthRouter];
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

module.exports.handler = serverless(app);