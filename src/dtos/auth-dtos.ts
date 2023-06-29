export interface LoginRequestDto {
  email: string
  password: string
}

export interface LoginResponseDto {
  token: string
  refreshToken: string
}

export interface RefreshTokenRequestDto {
  refreshToken: string
}
