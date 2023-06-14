import {IGetRecipesResponse} from '@domain/entity/recipe/structures/GetRecipes';
import {IGetCategoryRecipe} from '@domain/entity/recipe/structures/GetCategoryRecipe';
import {IGetRecipeByIdResponse} from '@domain/entity/recipe/structures/GetRecipeById';
import {IGetDishRecipe} from '@domain/entity/recipe/structures/GetDishRecipe';

export default interface IRecipeRepository {
  getRecipes: () => Promise<IGetRecipesResponse>;
  getListCategoryRecipe: () => Promise<IGetCategoryRecipe>;
  getListDishRecipe: () => Promise<IGetDishRecipe>;
  getFilterRecipe: (
    search?: string,
    category_id?: number,
    dish_id?: number,
    chef_id?: number,
    filterTime?: string,
  ) => Promise<IGetRecipesResponse>;
  getSearchRecipe: (search: string) => Promise<IGetRecipesResponse>;
  getRecipeById: (recipe_id: number) => Promise<IGetRecipeByIdResponse>;
}
