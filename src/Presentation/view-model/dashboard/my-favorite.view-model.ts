import {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import FavoriteAPI from '@data/favorite/FavoriteAPI';
import FavoriteUsecase from '@domain/interactors/favorite/FavoriteUsecase';
import {IFavorite} from '@domain/entity/favorite/structures/GetFavorite';
import {useAuthContext} from '@presentation/context/auth.context';

const MyFavoriteViewModel = () => {
  const favoriteRepository = new FavoriteUsecase(new FavoriteAPI());
  const {user, isAuthenticated} = useAuthContext();

  const [myFavorite, setMyFavorite] = useState<IFavorite[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getListFavorite = async () => {
    try {
      const response = await favoriteRepository.getListFavorite();
      console.log('FAVORITE : ', response);
      setMyFavorite(response.body?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async (recipeId: number) => {
    try {
      await favoriteRepository.deleteFavorite(recipeId);
      const newFavorite = myFavorite.filter(
        item => item.recipe_id !== recipeId,
      );
      setMyFavorite(newFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await getListFavorite().finally(() => {
        setRefreshing(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      if (isActive) {
        getListFavorite();
      }

      return () => {
        isActive = false;
      };
    }, []),
  );

  return {
    myFavorite,
    setMyFavorite,
    user,
    isAuthenticated,
    removeFavorite,
    refreshing,
    setRefreshing,
    onRefresh,
  };
};

export default MyFavoriteViewModel;
