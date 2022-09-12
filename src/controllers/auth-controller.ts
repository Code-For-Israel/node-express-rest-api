import { LoginRequestDto, LoginResponseDto, RefreshTokenRequestDto } from '../dtos/auth-dtos'
import { ApiRequest } from '../types/api-request'
import { ApiResponse } from '../types/api-response'

const login = async (req: ApiRequest<LoginRequestDto>, res: ApiResponse<LoginResponseDto>) => {}
const refreshToken = async (req: ApiRequest<RefreshTokenRequestDto>, res: ApiResponse<LoginResponseDto>) => {}

export const authController = {
  login,
  refreshToken,
}
