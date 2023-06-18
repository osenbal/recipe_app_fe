import {useState, useCallback, useMemo, useRef} from 'react';
import {BackHandler} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import RecipeUsecase from '@domain/interactors/recipe/RecipeUsecase';
import RecipeAPI from '@data/recipe/RecipeAPI';
import {useAuthContext} from '@presentation/context/auth.context';
import {ICategory} from '@domain/entity/recipe/structures/GetCategoryRecipe';
import {useNavigation} from '@react-navigation/native';
import FavoriteUsecase from '@domain/interactors/favorite/FavoriteUsecase';
import FavoriteAPI from '@data/favorite/FavoriteAPI';
import BottomSheet from '@gorhom/bottom-sheet';
import {IRecipeResponseBody} from '@domain/entity/recipe/structures/GetRecipes';

const HomeViewModel = () => {
  const navigation = useNavigation();
  const recipeUsecase = new RecipeUsecase(new RecipeAPI());
  const favoriteUsecase = new FavoriteUsecase(new FavoriteAPI());

  const filterTimeData = ['newest', 'oldest'];

  const {user, isAuthenticated} = useAuthContext();

  const [showModalFilter, setShowModalFilter] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const [recipes, setRecipes] = useState<IRecipeResponseBody[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filterActive, setFilterActive] = useState('');
  const [filterCategory, setFilterCategory] = useState<number | undefined>(
    undefined,
  );
  const [filterDish, setFilterDish] = useState<number | undefined>(undefined);
  const [dish, setDish] = useState<any[]>([]);
  const [filterTime, setFilterTime] = useState<'newest' | 'oldest'>('newest');

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '70%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      bottomSheetRef.current?.close();
      setShowModalFilter(false);
    }
  }, []);

  const handleFilterCategory = async (category: ICategory) => {
    const newRecipes = await recipeUsecase.getFilterRecipe(
      undefined,
      category.id,
    );
    setRecipes(newRecipes?.body?.data || []);
    setFilterActive(category.name);
  };

  const getRecipes = async () => {
    try {
      const response = await recipeUsecase.getRecipes();
      console.log('LIST RECIPE : ', response.body?.data[0].is_favorite);
      setRecipes(response?.body?.data || []);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getListDishRecipe = async () => {
    try {
      const response = await recipeUsecase.getListDishRecipe();
      setDish(response?.body?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getListCategoryRecipe = async () => {
    try {
      const response = await recipeUsecase.getListCategoryRecipe();

      if (response?.body?.data?.length === 0) {
        return;
      }

      setCategories(response?.body?.data || []);
      setCategories(prev => [{id: 0, name: 'all'}, ...prev]);
      setFilterActive('all');
      console.log('CATEGORIES : ', response);
    } catch (error) {}
  };

  const handleFilter = () => {
    recipeUsecase
      .getFilterRecipe(
        undefined,
        filterCategory,
        filterDish,
        undefined,
        filterTime,
      )
      .then(response => {
        setRecipes(response?.body?.data || []);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setShowModalFilter(false));
  };

  const handleSearchRecipe = () => {
    recipeUsecase
      .getSearchRecipe(searchText)
      .then(response => {
        console.log('SEARCH : ', response);
        setRecipes(response?.body?.data || []);
        navigation.navigate(
          'Search' as never,
          {
            recipes: response?.body?.data || [],
            search: searchText,
          } as never,
        );
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  };

  const handleAddFavorite = (recipe_id: number) => {
    try {
      favoriteUsecase.addFavorite(recipe_id).then(response => {
        console.log('ADD FAVORITE : ', response);
        const newRecipe = recipes.map(item => {
          if (item.id === recipe_id) {
            return {
              ...item,
              is_favorite: true,
            };
          }

          return item;
        });
        setRecipes([...newRecipe]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFavorite = (recipe_id: number) => {
    try {
      favoriteUsecase.deleteFavorite(recipe_id).then(response => {
        console.log('DELETE FAVORITE : ', response);
        const newRecipe = recipes.map(item => {
          if (item.id === recipe_id) {
            return {
              ...item,
              is_favorite: false,
            };
          }

          return item;
        });
        setRecipes([...newRecipe]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      Promise.all([
        getRecipes(),
        getListCategoryRecipe(),
        getListDishRecipe(),
      ]).finally(() => {
        setRefreshing(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleBackAction = () => {
    const backAction = () => {
      bottomSheetRef.current?.close();
      setShowModalFilter(false);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      if (isActive) {
        Promise.all([
          getRecipes(),
          getListCategoryRecipe(),
          getListDishRecipe(),
        ]);
      }

      return () => {
        isActive = false;
      };
    }, []),
  );

  return {
    bottomSheetRef,
    handleSheetChanges,
    snapPoints,
    filterActive,
    handleFilterCategory,
    getRecipes,
    recipes,
    setRecipes,
    isAuthenticated,
    user,
    categories,
    searchFocus,
    setSearchFocus,
    handleSearchRecipe,
    searchText,
    setSearchText,
    onRefresh,
    refreshing,
    handleAddFavorite,
    handleRemoveFavorite,
    getListCategoryRecipe,
    showModalFilter,
    setShowModalFilter,
    filterTime,
    filterCategory,
    filterDish,
    filterTimeData,
    setFilterTime,
    setFilterCategory,
    setFilterDish,
    handleFilter,
    dish,
    handleBackAction,
  };
};

export default HomeViewModel;
