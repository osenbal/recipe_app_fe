export interface IGetCategoryRecipe {
  status: number;
  message: string;
  body?: {
    data: ICategory[];
  };
}

export interface ICategory {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
