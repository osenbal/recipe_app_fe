import axios from 'axios';

import INutritionRepository from '@domain/repository/nutrition/NutritionRepository';
import {
  REACT_APP_EDAMAM_API_URL,
  REACT_APP_EDAMAM_APP_ID,
  REACT_APP_EDAMAM_APP_KEY,
} from '@env';

export default class NutritionAPI implements INutritionRepository {
  async getNutritionFromIngredients(ingredients: string[]): Promise<any> {
    const params = {
      app_id: REACT_APP_EDAMAM_APP_ID,
      app_key: REACT_APP_EDAMAM_APP_KEY,
      beta: false,
    };
    const apiUrl = REACT_APP_EDAMAM_API_URL + '/nutrition-details';
    const body = {
      ingr: ingredients,
    };
    try {
      const response = await axios.post(apiUrl, body, {params});
      return response.data;
    } catch (error) {
      throw new Error('Error');
    }
  }
}
