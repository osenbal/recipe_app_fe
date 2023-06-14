export interface IGetDishRecipe {
  status: number;
  message: string;
  body?: {
    data: IDish[];
  };
}

export interface IDish {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
