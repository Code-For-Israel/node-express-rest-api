import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiRequest } from '../types/api-request';
import { ApiResponse } from '../types/api-response';
import { MedicineName, dbItems2MedicineNames } from '../types/medicine';
import { logger } from '../utils/logger';
import { dynamoService } from '../services/dynamo-service';

export const medicineNamesRouter = Router();
const basePath = '/medicine-names';

type MedicineNameRequest = {
  startWith?: string
};

medicineNamesRouter.get(`${basePath}`, (async (req: ApiRequest<MedicineNameRequest>, res: ApiResponse<MedicineName[]>) => {
  try {
      const prefix = req.query?.startWith?.toUpperCase() || 'A';
      const firstLetter = prefix.charAt(0).toUpperCase();
      const medicines = (await dynamoService.fetchByPrefix(
        process.env.MEDICINE_NAMES_TABLE!, 'name_in_upper_case', prefix, 'first_letter', firstLetter));
      res.status(StatusCodes.OK).jsonApiResponse(dbItems2MedicineNames(medicines));
  } catch (e: any) {
    logger.error(e.message, e)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('INTERNAL_SERVER_ERROR');
  }
}) as any);
