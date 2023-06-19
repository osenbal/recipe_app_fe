import {useEffect, useState, useCallback, useRef} from 'react';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import {
  IRecipe,
  IIngredient,
} from '@domain/entity/recipe/structures/GetRecipeById';
import RecipeUsecase from '@domain/interactors/recipe/RecipeUsecase';
import FavoriteUsecase from '@domain/interactors/favorite/FavoriteUsecase';
import FavoriteAPI from '@data/favorite/FavoriteAPI';
import RecipeAPI from '@data/recipe/RecipeAPI';
import {useAuthContext} from '@presentation/context/auth.context';
import NutritionAPI from '@data/nutrition/NutritionAPI';
import NutritionUsecase from '@domain/interactors/nutrition/NutritionUsecase';

const DetailRecipeViewModel = () => {
  const route = useRoute();
  const {recipeId} = route.params as {recipeId: number};

  const favorite = new FavoriteUsecase(new FavoriteAPI());
  const recipeUsecase = new RecipeUsecase(new RecipeAPI());
  const nutritionUsecase = new NutritionUsecase(new NutritionAPI());

  const {user, isAuthenticated} = useAuthContext();

  const [recipe, setRecipe] = useState<IRecipe | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<'ingredient' | 'procedure'>('ingredient'); // ['ingredient', 'procedure']
  const [nutrions, setNutrions] = useState<any>(null);

  const handleToggleFavorite = () => {
    if (recipe?.is_favorite) {
      handleRemoveFavorite();
    } else {
      handleAddFavorite();
    }
  };

  const handleAddFavorite = () => {
    try {
      favorite.addFavorite(recipeId).then(() => {
        setRecipe((prev: any) => {
          return {
            ...prev,
            is_favorite: true,
          };
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFavorite = () => {
    try {
      favorite.deleteFavorite(recipeId).then(() => {
        setRecipe((prev: any) => {
          return {
            ...prev,
            is_favorite: false,
          };
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getRecipeById = async (recipe_id: number) => {
    try {
      setLoading(true);
      const response = await recipeUsecase.getRecipeById(recipe_id);
      setRecipe(response?.body?.data);

      return response;
    } catch (error) {
      throw new Error('Error');
    } finally {
      setLoading(false);
    }
  };

  const getNutrition = async (ingredients: IIngredient[]) => {
    const ingredientsName = ingredients.map(ingredient => {
      return `${ingredient?.quantity_detail[0]?.quantity || ''} ${
        ingredient?.quantity_detail[0]?.unit_measurment?.name || ''
      } ${ingredient?.name || ''}`;
    });

    await nutritionUsecase
      .getNutritionFromIngredients(ingredientsName)
      .then(response => {
        setNutrions(response);
      });
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      if (isActive) {
        getRecipeById(recipeId).then(response => {
          if (response?.body?.data?.recipe_ingredient != undefined) {
            getNutrition(response?.body?.data?.recipe_ingredient);
          }
        });
      }

      return () => {
        isActive = false;
      };
    }, []),
  );

  return {
    recipe,
    setRecipe,
    loading,
    setLoading,
    tab,
    setTab,
    handleAddFavorite,
    handleRemoveFavorite,
    isAuthenticated,
    handleToggleFavorite,
    nutrions,
  };
};

export default DetailRecipeViewModel;
