import IUserRepository from '@domain/repository/user/UserRepository';

export default class UserUsecase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getUser() {
    try {
      const response = await this.userRepository.getUser();
      return response;
    } catch (error) {
      throw new Error('Error');
    }
  }
}
