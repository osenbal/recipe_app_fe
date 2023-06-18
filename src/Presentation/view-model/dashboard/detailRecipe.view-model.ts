import {useEffect, useState, useCallback} from 'react';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import {IRecipe} from '@domain/entity/recipe/structures/GetRecipeById';
import RecipeUsecase from '@domain/interactors/recipe/RecipeUsecase';
import FavoriteUsecase from '@domain/interactors/favorite/FavoriteUsecase';
import FavoriteAPI from '@data/favorite/FavoriteAPI';
import RecipeAPI from '@data/recipe/RecipeAPI';

const DetailRecipeViewModel = () => {
  const route = useRoute();
  const favorite = new FavoriteUsecase(new FavoriteAPI());
  const {recipeId} = route.params as {recipeId: number};

  const recipeUsecase = new RecipeUsecase(new RecipeAPI());

  const [recipe, setRecipe] = useState<IRecipe | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<'ingredient' | 'procedure'>('ingredient'); // ['ingredient', 'procedure']

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
    } catch (error) {
      throw new Error('Error');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      if (isActive) {
        Promise.all([getRecipeById(recipeId)]);
      }

      return () => {
        isActive = false;
      };
    }, []),
  );

  // useEffect(() => {
  //   getRecipeById(recipeId);
  // }, []);

  return {
    recipe,
    setRecipe,
    loading,
    setLoading,
    tab,
    setTab,
    handleAddFavorite,
    handleRemoveFavorite,
  };
};

export default DetailRecipeViewModel;
