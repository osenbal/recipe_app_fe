export default interface INutritionRepository {
  getNutritionFromIngredients: (ingredients: string[]) => Promise<any>;
}
