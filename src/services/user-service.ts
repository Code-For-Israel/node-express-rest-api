import { User } from '@prisma/client'
import { prismaClient } from '../db'
import { RegisterUserRequestDto } from '../dtos/user-dtos'
import { ApiBadRequestError, InternalServerError } from '../types/api-error'
import { hashPassword } from '../utils/password'

const register = async (request: RegisterUserRequestDto): Promise<User> => {
  const existingUser = await prismaClient.user.findFirst({
    where: {
      OR: [{ email: request.email }],
    },
  })

  if (existingUser !== null) {
    throw new ApiBadRequestError('This email belongs to an existing user.')
  }

  const passwordHash = await hashPassword(request.password)
  const newUser = prismaClient.user.create({
    data: {
      email: request.email,
      name: request.name,
      passwordHash: passwordHash,
    },
  })

  if (!newUser) {
    throw new InternalServerError('Server error while registering a new user.')
  }

  return newUser
}

const getUserById = async (id: number): Promise<User> => {
  return prismaClient.user.findUniqueOrThrow({
    where: {
      id,
    },
  })
}

export const userService = {
  register,
  getUserById,
}