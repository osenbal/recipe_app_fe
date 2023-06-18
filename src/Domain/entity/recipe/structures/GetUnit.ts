export interface IGetUnitResponse {
  status: number;
  message: string;
  body?: IUnitResponseBody;
}

interface IUnitResponseBody {
  data: IUnit[];
}

interface IUnit {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
