import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { collectionSites } from '../mock-data/collection-sites';
import { ApiRequest } from '../types/api-request';
import { ApiResponse } from '../types/api-response';
import { CollectionSite } from '../types/collection-site';
import { logger } from '../utils/logger';

export const collectionSiteRouter = Router();

collectionSiteRouter.get(`/collection-sites`, (async (_req: ApiRequest, res: ApiResponse<CollectionSite[]>) => {
  try {
    res.status(StatusCodes.OK).jsonApiResponse(collectionSites);
  } catch (e: any) {
    logger.error(e.message, e)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('INTERNAL_SERVER_ERROR');
  }
}) as any);
