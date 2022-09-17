import { Role, User } from '@prisma/client'
import { prismaClient } from '../db'
import { RegisterUserRequestDto } from '../dtos/user-dtos'
import { hashPassword } from '../utils/password'

const register = async (request: RegisterUserRequestDto): Promise<User> => {
  const passwordHash = await hashPassword(request.password)
  return prismaClient.user.create({
    data: {
      email: request.email,
      name: request.name,
      passwordHash: passwordHash,
      role: Role.User, // default role
    },
  })
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
