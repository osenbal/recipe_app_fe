import {
  IGetFavoriteResponse,
  IAddFavoriteResponse,
} from '@domain/entity/favorite/structures/GetFavorite';
import IFavoriteRepository from '@domain/repository/favorite/FavoriteRepository';
import axios from '../API/axios';

export default class FavoriteAPI implements IFavoriteRepository {
  async getListFavorite(): Promise<IGetFavoriteResponse> {
    try {
      const response = await axios.get('/favorite');
      return response.data;
    } catch (error) {
      throw new Error('Error');
    }
  }

  async addFavorite(recipeId: number): Promise<IAddFavoriteResponse> {
    try {
      const response = await axios.post('/favorite', {
        recipe_id: recipeId,
      });
      return response.data;
    } catch (error) {
      throw new Error('Error');
    }
  }

  async deleteFavorite(recipeId: number): Promise<IAddFavoriteResponse> {
    try {
      const response = await axios.delete(`/favorite`, {
        data: {
          recipe_id: recipeId,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error');
    }
  }
}
