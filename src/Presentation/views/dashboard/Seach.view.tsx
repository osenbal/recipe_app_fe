import React, {useCallback, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Pressable,
  StyleSheet,
} from 'react-native';
import LayoutPadding from '@presentation/layouts/LayoutPadding';
import CustomInput from '@presentation/components/forms/CustomInput';
import FilterButton from '@presentation/components/buttons/FilterButton';
import {CardPostSearchResult} from '@presentation/components/card/CardPost';
import FilterBottomSheet from '@presentation/components/bottomSheet/FilterBottomSheet';
import useSearchViewModel from '@presentation/view-model/dashboard/search.view-model';
import {IRecipeResponseBody} from '@domain/entity/recipe/structures/GetRecipes';
import {fonts} from '@assets/fonts/fonts';
import {colors} from '@assets/colors/colors';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

import IconSearch from '@assets/icons/icon_search.svg';
import IconBack from '@assets/icons/icon_arrowLeft.svg';
import IconFilter from '@assets/icons/icon_filter.svg';

const SearchView: React.FC = ({navigation}: any) => {
  const {
    searchText,
    setSearchText,
    handleSearch,
    searchResult,
    bottomSheetRef,
    snapPoints,
    handleSheetChanges,
    handleBackAction,
    filterTime,
    filterCategory,
    filterDish,
    filterTimeData,
    setFilterTime,
    setFilterCategory,
    setFilterDish,
    categories,
    dish,
    handleFilter,
  } = useSearchViewModel();

  // renders
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
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
        <ScrollView>
          <LayoutPadding>
            <View>
              <View style={styles.header}>
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={styles.btn_back}>
                  <IconBack width={20} height={20} />
                </Pressable>
                <Text style={styles.header_text}>Search recipes</Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  columnGap: 10,
                }}>
                <CustomInput
                  style={{
                    flex: 1,
                  }}
                  autoFocus={true}
                  iconPosition="left"
                  icon={<IconSearch width={20} height={20} />}
                  placeholder="Search recipe"
                  value={searchText}
                  onChange={e => setSearchText(e)}
                  onSubmitEditing={handleSearch}
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
                  content={<IconFilter width={18} height={18} />}
                />
              </View>

              <View style={{marginTop: 20}}>
                <Text
                  style={{
                    fontFamily: fonts.normalTextBold.fontFamily,
                    fontSize: fonts.normalTextBold.fontSize,
                    fontWeight: 'bold',
                    color: colors.neutralColors.black,
                  }}>
                  {searchResult.length > 0 ? 'Result Search' : ''}
                </Text>

                <View style={styles.content_searchResult}>
                  {searchResult.map(
                    (item: IRecipeResponseBody, index: number) => {
                      return (
                        <CardPostSearchResult
                          key={index}
                          onPress={() =>
                            navigation.navigate('DetailRecipe', {
                              recipeId: item.id,
                            })
                          }
                          thumbnail_url={item.thumbnail_url}
                          title={item.title}
                          chef_email={item.chef.name}
                          chef_name={item.chef.user.email}
                        />
                      );
                    },
                  )}
                </View>
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
  container: {},
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_back: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  header_text: {
    fontFamily: fonts.mediumTextBold.fontFamily,
    fontSize: fonts.mediumTextBold.fontSize,
    fontWeight: 'bold',
    color: colors.neutralColors.black,
  },
  content_searchResult: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 10,
    rowGap: 10,
    flexWrap: 'wrap',
  },
});

export default SearchView;
