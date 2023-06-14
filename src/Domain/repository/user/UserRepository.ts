import {IGetUserResponse} from '@domain/entity/user/structures/GetUserResponse';

export default interface IUserRepository {
  getUser: () => Promise<IGetUserResponse>;
}
