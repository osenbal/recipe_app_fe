import React, {useState, useCallback, useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RecipeAPI from '@data/recipe/RecipeAPI';
import RecipeUsecase from '@domain/interactors/recipe/RecipeUsecase';
import NutritionAPI from '@data/nutrition/NutritionAPI';
import NutritionUsecase from '@domain/interactors/nutrition/NutritionUsecase';

import {useFocusEffect} from '@react-navigation/native';
import {IUnit} from '@domain/entity/recipe/structures/GetRecipeById';
import {IIngredient} from '@domain/entity/recipe/structures/GetIngredient';
import {Platform} from 'react-native';

const AddRecipeViewModel = () => {
  const recipeUsecase = new RecipeUsecase(new RecipeAPI());
  const nutritionUsecase = new NutritionUsecase(new NutritionAPI());

  const [listUnit, setListUnit] = useState<Array<IUnit>>([]); // ['unit', 'unit'
  const [listIngredient, setListIngredient] = useState<Array<IIngredient>>([]); // ['ingredient', 'ingredient'
  const [listCategory, setListCategory] = useState<Array<{}>>([]);
  const [listDish, setListDish] = useState<Array<{}>>([]);
  const [modalInput, setModalInput] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<any>(null);
  const [tab, setTab] = useState<'ingredient' | 'procedure'>('ingredient'); // ['ingredient', 'procedure']
  const [ingredients, setIngredients] = useState<
    Array<{
      ingredient_id: number | null;
      quantity: number | null;
      unit_id: number | null;
      unit_name: string;
      ingredient_name: string;
    }>
  >([]);
  const [instructions, setInstructions] = useState<Array<string>>(['', '']);
  const [category, setCategory] = useState<number | null>(null);
  const [dish, setDish] = useState<number | null>(null);
  const [data, setData] = useState<{
    title: string;
    description: string;
    video_url: string;
    cookingTime: string;
    prepTime: string;
    serving: string;
  }>({
    title: '',
    description: '',
    video_url: '',
    cookingTime: '',
    prepTime: '',
    serving: '',
  });
  const [nutrition, setNutrition] = useState<{
    calories: string;
    protein: string;
    carbs: string;
    sugar: string;
  }>({
    calories: '',
    protein: '',
    carbs: '',
    sugar: '',
  });

  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
        videoQuality: 'high',
        quality: 1,
      },
      (response: any) => {
        console.log(response);
        if (response.didCancel) {
          return;
        } else if (response.errorCode) {
          return;
        } else if (response.errorMessage) {
          return;
        } else if (response?.assets[0]?.uri) {
          setThumbnail(response.assets[0].uri);
        }
      },
    );
    setModalInput(false);
  };

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      async (response: any) => {
        if (response.didCancel) {
          return;
        } else if (response.errorCode) {
          return;
        } else if (response.errorMessage) {
          return;
        } else if (response?.assets[0]?.uri) {
          const file = {
            uri:
              Platform.OS === 'ios'
                ? response.assets[0].uri.replace('file://', '')
                : response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };
          setThumbnail(file);
        }
      },
    );

    setModalInput(false);
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        ingredient_id: null,
        quantity: null,
        unit_id: null,
        unit_name: '',
        ingredient_name: '',
      },
    ]);
  };

  const deleteIngredient = (index: number) => {
    const newIngredients = ingredients.filter((ingredient, i) => i !== index);
    setIngredients(newIngredients);
  };

  const addInstruction = () => {
    setInstructions((prev: string[]) => [...prev, '']);
  };

  const deleteInstruction = (index: number) => {
    const newInstructions = instructions.filter(
      (instruction, i) => i !== index,
    );
    setInstructions(newInstructions);
  };

  const getListCategory = async () => {
    try {
      const response = await recipeUsecase.getListCategoryRecipe();
      setListCategory(response.body?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getListDish = async () => {
    try {
      const response = await recipeUsecase.getListDishRecipe();
      setListDish(response.body?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getListIngredient = async () => {
    try {
      const response = await recipeUsecase.getListIngredient();
      setListIngredient(response.body?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getListUnit = async () => {
    try {
      const response = await recipeUsecase.getListUnit();
      setListUnit(response.body?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateRecipe = async () => {
    // validate form
    // if (!data.title) {
    // } else if (!data.description) {
    // } else if (!data.cookingTime) {
    // } else if (!data.prepTime) {
    // } else if (!data.serving) {
    // } else if (!category) {
    // } else if (!dish) {
    // } else if (!thumbnail) {
    // } else if (ingredients.length === 0) {
    // } else if (instructions.length === 0) {
    // }

    const formData = new FormData();
    const nutritions = {
      calories:
        nutrition.calories.length === 0 ? 0 : Number(nutrition.calories),
      protein: nutrition.protein.length === 0 ? 0 : Number(nutrition.protein),
      carbs: nutrition.carbs.length === 0 ? 0 : Number(nutrition.carbs),
      sugar: nutrition.sugar.length === 0 ? 0 : Number(nutrition.sugar),
    };

    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('video_url', data.video_url);
    formData.append('cookingTime', data.cookingTime);
    formData.append('prepTime', data.prepTime);
    formData.append('serving', data.serving);
    formData.append('category_id', category);
    formData.append('dish_id', dish);
    formData.append('thumbnail_url', thumbnail);
    ingredients.map((item, index) => {
      if (item.quantity && item.unit_id && item.ingredient_id) {
        formData.append(`ingredients[${index}][quantity]`, item.quantity);
        formData.append(`ingredients[${index}][unit_id]`, item.unit_id);
        formData.append(
          `ingredients[${index}][ingredient_id]`,
          item.ingredient_id,
        );
      }
      return;
    });

    instructions.map((item, index) => {
      if (item) {
        formData.append(`instructions[${index}]`, item);
      }
      return;
    });

    formData.append('nutritions[calories]', nutritions.calories);
    formData.append('nutritions[protein]', nutritions.protein);
    formData.append('nutritions[carbs]', nutritions.carbs);
    formData.append('nutritions[sugar]', nutritions.sugar);

    try {
      const response = await recipeUsecase.addRecipe(formData);
      console.log('CREATE RECIPE : ', response);
    } catch (error) {
      console.log('err : ', error);
    }
  };

  const getNutritionFromIngredients = () => {
    if (ingredients.length === 0) {
      return;
    }
    const ingredientsArray: any[] = [];

    ingredients.map((item, index) => {
      if (item.quantity && item.unit_name && item.ingredient_name) {
        ingredientsArray.push(
          `${item.quantity} ${item.unit_name} ${item.ingredient_name}`,
        );
      }
      return;
    });

    console.log('ingredientsArray : ', ingredientsArray);

    if (ingredientsArray.length === 0) {
      return;
    }

    const response =
      nutritionUsecase.getNutritionFromIngredients(ingredientsArray);

    response.then(res => {
      setNutrition({
        protein: res?.totalNutrients?.PROCNT?.quantity
          ? Number(res?.totalNutrients?.PROCNT?.quantity).toFixed(2)
          : '',
        calories: res?.calories ? Number(res?.calories).toFixed(2) : '',
        carbs: res?.totalNutrients['CHOCDF.net']?.quantity
          ? Number(res?.totalNutrients['CHOCDF.net']?.quantity).toFixed(2)
          : '',
        sugar: res?.totalNutrients?.SUGAR?.quantity
          ? Number(res?.totalNutrients?.SUGAR?.quantity).toFixed(2)
          : '',
      });
    });
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      if (isActive) {
        Promise.all([
          getListCategory(),
          getListDish(),
          getNutritionFromIngredients(),
          getListIngredient(),
          getListUnit(),
        ]);
      }

      return () => {
        isActive = false;
      };
    }, []),
  );

  useEffect(() => {
    getNutritionFromIngredients();
  }, [ingredients]);

  return {
    modalInput,
    setModalInput,
    thumbnail,
    setThumbnail,
    ingredients,
    setIngredients,
    instructions,
    setInstructions,
    category,
    setCategory,
    dish,
    setDish,
    data,
    setData,
    openCamera,
    openGallery,
    tab,
    setTab,
    addIngredient,
    deleteIngredient,
    addInstruction,
    deleteInstruction,
    listCategory,
    listDish,
    listIngredient,
    listUnit,
    nutrition,
    setNutrition,
    getNutritionFromIngredients,
    handleCreateRecipe,
  };
};

export default AddRecipeViewModel;
