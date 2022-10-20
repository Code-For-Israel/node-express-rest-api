import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { prismaClient } from '../db'
import { LoginRequestDto, RefreshTokenRequestDto, RegisterRequestDto } from '../dtos/auth-dtos'
import { ApiBadRequestError } from '../types/api-error'
import { JwtRefreshToken, JwtUser } from '../types/jwt-user'
import { config } from '../utils/config'
import { createToken, verifyToken } from '../utils/jwt'
import { comparePassword } from '../utils/password'


type TokenAndRefreshToken = { token: string; refreshToken: string }
type RegisterSuccess = { name: string | null; email: string, role: string }

const refreshTokenForUserId = async (userId: number): Promise<string> => {
  const tokenBody: JwtRefreshToken = { id: userId }
  const refreshToken = createToken(tokenBody, config.JWT_REFRESH_TOKEN_EXPIRY)

  await prismaClient.$transaction([
    prismaClient.refreshToken.updateMany({ data: { invalidatedAt: new Date() }, where: { userId: userId, invalidatedAt: null } }),
    prismaClient.refreshToken.create({ data: { userId: userId, token: refreshToken } }),
  ])

  return refreshToken
}

const generateTokensForUser = async (user: User): Promise<TokenAndRefreshToken> => {
  const tokenBody: JwtUser = {
    id: user.id,
    role: user.role,
  }

  return {
    token: createToken(tokenBody, config.JWT_TOKEN_EXPIRY),
    refreshToken: await refreshTokenForUserId(user.id),
  }
}

const login = async (request: LoginRequestDto): Promise<TokenAndRefreshToken> => {
  const user = await prismaClient.user.findUniqueOrThrow({
    where: {
      email: request.email,
    },
  })

  const isPasswordValid = await comparePassword(request.password, user.passwordHash)
  if (!isPasswordValid) {
    throw new ApiBadRequestError()
  }

  return generateTokensForUser(user)
}

const register = async (request: RegisterRequestDto): Promise<RegisterSuccess> => {
  const { name, email, password, verifyPassword } = request
  if (password !== verifyPassword) {
    throw new ApiBadRequestError('Passwords do not match')
  }
  const user = await prismaClient.user.findFirst({
    where: {
      OR: [{email: email},{name: name}]
    },
  })
  if (user !== null){
    if (user.email == email){
     throw new ApiBadRequestError("This email belongs to an existing user.")
    }
    else{
      throw new ApiBadRequestError("User name is taken.")
    }
  }
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g
  const isPasswordValid = password.match(passwordRegex) != null
  if (!isPasswordValid) {
    throw new ApiBadRequestError("Password must contain a minimum of eight characters, at least one letter and one number.")
  }
  const createdUser = await prismaClient.user.create({ data: { name: name, email: email, passwordHash: await bcrypt.hash(password, 10) }})
  if(createdUser){
    return {
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role
    }
  }
  else{
    throw new ApiBadRequestError("Server error while registering a new user.")
  }
}

const refreshToken = async (request: RefreshTokenRequestDto): Promise<TokenAndRefreshToken> => {
  const content = verifyToken(request.refreshToken) as JwtRefreshToken
  const refreshTokenAndUser = await prismaClient.refreshToken.findFirst({
    where: {
      token: request.refreshToken,
      userId: content.id,
    },
    include: {
      user: true,
    },
  })

  if (!refreshTokenAndUser) {
    throw new ApiBadRequestError()
  }

  // If someone tries to use an invalidated token, we invalidate all tokens for that user
  if (refreshTokenAndUser && refreshTokenAndUser.invalidatedAt !== null) {
    await prismaClient.refreshToken.updateMany({ data: { invalidatedAt: new Date() }, where: { userId: content.id, invalidatedAt: null } })
    throw new ApiBadRequestError()
  }

  return generateTokensForUser(refreshTokenAndUser.user)
}

export const authService = {
  login,
  register,
  refreshToken,
}
