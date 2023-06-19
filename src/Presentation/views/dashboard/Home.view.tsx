import React, {useCallback, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Button,
} from 'react-native';
import LayoutPadding from '@presentation/layouts/LayoutPadding';
import CustomInput from '@presentation/components/forms/CustomInput';
import FilterButton from '@presentation/components/buttons/FilterButton';
import HomeViewModel from '@presentation/view-model/dashboard/home.view-model';
import CardPost, {
  CardPostNewRecipe,
} from '@presentation/components/card/CardPost';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import FilterBottomSheet from '@presentation/components/bottomSheet/FilterBottomSheet';
import {IRecipeResponseBody} from '@domain/entity/recipe/structures/GetRecipes';
import ModalMustLogin from '@presentation/components/modal/ModalMustLogin';

import {fonts} from '@assets/fonts/fonts';
import {colors} from '@assets/colors/colors';

import IconSearch from '@assets/icons/icon_search.svg';
import IconFilter from '@assets/icons/icon_filter.svg';
const avatarImg = require('@assets/images/avatar/img_avatar.png');

const HomeView: React.FC = ({navigation}: any) => {
  const {
    handleFilterCategory,
    filterActive,
    recipes,
    user,
    categories,
    searchText,
    setSearchText,
    handleSearchRecipe,
    refreshing,
    onRefresh,
    bottomSheetRef,
    snapPoints,
    handleSheetChanges,
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
    isAuthenticated,
    toggleFavorite,
  } = HomeViewModel();

  // renders
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        onRequestClose={() => {
          bottomSheetRef.current?.close();
        }}
        opacity={0.5}
        onPress={() => {
          bottomSheetRef.current?.close();
        }}
      />
    ),
    [],
  );

  useEffect(() => {
    handleBackAction();
  }, []);

  return (
    <>
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <LayoutPadding>
            <View style={{paddingBottom: 50}}>
              <View style={styles.container_header}>
                <View>
                  <Text style={styles.header}>
                    Hello {user ? user.name : 'Guest'}
                  </Text>
                  <Text style={styles.subHeader}>
                    What are you cooking today?
                  </Text>
                </View>
                <View>
                  <Image
                    source={
                      user && user.profile_url != ''
                        ? {uri: user.profile_url}
                        : avatarImg
                    }
                  />
                </View>
              </View>

              <View style={styles.container_search}>
                <CustomInput
                  style={{flex: 1}}
                  placeholder="Search recipes"
                  iconPosition="left"
                  disabled={false}
                  onSubmitEditing={handleSearchRecipe}
                  value={searchText}
                  onChange={e => setSearchText(e)}
                  icon={<IconSearch width={18} height={18} />}
                  onFocusInput={() => navigation.navigate('Search')}
                  // onBlurInput={() => setSearchFocus(false)}
                />

                <FilterButton
                  onPress={() => {
                    bottomSheetRef.current?.expand();
                  }}
                  outline={false}
                  style={{
                    height: 44,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 18,
                  }}
                  content={
                    <IconFilter width={18} height={18} />
                  }></FilterButton>
              </View>

              <ScrollView
                horizontal={true}
                alwaysBounceHorizontal={true}
                bounces={true}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                pagingEnabled={true}>
                <View style={[styles.container_filter, {flex: 1}]}>
                  {categories.map((category, index) => (
                    <FilterButton
                      key={index}
                      onPress={() => handleFilterCategory(category)}
                      outline={filterActive === category.name ? false : null}
                      style={styles.filter_btn}
                      content={
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={[
                            styles.filter_text,
                            {
                              color:
                                filterActive == category.name
                                  ? colors.neutralColors.white
                                  : colors.primaryColors.primary100,
                            },
                          ]}>
                          {category.name}
                        </Text>
                      }
                    />
                  ))}
                </View>
              </ScrollView>

              {recipes.length != 0 ? (
                <ScrollView
                  horizontal={true}
                  alwaysBounceHorizontal={true}
                  bounces={true}
                  decelerationRate="fast"
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={200}>
                  <View style={styles.container_cardPosts}>
                    {recipes.map(
                      (recipe: IRecipeResponseBody, index: number) => (
                        <CardPost
                          key={index}
                          id={index}
                          title={recipe.title}
                          time={`${recipe.cookingTime} Mins`}
                          imageUrl={recipe.thumbnail_url}
                          isFavorited={recipe.is_favorite}
                          handleFavorite={() => {
                            isAuthenticated
                              ? toggleFavorite(recipe.id, recipe.is_favorite)
                              : navigation.navigate('ModalMustLogin');
                          }}
                          onPress={() =>
                            navigation.navigate('DetailRecipe', {
                              recipeId: recipe.id,
                            })
                          }
                        />
                      ),
                    )}
                  </View>
                </ScrollView>
              ) : (
                <View style={{marginVertical: 50}}>
                  <Text style={{textAlign: 'center'}}>No recipes found</Text>
                </View>
              )}

              <View style={{marginTop: 18, marginBottom: 30}}>
                <Text style={styles.header_text_newRecipes}>New Recipes</Text>
                <ScrollView
                  horizontal={true}
                  alwaysBounceHorizontal={true}
                  bounces={true}
                  decelerationRate="fast"
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={200}>
                  <View style={styles.container_newRecipes}>
                    <CardPostNewRecipe
                      title="Classic Greek Salad"
                      time="15 Mins"
                      imageUrl=""
                    />
                    <CardPostNewRecipe
                      title="Classic Greek Salad"
                      time="15 Mins"
                      imageUrl=""
                    />
                    <CardPostNewRecipe
                      title="Classic Greek Salad"
                      time="15 Mins"
                      imageUrl=""
                    />
                    <CardPostNewRecipe
                      title="Classic Greek Salad"
                      time="15 Mins"
                      imageUrl=""
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </LayoutPadding>
        </ScrollView>
      </SafeAreaView>

      <FilterBottomSheet
        snapPoints={snapPoints}
        bottomSheetRef={bottomSheetRef}
        handleSheetChanges={handleSheetChanges}
        renderBackdrop={renderBackdrop}
        handleFilter={handleFilter}
        filterTime={filterTime}
        setFilterTime={setFilterTime}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterDish={filterDish}
        setFilterDish={setFilterDish}
        filterTimeData={filterTimeData}
        categories={categories}
        dish={dish}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container_header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontFamily: fonts.largeTextBold.fontFamily,
    fontSize: fonts.largeTextBold.fontSize,
    fontWeight: 'bold',
    color: colors.neutralColors.black,
  },
  subHeader: {
    fontFamily: fonts.smallTextRegular.fontFamily,
    fontSize: fonts.smallTextRegular.fontSize,
    fontWeight: 'normal',
    color: colors.neutralColors.gray3,
  },
  container_search: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 20,
  },
  container_filter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
    columnGap: 10,
  },
  filter_btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 31,
  },
  filter_text: {
    fontFamily: fonts.smallTextRegular.fontFamily,
    fontSize: fonts.smallTextRegular.fontSize,
    fontWeight: 'normal',
    color: colors.neutralColors.white,
  },

  container_cardPosts: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: 10,
  },

  header_text_newRecipes: {
    fontFamily: fonts.normalTextBold.fontFamily,
    fontWeight: 'bold',
    fontSize: fonts.normalTextBold.fontSize,
    color: colors.neutralColors.black,
  },
  container_newRecipes: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: 10,
  },
});

export default HomeView;
