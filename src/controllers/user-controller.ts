import { RegisterUserRequestDto, UserDto } from '../dtos/user-dtos'
import { ApiRequest } from '../types/api-request'
import { ApiResponse } from '../types/api-response'

const register = async (req: ApiRequest<RegisterUserRequestDto>, res: ApiResponse<UserDto>) => {}
const getMe = async (req: ApiRequest, res: ApiResponse<UserDto>) => {}

export const userController = {
  register,
  getMe,
}
