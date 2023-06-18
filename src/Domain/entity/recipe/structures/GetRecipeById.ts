import {IChef} from './GetRecipes';
export interface IGetRecipeByIdResponse {
  status: number;
  message: string;
  body?: {
    data?: IRecipe;
  };
}

export interface IRecipe {
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

  recipe_ingredient: IIngredient[];
  recipe_instruction: IInstruction[];

  chef: IChef;

  favorite: any;

  is_favorite: boolean;
}

interface IIngredient {
  id: number;
  name: string;
  img_url: string;
  quantity_detail: [
    {
      quantity: number;
      unit_measurment: IUnit;
    },
  ];
}

interface IInstruction {
  id: number;
  recipe_id: number;
  description: string;
  order: number;
}

export interface IUnit {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
