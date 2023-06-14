import IRecipeRepository from '@domain/repository/recipe/RecipeRepository';
import {IGetRecipesResponse} from '@domain/entity/recipe/structures/GetRecipes';
import {IGetCategoryRecipe} from '@domain/entity/recipe/structures/GetCategoryRecipe';
import {IGetRecipeByIdResponse} from '@domain/entity/recipe/structures/GetRecipeById';
import {IGetDishRecipe} from '@domain/entity/recipe/structures/GetDishRecipe';
import axios from '../API/axios';

export default class RecipeAPI implements IRecipeRepository {
  async getRecipes(): Promise<IGetRecipesResponse> {
    try {
      const response = await axios.get('/recipe');
      return response.data;
    } catch (error) {
      throw new Error('Error');
    }
  }

  async getListCategoryRecipe(): Promise<IGetCategoryRecipe> {
    try {
      const response = await axios.get('/recipe/category');
      return response.data;
    } catch (error) {
      throw new Error('Error');
    }
  }

  async getFilterRecipe(
    search?: string,
    category_id?: number,
    dish_id?: number,
    chef_id?: number,
    filterTime?: string,
  ): Promise<IGetRecipesResponse> {
    try {
      const queryParam = {};
      if (search !== undefined) {
        Object.assign(queryParam, {search});
      }
      if (category_id !== undefined) {
        Object.assign(queryParam, {category_id});
      }
      if (dish_id !== undefined) {
        Object.assign(queryParam, {dish_id});
      }
      if (chef_id !== undefined) {
        Object.assign(queryParam, {chef_id});
      }
      if (filterTime !== undefined) {
        Object.assign(queryParam, {filterTime});
      }

      console.log('QUERY PARAM : ', queryParam);

      const response = await axios.get('/recipe/filter', {
        params: queryParam,
      });

      return response.data;
    } catch (error) {
      throw new Error('Error');
    }
  }

  async getSearchRecipe(search: string): Promise<IGetRecipesResponse> {
    try {
      const response = await axios.get(`/recipe/filter?search=${search}`);
      return response.data;
    } catch (error) {
      throw new Error('Error');
    }
  }

  async getRecipeById(recipe_id: number): Promise<IGetRecipeByIdResponse> {
    try {
      const response = await axios.get(`/recipe/${recipe_id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error');
    }
  }

  async getListDishRecipe(): Promise<IGetDishRecipe> {
    try {
      const response = await axios.get('/recipe/dish');
      return response.data;
    } catch (error) {
      throw new Error('Error');
    }
  }
}
