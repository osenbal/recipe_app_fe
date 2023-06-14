import {ICategory} from './GetCategoryRecipe';

export interface IGetRecipesResponse {
  status: number;
  message: string;
  body?: IRecipesResponseBody;
}

interface IRecipesResponseBody {
  data: IRecipeResponseBody[];
}

export interface IRecipeResponseBody {
  id: number;
  chef_id: number;
  category_id: number;
  dish_id: number;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string | null;
  cookingTime: number;
  prepTime: number;
  serving: number;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;

  chef: IChef;
  category: ICategory;
  dish: IDish;

  favorite: any;
  is_favorite: boolean;
}

export interface IDish {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface IChef {
  id: number;
  name: string;
  profile_url: string;
  user: IUser;
}

export interface IUser {
  id: number;
  email: string;
  role_id: number;
}
