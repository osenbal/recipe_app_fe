import IAuthRepository from '@domain/repository/auth/AuthRepository';
import {validateEmail} from '@utils/ValidationCredential';
import {IRegisterResponse} from '@domain/entity/auth/structures/RegisterResponse';
export default class RegisterUsecase {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(
    email: string,
    password: string,
    type: number,
  ): Promise<IRegisterResponse> {
    if (!validateEmail(email)) {
      throw new Error('Email is not valid');
    }

    const registerResponse = await this.authRepository.register(
      email,
      password,
      type,
    );
    return registerResponse;
  }
}
