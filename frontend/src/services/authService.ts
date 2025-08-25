import api from "./api"

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post("/auth/login", credentials)
    return response.data
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post("/auth/register", userData)
    return response.data
  },

  async getCurrentUser() {
    const response = await api.get("/auth/me")
    return response.data
  },

  async logout() {
    // Clear token from localStorage (handled by auth context)
    return Promise.resolve()
  },
}
