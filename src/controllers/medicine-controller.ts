import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { medicines } from '../mock-data/medicines';
import { extractMedicineNames } from '../services/medicine-service';
import { ApiRequest } from '../types/api-request';
import { ApiResponse } from '../types/api-response';
import { Medicine, MedicineDetails } from '../types/medicine';
import { logger } from '../utils/logger';

export const medicineRouter = Router();
const basePath = '/medicines';

medicineRouter.get(`${basePath}`, (async (_req: ApiRequest, res: ApiResponse<Medicine[]>) => {
  try {
    res.status(StatusCodes.OK).jsonApiResponse(extractMedicineNames(medicines));
  } catch (e: any) {
    logger.error(e.message, e)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('INTERNAL_SERVER_ERROR');
  }
}) as any);

medicineRouter.get(`${basePath}/details`, (async (_req: ApiRequest, res: ApiResponse<MedicineDetails[]>) => {
    try {
      res.status(StatusCodes.OK).jsonApiResponse(medicines);
    } catch (e: any) {
      logger.error(e.message, e)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('INTERNAL_SERVER_ERROR');
    }
  }) as any);
