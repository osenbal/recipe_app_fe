import INutritionRepository from '@domain/repository/nutrition/NutritionRepository';

export default class NutritionUsecase {
  nutritionRepository: INutritionRepository;

  constructor(nutritionRepository: INutritionRepository) {
    this.nutritionRepository = nutritionRepository;
  }

  async getNutritionFromIngredients(ingredients: string[]): Promise<any> {
    try {
      const response =
        await this.nutritionRepository.getNutritionFromIngredients(ingredients);
      return response;
    } catch (error) {
      throw new Error('Error');
    }
  }
}
