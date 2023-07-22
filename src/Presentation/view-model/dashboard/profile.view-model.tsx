import {useEffect, useState, useCallback} from 'react';
import AsyncStorageService from '@presentation/storage/asyncStorage';
import {useAuthContext} from '@presentation/context/auth.context';
import {useNavigation} from '@react-navigation/native';
import RecipeUsecase from '@domain/interactors/recipe/RecipeUsecase';
import RecipeAPI from '@data/recipe/RecipeAPI';
import {IRecipeResponseBody} from '@domain/entity/recipe/structures/GetRecipes';
import {ToastAndroid} from 'react-native';

const ProfileViewModel = () => {
  const navigation = useNavigation();
  const recipeUsecase = new RecipeUsecase(new RecipeAPI());

  const {setIsAuthenticated, setUser, user, isAuthenticated} = useAuthContext();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showModalOption, setShowModalOption] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<IRecipeResponseBody[]>([]);

  const toggleModalOption = () => {
    setShowModalOption(!showModalOption);
  };

  const handleLogout = async () => {
    setIsAuthenticated(false),
      setUser(null),
      await Promise.all([
        AsyncStorageService.removeItem('@accessToken'),
        AsyncStorageService.removeItem('@refreshToken'),
        AsyncStorageService.removeItem('@role'),
      ]).then(() => {
        navigation.navigate('Login' as never);
      });
  };

  const getAllRecipeChef = async () => {
    console.log('Test get all recipe chef: ', user?.role.title);
    if (user?.role.title === 'chef') {
      const responseMyRecipe = await recipeUsecase.getFilterRecipe(
        undefined,
        undefined,
        undefined,
        user.id,
        undefined,
      );

      console.log(responseMyRecipe);

      if (responseMyRecipe.body?.data && responseMyRecipe.status === 200) {
        setRecipes(responseMyRecipe.body.data);
      }
    }
  };

  const onDeleteRecipe = async (recipeId: number) => {
    const responseDeleteRecipe = await recipeUsecase.deleteRecipe(recipeId);

    if (responseDeleteRecipe.status === 200) {
      getAllRecipeChef();
      ToastAndroid.show('Recipe deleted', ToastAndroid.SHORT);
      return;
    }

    ToastAndroid.show('Failed to delete recipe', ToastAndroid.SHORT);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      Promise.all([getAllRecipeChef()]).finally(() => {
        setRefreshing(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllRecipeChef();
  }, []);

  return {
    isEdit,
    setIsEdit,
    showModalOption,
    setShowModalOption,
    toggleModalOption,
    handleLogout,
    user,
    isAuthenticated,
    onRefresh,
    recipes,
    refreshing,
    onDeleteRecipe,
  };
};

export default ProfileViewModel;
