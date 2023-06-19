export interface IGetUserResponse {
  status: number;
  message: string;
  body?: IGetUserResponseBody;
}

interface IGetUserResponseBody {
  user: IUser;
}

export interface IUser {
  id: number;
  email: string;
  role_id: number;
  role: IRole;
  user_id: number;
  profile_url: string;
  name: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

interface IRole {
  id: number;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

interface IChef {
  id: number;
  user_id: number;
  name: string;
  profile_url: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

interface ICommonUser {
  id: number;
  user_id: number;
  name: string;
  profile_url: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export const ROLE = {
  ADMIN: 1,
  CHEF: 2,
  COMMON_USER: 3,
};
