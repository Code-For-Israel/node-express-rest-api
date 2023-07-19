import cors from 'cors';
import express from 'express';
import listEndpoints from 'express-list-endpoints';
import helmet from 'helmet';
import serverless from 'serverless-http';
import { collectionSiteRouter } from './controllers/collection-site-controller';
import { healthRouter } from './controllers/health-check-controller';
import { medicineRouter } from './controllers/medicine-controller';
import { medicineNamesRouter } from './controllers/medicine-names-controller';
import { errorMiddleware } from './middleware/error-middleware';
import { wrapApiResponse } from './types/api-response';
import { config } from './utils/config';
import { catchAllWrapper } from './utils/error';
import { logger } from './utils/logger';

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
const routers = [healthRouter, collectionSiteRouter, medicineRouter, medicineNamesRouter];
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

if (config.isDevelopment) {
  app.listen(config.PORT, () => {
    logger.info(`Server is running on port ${config.PORT}`)
    console.table(listEndpoints(app))
    console.debug('config:', config)
  })
} else {
  module.exports.handler = serverless(app);
}
