import { LoginRequestDto, LoginResponseDto, RefreshTokenRequestDto } from '../dtos/auth-dtos'
import { authService } from '../services/auth-service'
import { ApiRequest } from '../types/api-request'
import { ApiResponse } from '../types/api-response'

const login = async (req: ApiRequest<LoginRequestDto>, res: ApiResponse<LoginResponseDto>) => {
  const { token, refreshToken } = await authService.login(req.body)
  return res.jsonApiResponse({ token, refreshToken })
}

const refreshToken = async (req: ApiRequest<RefreshTokenRequestDto>, res: ApiResponse<LoginResponseDto>) => {
  const { token, refreshToken } = await authService.refreshToken(req.body)
  return res.jsonApiResponse({ token, refreshToken })
}

export const authController = {
  login,
  refreshToken,
}
