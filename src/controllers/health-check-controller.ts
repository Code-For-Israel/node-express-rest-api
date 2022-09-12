import { ApiRequest } from '../types/api-request'
import { ApiResponse } from '../types/api-response'

const healthCheck = async (req: ApiRequest<any>, res: ApiResponse<any>) => {}

export const healthCheckController = {
  healthCheck,
}
