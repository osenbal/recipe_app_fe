import {useState, useRef, useMemo, useCallback, useEffect} from 'react';
import {Alert} from 'react-native';
import RecipeUsecase from '@domain/interactors/recipe/RecipeUsecase';
import RecipeAPI from '@data/recipe/RecipeAPI';
import BottomSheet from '@gorhom/bottom-sheet';
import {BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SearchViewModel = () => {
  const navigation = useNavigation();
  const recipeUsecase = new RecipeUsecase(new RecipeAPI());

  const filterTimeData = ['newest', 'oldest'];

  const [searchText, setSearchText] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any[]>([]);

  const [categories, setCategories] = useState<any[]>([]);
  const [dish, setDish] = useState<any[]>([]);

  const [filterTime, setFilterTime] = useState<'newest' | 'oldest'>('newest');
  const [filterCategory, setFilterCategory] = useState<number | undefined>(
    undefined,
  );
  const [filterDish, setFilterDish] = useState<number | undefined>(undefined);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '70%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      bottomSheetRef.current?.close();
    }
  }, []);

  const handleSearch = () => {
    recipeUsecase
      .getFilterRecipe(
        searchText,
        filterCategory,
        filterDish,
        undefined,
        filterTime,
      )
      .then(response => {
        setSearchResult(response?.body?.data || []);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleFilter = () => {
    recipeUsecase
      .getFilterRecipe(
        searchText,
        filterCategory,
        filterDish,
        undefined,
        filterTime,
      )
      .then(response => {
        setSearchResult(response?.body?.data || []);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => bottomSheetRef.current?.close());
  };

  const getListCategoryRecipe = async () => {
    try {
      const response = await recipeUsecase.getListCategoryRecipe();
      setCategories(response?.body?.data || []);
    } catch (error) {
      console.log(error);
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

  const handleBackAction = () => {
    const backAction = () => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current?.close();
      }

      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }

      Alert.alert(
        'Exit App',
        'Exiting the application?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  };

  useEffect(() => {
    getListCategoryRecipe();
    getListDishRecipe();
  }, []);

  return {
    searchText,
    setSearchText,
    searchResult,
    handleSearch,
    bottomSheetRef,
    snapPoints,
    handleSheetChanges,
    handleBackAction,
    filterTimeData,
    filterTime,
    setFilterTime,
    categories,
    filterCategory,
    setFilterCategory,
    dish,
    filterDish,
    setFilterDish,
    handleFilter,
  };
};

export default SearchViewModel;
