
export interface LoginRequestDto {
  email: string
  password: string
}

export interface RegisterRequestDto {
  email: string
  name: string
  password: string
  verifyPassword: string
}

export interface LoginResponseDto {
  token: string
  refreshToken: string
}

export interface RegisterResponseDto {
  name: string | null
  email: string
  role: string
}

export interface RefreshTokenRequestDto {
  refreshToken: string
}
