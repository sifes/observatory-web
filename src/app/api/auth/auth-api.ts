import { instance } from '../instance';
import { AuthResponse, LoginBody, RegisterBody } from './auth-api.types';
import { User } from '@/lib/types/auth.types';

class AuthApi {
  async register(body: RegisterBody) {
    return await instance.post<AuthResponse>(
      '/Authentification/register',
      body
    );
  }

  async login(body: LoginBody) {
    return await instance.post<AuthResponse>('/Authentification/login', body);
  }

  async getMe() {
    return await instance.get<User>('/Authentification/GetMe');
  }
}

export const authApi = new AuthApi();
