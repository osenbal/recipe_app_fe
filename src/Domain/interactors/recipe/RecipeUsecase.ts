import IRecipeRepository from '@domain/repository/recipe/RecipeRepository';

export default class RecipeUsecase {
  recipeRepository: IRecipeRepository;

  constructor(recipeRepository: IRecipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async getRecipes() {
    return await this.recipeRepository.getRecipes();
  }

  async getListCategoryRecipe() {
    return await this.recipeRepository.getListCategoryRecipe();
  }

  async getListDishRecipe() {
    return await this.recipeRepository.getListDishRecipe();
  }

  async getFilterRecipe(
    search?: string,
    category_id?: number,
    dish_id?: number,
    chef_id?: number,
    filterTime?: string,
  ) {
    return await this.recipeRepository.getFilterRecipe(
      search,
      category_id,
      dish_id,
      chef_id,
      filterTime,
    );
  }

  async getSearchRecipe(search: string) {
    return await this.recipeRepository.getSearchRecipe(search);
  }

  async getRecipeById(recipe_id: number) {
    return await this.recipeRepository.getRecipeById(recipe_id);
  }

  async getListUnit() {
    return await this.recipeRepository.getListUnit();
  }

  async getListIngredient() {
    return await this.recipeRepository.getListIngredient();
  }

  async addRecipe(formData: any) {
    return await this.recipeRepository.addRecipe(formData);
  }
}
