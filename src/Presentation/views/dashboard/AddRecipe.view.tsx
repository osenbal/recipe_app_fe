import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import LayoutPadding from '@presentation/layouts/LayoutPadding';
import ModalShowCamAndGallery from '@presentation/components/views/AddRecipe/ModalShowCamAndGallery';
import CustomInput from '@presentation/components/forms/CustomInput';
import CustomButton from '@presentation/components/buttons/CustomButton';
import InputIngredient from '@presentation/components/views/AddRecipe/InputIngredient';
import ButtonDelete from '@presentation/components/views/AddRecipe/ButtonDelete';
import SelectInput from '@presentation/components/forms/SelectInput';
import useAddRecipeViewModel from '@presentation/view-model/dashboard/addRecipe.view-model';
import {colors} from '@assets/colors/colors';
import {fonts} from '@assets/fonts/fonts';
import IconPlus from '@assets/icons/navigation/icon_plus.svg';

const AddRecipeView: React.FC = () => {
  const {
    modalInput,
    setModalInput,
    openCamera,
    openGallery,
    thumbnail,
    setThumbnail,
    tab,
    setTab,
    ingredients,
    setIngredients,
    addIngredient,
    deleteIngredient,
    setInstructions,
    instructions,
    addInstruction,
    deleteInstruction,
    category,
    setCategory,
    dish,
    setDish,
    data,
    setData,
    listCategory,
    listDish,
    listIngredient,
    listUnit,
    getNutritionFromIngredients,
    nutrition,
    handleCreateRecipe,
  } = useAddRecipeViewModel();

  return (
    <ScrollView>
      <LayoutPadding>
        <View style={styles.container}>
          <View style={styles.headerImage}>
            {thumbnail ? (
              <View>
                <ButtonDelete
                  style={{position: 'absolute', zIndex: 2, right: 0}}
                  onPress={() => setThumbnail(null)}
                />
                <Image
                  source={{uri: thumbnail.uri}}
                  style={styles.thumb_image}
                />
              </View>
            ) : (
              <Pressable onPress={() => setModalInput(true)}>
                <View style={styles.container_inputImage}>
                  <View style={styles.roundedButton}>
                    <IconPlus />
                  </View>
                </View>
              </Pressable>
            )}
          </View>

          <View
            style={{
              marginTop: 25,
              display: 'flex',
              flexDirection: 'column',
              rowGap: 15,
            }}>
            <CustomInput
              value={data.title}
              onChange={v => setData((prev: any) => ({...prev, title: v}))}
              label="Recipe Name"
              placeholder="Enter recipe name"
            />
            <CustomInput
              value={data.description}
              onChange={v =>
                setData((prev: any) => ({...prev, description: v}))
              }
              label="Description"
              placeholder="Enter description"
              multiline={true}
              numberOfLines={4}
            />
            <SelectInput
              key={1}
              label="Category"
              style={{width: '100%'}}
              options={listCategory}
              search={true}
              onSelect={(selectedItem: any, index: number) => {
                setCategory(selectedItem.id);
              }}
              buttonTextAfterSelection={(selectedItem: any, index: number) =>
                selectedItem.name
              }
              rowTextForSelection={(item: any, index: number) => item.name}
            />
            <SelectInput
              key={2}
              label="Dish"
              style={{width: '100%'}}
              options={listDish}
              search={true}
              onSelect={(selectedItem: any, index: number) => {
                setDish(selectedItem.id);
              }}
              buttonTextAfterSelection={(selectedItem: any, index: number) =>
                selectedItem.name
              }
              rowTextForSelection={(item: any, index: number) => item.name}
            />
            <CustomInput
              label="Servings"
              keyboardType="numeric"
              value={data.serving}
              onChange={v => {
                setData((prev: any) => {
                  return {
                    ...prev,
                    serving: v,
                  };
                });
              }}
            />
            <CustomInput
              label="Cook Time Time (in minute)"
              keyboardType="numeric"
              value={data.cookingTime}
              onChange={v => {
                setData((prev: any) => {
                  return {
                    ...prev,
                    cookingTime: v,
                  };
                });
              }}
            />
            <CustomInput
              label="Preparation Time (in minute)"
              keyboardType="numeric"
              value={data.prepTime}
              onChange={v => {
                setData((prev: any) => {
                  return {
                    ...prev,
                    prepTime: v,
                  };
                });
              }}
            />
            <CustomInput
              label="Video url (optional)"
              value={data.video_url}
              onChange={v => {
                setData((prev: any) => {
                  return {
                    ...prev,
                    video_url: v,
                  };
                });
              }}
            />
          </View>

          <View style={styles.tabs}>
            <CustomButton
              width={150}
              backgroundColor={
                tab === 'procedure'
                  ? 'transparent'
                  : colors.primaryColors.primary100
              }
              label="Ingredient"
              size="small"
              labelStyle={{
                color:
                  tab === 'procedure'
                    ? colors.primaryColors.primary80
                    : colors.neutralColors.white,
              }}
              onPress={() => setTab('ingredient')}
            />
            <CustomButton
              width={150}
              backgroundColor={
                tab === 'ingredient'
                  ? 'transparent'
                  : colors.primaryColors.primary100
              }
              label="Procedure"
              size="small"
              labelStyle={{
                color:
                  tab === 'ingredient'
                    ? colors.primaryColors.primary80
                    : colors.neutralColors.white,
              }}
              onPress={() => setTab('procedure')}
            />
          </View>

          <View style={{marginTop: 20}}>
            {tab === 'ingredient' ? (
              <View style={styles.container_ingredients}>
                {ingredients.map((item, index) => {
                  return (
                    <View key={index}>
                      <InputIngredient
                        label={`Ingredient ${index + 1}`}
                        onChangeIngredient={(e: any) => {
                          setIngredients(prev => {
                            return prev.map((item: any, idx: number) => {
                              if (idx === index) {
                                return {
                                  ...item,
                                  ingredient_id: e.id,
                                  ingredient_name: e.name,
                                };
                              }
                              return item;
                            });
                          });
                        }}
                        onChangeAmount={(e: any) => {
                          setIngredients(prev => {
                            return prev.map((item: any, idx: number) => {
                              if (idx === index) {
                                return {
                                  ...item,
                                  quantity: e,
                                };
                              }
                              return item;
                            });
                          });
                        }}
                        onChangeUnit={(e: any) => {
                          setIngredients(prev => {
                            return prev.map((item: any, idx: number) => {
                              if (idx === index) {
                                return {
                                  ...item,
                                  unit_id: e.id,
                                  unit_name: e.name,
                                };
                              }
                              return item;
                            });
                          });
                        }}
                        ingredients={listIngredient}
                        units={listUnit}
                      />
                      <ButtonDelete
                        style={{marginTop: 15}}
                        onPress={() => deleteIngredient(index)}
                      />
                    </View>
                  );
                })}
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 15,
                  }}>
                  <Pressable
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      width: 58,
                      height: 44,
                      borderRadius: 10,
                      columnGap: 5,
                      backgroundColor: colors.primaryColors.primary100,
                    }}
                    onPress={addIngredient}>
                    <IconPlus />
                    <Text
                      style={{
                        color: colors.neutralColors.white,
                        fontFamily: fonts.smallTextBold.fontFamily,
                        fontSize: fonts.smallTextBold.fontSize,
                        fontWeight: 'bold',
                      }}>
                      Add
                    </Text>
                  </Pressable>
                </View>
              </View>
            ) : (
              <View style={styles.container_ingredients}>
                {instructions.map((item, index) => {
                  return (
                    <View key={index}>
                      <CustomInput
                        label={`Step ${index + 1}`}
                        placeholder="Enter instruction text ..."
                        value={item}
                        onChange={v => {
                          setInstructions(prev => {
                            return prev.map((item: any, idx: number) => {
                              if (idx === index) {
                                return v;
                              }
                              return item;
                            });
                          });
                        }}
                      />
                      <ButtonDelete onPress={() => deleteInstruction(index)} />
                    </View>
                  );
                })}
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 15,
                  }}>
                  <Pressable
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      width: 58,
                      height: 44,
                      borderRadius: 10,
                      columnGap: 5,
                      backgroundColor: colors.secondaryColors.secondary100,
                    }}
                    onPress={addInstruction}>
                    <IconPlus />
                    <Text
                      style={{
                        color: colors.neutralColors.white,
                        fontFamily: fonts.smallTextBold.fontFamily,
                        fontSize: fonts.smallTextBold.fontSize,
                        fontWeight: 'bold',
                      }}>
                      Add
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>

          <View style={{marginTop: 50}}>
            <Text style={{marginBottom: 10}}>Nutritions</Text>
            <CustomInput
              value={nutrition.calories}
              label="Callories"
              placeholder="Enter note"
            />
            <CustomInput
              value={nutrition.protein}
              label="Protein"
              placeholder="Enter note"
            />
            <CustomInput
              value={nutrition.carbs}
              label="Carbs"
              placeholder="Enter note"
            />
            <CustomInput
              value={nutrition.sugar}
              label="Sugar"
              placeholder="Enter note"
            />
          </View>

          <View style={{marginTop: 50}}>
            <CustomButton
              label="Save"
              size="medium"
              onPress={handleCreateRecipe}
            />
          </View>
        </View>

        <ModalShowCamAndGallery
          setModalInput={setModalInput}
          modalInput={modalInput}
          openCamera={openCamera}
          openGallery={openGallery}
        />
      </LayoutPadding>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 200,
  },
  headerImage: {},
  container_inputImage: {
    width: '100%',
    height: 150,
    backgroundColor: colors.neutralColors.gray3,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumb_image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  tabs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    justifyContent: 'space-between',
    width: '100%',
    height: 58,
  },
  container_ingredients: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 15,
  },
  roundedButton: {
    width: 50,
    height: 50,
    backgroundColor: colors.neutralColors.gray2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50 / 2,
  },
});

export default AddRecipeView;
