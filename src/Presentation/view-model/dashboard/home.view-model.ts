import React, {useEffect} from 'react';
import RecipeUsecase from '@domain/interactors/recipe/RecipeUsecase';
import RecipeAPI from '@data/recipe/RecipeAPI';
import {useAuthContext} from '@presentation/context/auth.context';
import {ICategory} from '@domain/entity/recipe/structures/GetCategoryRecipe';
import {useNavigation} from '@react-navigation/native';
// import {IGetCategoryRecipe} from '@domain/entity/recipe/structures/GetCategoryRecipe';

const HomeViewModel = () => {
  const navigation = useNavigation();
  const recipeUsecase = new RecipeUsecase(new RecipeAPI());

  const {user, isAuthenticated} = useAuthContext();
  const [searchFocus, setSearchFocus] = React.useState(false);
  const [searchText, setSearchText] = React.useState<string>('');
  const [recipes, setRecipes] = React.useState<any[]>([]);
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [filterActive, setFilterActive] = React.useState('');
  const [filters, setFilters] = React.useState([
    'alll',
    'breakfast',
    'lunch',
    'shakes',
    'dinner',
  ]);

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
      setRecipes(response?.body?.data || []);
    } catch (error) {
      console.log(error);
      throw error;
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

  const handleFavoriteRecipe = (id: string) => {};

  useEffect(() => {
    getRecipes();
    getListCategoryRecipe();
  }, []);

  return {
    filterActive,
    filters,
    handleFilterCategory,
    handleFavoriteRecipe,
    recipes,
    isAuthenticated,
    user,
    categories,
    searchFocus,
    setSearchFocus,
    handleSearchRecipe,
    searchText,
    setSearchText,
  };
};

export default HomeViewModel;
