export interface IGetIngredientsResponse {
  status: number;
  message: string;
  body?: IIngredientsResponseBody;
}

interface IIngredientsResponseBody {
  data: IIngredient[];
}

export interface IIngredient {
  id: number;
  name: string;
  img_url: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
