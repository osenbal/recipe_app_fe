import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import LayoutPadding from '@presentation/layouts/LayoutPadding';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '@presentation/components/buttons/CustomButton';
import ItemIngredient from '@presentation/components/views/DetailRecipe/ItemIngredient';
import AuthorRecipe from '@presentation/components/views/DetailRecipe/Author';
import ItemProcedure from '@presentation/components/views/DetailRecipe/ItemProcedure';
import DetailRecipeViewModel from '@presentation/view-model/dashboard/detailRecipe.view-model';
import {fonts} from '@assets/fonts/fonts';
import {colors} from '@assets/colors/colors';

import IconTimer from '@assets/icons/icon_timer.svg';
import IconBookmark from '@assets/icons/icon_bookmark.svg';
import IconServe from '@assets/icons/icon_serve.svg';
import IconArrowLeft from '@assets/icons/icon_arrowLeft.svg';
const ImgThumb300X150 = require('@assets/images/post/img_thumb_300x150.png');

const DetailRecipeView: React.FC = ({navigation}: any) => {
  const {
    recipe,
    loading,
    tab,
    setTab,
    handleAddFavorite,
    handleRemoveFavorite,
  } = DetailRecipeViewModel();
  return (
    <ScrollView>
      <LayoutPadding>
        {recipe === null || recipe === undefined ? (
          <></>
        ) : (
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Pressable
                style={{width: 20, height: 20}}
                onPress={() => navigation.goBack()}>
                <IconArrowLeft />
              </Pressable>
            </View>
            <View style={styles.header}>
              <View style={styles.header_containerImg}>
                <LinearGradient
                  style={styles.overlayImg}
                  colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']}
                />
                <Image
                  style={styles.header_Img}
                  source={
                    recipe?.thumbnail_url
                      ? {uri: recipe.thumbnail_url}
                      : ImgThumb300X150
                  }
                />
              </View>
              <View style={styles.header_content}>
                <IconTimer width={17} height={17} />
                <Text
                  style={{
                    fontFamily: fonts.snmallerTextRegular.fontFamily,
                    fontSize: fonts.snmallerTextRegular.fontSize,
                    color: colors.neutralColors.white,
                    fontWeight: '400',
                  }}>
                  {recipe?.cookingTime} min
                </Text>
                <View
                  style={[
                    styles.iconBookmark,
                    {
                      backgroundColor:
                        recipe.is_favorite == true
                          ? colors.primaryColors.primary100
                          : colors.neutralColors.white,
                    },
                  ]}>
                  <Pressable
                    onPress={() =>
                      recipe.is_favorite === true
                        ? handleRemoveFavorite()
                        : handleAddFavorite()
                    }>
                    <IconBookmark width={16} height={16} />
                  </Pressable>
                </View>
              </View>
            </View>

            <View style={styles.content}>
              <View>
                <Text style={styles.text_title}>{recipe?.title}</Text>
                <Text style={styles.text_description}>
                  {recipe?.description}
                </Text>
              </View>

              <AuthorRecipe
                img_urlUser={recipe.chef.profile_url}
                name={recipe.chef.name}
              />

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

              <View style={styles.serve}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    columnGap: 5,
                  }}>
                  <IconServe width={17} height={17} />
                  <Text
                    style={{
                      fontFamily: fonts.snmallerTextRegular.fontFamily,
                      fontSize: fonts.snmallerTextRegular.fontSize,
                      fontWeight: '400',
                      color: colors.neutralColors.gray3,
                    }}>
                    {recipe.serving} Serve
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      fontFamily: fonts.snmallerTextRegular.fontFamily,
                      fontSize: fonts.snmallerTextRegular.fontSize,
                      fontWeight: '400',
                      color: colors.neutralColors.gray3,
                    }}>
                    {tab === 'ingredient'
                      ? recipe.recipe_ingredient?.length
                      : recipe.recipe_instruction?.length}{' '}
                    Items
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  rowGap: 10,
                }}>
                {tab === 'ingredient' ? (
                  <>
                    {recipe.recipe_ingredient?.map((item, index) => {
                      return (
                        <ItemIngredient
                          key={item.id}
                          ingredient={item.name}
                          unit={item.quantity_detail[0].unit_measurment.name}
                          amount={item.quantity_detail[0].quantity}
                          imgUrlIngredient={item.img_url}
                        />
                      );
                    })}
                  </>
                ) : (
                  <>
                    {recipe.recipe_instruction?.map((item, index) => {
                      return (
                        <ItemProcedure
                          key={item.id}
                          order={index + 1}
                          instruction={item.description}
                        />
                      );
                    })}
                  </>
                )}
              </View>
            </View>
          </View>
        )}
      </LayoutPadding>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    marginTop: 20,
  },
  overlayImg: {
    position: 'absolute',
    width: '100%',
    height: 150,
    borderRadius: 10,
    zIndex: 1,
  },
  header_Img: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  header_containerImg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header_content: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 5,
  },
  iconBookmark: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    backgroundColor: colors.neutralColors.white,
    marginLeft: 5,
  },
  content: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  text_title: {
    fontFamily: fonts.smallTextBold.fontFamily,
    fontSize: fonts.smallTextBold.fontSize,
    fontWeight: '700',
    color: colors.neutralColors.black,
  },
  text_description: {
    marginTop: 10,
    fontFamily: fonts.snmallerTextRegular.fontFamily,
    fontSize: fonts.snmallerTextRegular.fontSize,
    fontWeight: '400',
    color: colors.neutralColors.black,
  },

  tabs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'space-between',
    width: '100%',
    height: 58,
  },
  serve: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    justifyContent: 'space-between',
  },
});

export default DetailRecipeView;
