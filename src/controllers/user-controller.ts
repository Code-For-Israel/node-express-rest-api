import { User } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { RegisterUserRequestDto, UserDto } from '../dtos/user-dtos'
import { userService } from '../services/user-service'
import { ApiBadRequestError } from '../types/api-error'
import { ApiRequest } from '../types/api-request'
import { ApiResponse } from '../types/api-response'

const userToUserDto = (user: User): UserDto => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }
}

const register = async (req: ApiRequest<RegisterUserRequestDto>, res: ApiResponse<UserDto>) => {
  // A form of validation
  if (req.body.password !== req.body.verifyPassword) {
    throw new ApiBadRequestError('Passwords do not match')
  }

  const user = await userService.register(req.body)
  res.status(StatusCodes.CREATED).jsonApiResponse(userToUserDto(user))
}

const getMe = async (req: ApiRequest, res: ApiResponse<UserDto>) => {
  // We can assume user exist here because of the auth middleware
  const user = await userService.getUserById(req.user!.id)
  res.status(StatusCodes.CREATED).jsonApiResponse(userToUserDto(user))
}

export const userController = {
  register,
  getMe,
}
