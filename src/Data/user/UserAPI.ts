import IUserRepository from '@domain/repository/user/UserRepository';
import axios from '../API/axios';

export default class UserAPI implements IUserRepository {
  async getUser() {
    try {
      const response = await axios.get('/user/me');
      return response.data;
    } catch (error) {
      throw new Error('Error');
    }
  }
}
