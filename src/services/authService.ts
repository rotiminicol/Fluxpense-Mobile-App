
import { api } from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  authToken: string;
  user: {
    id: number;
    name: string;
    email: string;
    account_type: string;
    onboarding_complete: boolean;
    profile_image?: string;
    created_at: string;
  };
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.apiRequest(`${api.AUTH_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: api.createHeaders(),
      body: JSON.stringify(credentials),
    });
    
    return response;
  },

  async signup(userData: SignupRequest): Promise<AuthResponse> {
    const response = await api.apiRequest(`${api.AUTH_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: api.createHeaders(),
      body: JSON.stringify(userData),
    });
    
    return response;
  },

  async me(): Promise<AuthResponse['user']> {
    const response = await api.apiRequest(`${api.AUTH_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: api.createHeaders(true),
    });
    
    return response;
  }
};
