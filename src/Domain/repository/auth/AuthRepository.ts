import {IRegisterResponse} from '@domain/entity/auth/structures/RegisterResponse';
import {ILoginResponse} from '@domain/entity/auth/structures/LoginResponse';

export default interface IAuthRepository {
  register: (email: string, password: string) => Promise<IRegisterResponse>;
  login: (email: string, password: string) => Promise<ILoginResponse>;
  logout: () => Promise<any>;
}
