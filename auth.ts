// Strict interfaces describing DummyJSON's /auth/login request & response shape.

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

export interface AuthUser {
  id: number
  username: string
  firstName: string
  lastName: string
  image: string
}
