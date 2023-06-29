import type { Role } from '@prisma/client'

export interface JwtUser extends Record<string, unknown> {
  id: number
  role: Role
}

export interface JwtRefreshToken extends Record<string, unknown> {
  id: number
}