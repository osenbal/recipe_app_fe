import {useState, useRef, useMemo, useCallback, useEffect} from 'react';
import RecipeUsecase from '@domain/interactors/recipe/RecipeUsecase';
import RecipeAPI from '@data/recipe/RecipeAPI';
import BottomSheet from '@gorhom/bottom-sheet';
import {BackHandler} from 'react-native';

const SearchViewModel = () => {
  const recipeUsecase = new RecipeUsecase(new RecipeAPI());

  const filterTimeData = ['newest', 'oldest'];

  const [searchText, setSearchText] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [showModalFilter, setShowModalFilter] = useState<boolean>(false);

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
      setShowModalFilter(false);
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
      .finally(() => setShowModalFilter(false));
  };

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

  useEffect(() => {
    getListCategoryRecipe();
    getListDishRecipe();
  }, []);

  return {
    searchText,
    setSearchText,
    searchResult,
    handleSearch,
    showModalFilter,
    setShowModalFilter,
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
