import {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {IRecipe} from '@domain/entity/recipe/structures/GetRecipeById';
import RecipeUsecase from '@domain/interactors/recipe/RecipeUsecase';
import RecipeAPI from '@data/recipe/RecipeAPI';

const DetailRecipeViewModel = () => {
  const route = useRoute();
  const {recipeId} = route.params as {recipeId: number};

  const recipeUsecase = new RecipeUsecase(new RecipeAPI());

  const [recipe, setRecipe] = useState<IRecipe | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getRecipeById = async (recipe_id: number) => {
    try {
      setLoading(true);
      const response = await recipeUsecase.getRecipeById(recipe_id);
      setRecipe(response?.body?.data);
    } catch (error) {
      throw new Error('Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipeById(recipeId);
  }, []);

  return {
    recipe,
    setRecipe,
    loading,
    setLoading,
  };
};

export default DetailRecipeViewModel;
