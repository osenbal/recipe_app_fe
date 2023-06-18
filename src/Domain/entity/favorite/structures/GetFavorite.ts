import {IRecipeResponseBody} from '@domain/entity/recipe/structures/GetRecipes';

export interface IGetFavoriteResponse {
  status: number;
  message: string;
  body?: {
    data: IFavorite[];
  };
}

export interface IFavorite {
  id: number;
  recipe_id: number;
  user_id: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;

  recipe: IRecipeResponseBody;
}

export interface IFavoriteEntity {
  id: number;
  recipe_id: number;
  user_id: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface IAddFavoriteResponse {
  status: number;
  message: string;
  body?: {
    data: IFavoriteEntity;
  };
}
