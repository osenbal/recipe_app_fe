import {ILoginResponse} from '@domain/entity/auth/structures/LoginResponse';
import {IRegisterResponse} from '@domain/entity/auth/structures/RegisterResponse';
import IAuthRepository from '@domain/repository/auth/AuthRepository';
import {REACT_APP_API_URL} from '@env';

export default class AuthAPI implements IAuthRepository {
  async register(
    email: string,
    password: string,
    type: number,
  ): Promise<IRegisterResponse> {
    try {
      return await fetch(`${REACT_APP_API_URL}/auth/user/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email,
          password,
          type,
        }),
      }).then(response => response.json());
    } catch (error) {
      throw new Error('Error');
    }
  }

  async login(email: string, password: string): Promise<ILoginResponse> {
    try {
      return await fetch(`${REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email,
          password,
        }),
      }).then(response => response.json());
    } catch (error: any) {
      throw new Error(error);
    }
  }

  logout(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
