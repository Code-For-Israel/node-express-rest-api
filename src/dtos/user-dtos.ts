import type { Role } from '@prisma/client'

export interface UserDto {
  id: number
  email: string
  name: string | null
  role: Role
}

export interface RegisterUserRequestDto {
  email: string
  password: string
  verifyPassword: string
  name?: string | null
}