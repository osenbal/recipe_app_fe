export interface ILoginResponse {
  status: number;
  message: string;
  body?: ILoginSuccess;
}

interface ILoginSuccess {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  role: {
    id: number;
    title: string;
  };
}
