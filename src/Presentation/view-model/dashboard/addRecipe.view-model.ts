import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const AddRecipeViewModel = () => {
  const [modalInput, setModalInput] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<any>(null);
  const [tab, setTab] = useState<'ingredient' | 'procedure'>('ingredient'); // ['ingredient', 'procedure']
  const [ingredients, setIngredients] = useState<Array<{}>>([
    {
      ingredient_id: null,
      quantity: null,
      unit_id: null,
    },
    {
      ingredient_id: null,
      quantity: null,
      unit_id: null,
    },
  ]);
  const [instructions, setInstructions] = useState<Array<string>>(['', '']);
  const [category, setCategory] = useState<number | null>(null);
  const [dish, setDish] = useState<number | null>(null);
  const [data, setData] = useState<any>({
    title: '',
    description: '',
    video_url: '',
    cookingTime: '',
    prepTime: '',
    servinga: '',
  });

  const listUnits = [
    {
      id: 1,
      name: 'Kg',
    },
    {
      id: 2,
      name: 'L',
    },
    {
      id: 3,
      name: 'g',
    },
    {
      id: 4,
      name: 'ml',
    },
    {
      id: 5,
      name: 'oz',
    },
  ];
  const listIngredients = [
    {
      id: 9,
      name: 'Tomato',
      img_url: 'https://www.w3schools.com/bootstrap/paris.jpg',
    },
    {
      id: 20,
      name: 'Potato',
      img_url:
        'data:image/png;base64,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',
    },
  ];

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
          setThumbnail(response?.assets[0].uri);
        }
      },
    );

    setModalInput(false);
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      {ingredient_id: null, quantity: null, unit_id: null},
    ]);
  };

  const deleteIngredient = (index: number) => {
    const newIngredients = ingredients.filter((ingredient, i) => i !== index);
    setIngredients(newIngredients);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const deleteInstruction = (index: number) => {
    const newInstructions = instructions.filter(
      (instruction, i) => i !== index,
    );
    setInstructions(newInstructions);
  };

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
    listUnits,
    listIngredients,
    addIngredient,
    deleteIngredient,
    addInstruction,
    deleteInstruction,
  };
};

export default AddRecipeViewModel;
