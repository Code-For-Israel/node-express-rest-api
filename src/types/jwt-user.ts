import type { Role } from '@prisma/client'

export interface JwtUser {
  id: number
  email: string
  name: string
  role: Role
}
