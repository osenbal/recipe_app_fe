import IAuthRepository from '@domain/repository/auth/AuthRepository';
import {ILoginResponse} from '@domain/entity/auth/structures/LoginResponse';
import {validateEmail, validatePassword} from '@utils/ValidationCredential';

export default class LoginUsecase {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(email: string, password: string): Promise<ILoginResponse> {
    if (!validateEmail(email)) {
      throw new Error('Email is not valid');
    }

    const loginResponse = await this.authRepository.login(email, password);
    return loginResponse;
  }
}
