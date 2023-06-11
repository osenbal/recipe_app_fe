import React, {useRef, useMemo, useCallback} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import LayoutPadding from '@presentation/layouts/LayoutPadding';
import CustomInput from '@presentation/components/forms/CustomInput';
import FilterButton from '@presentation/components/buttons/FilterButton';
import HomeViewModel from '@presentation/view-model/dashboard/home.view-model';
import CardPost, {
  CardPostNewRecipe,
} from '@presentation/components/card/CardPost';

import {fonts} from '@assets/fonts/fonts';
import {colors} from '@assets/colors/colors';

import IconSearch from '@assets/icons/icon_search.svg';
import IconFilter from '@assets/icons/icon_filter.svg';
const avatarImg = require('@assets/images/avatar/img_avatar.png');

const HomeView: React.FC = ({navigation}: any) => {
  const {handleFilter, filterActive, filters} = HomeViewModel();
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  return (
    <>
      <BottomSheetModalProvider>
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <LayoutPadding>
              <View style={{paddingBottom: 50}}>
                <View style={styles.container_header}>
                  <View>
                    <Text style={styles.header}>Hello Chef Juna</Text>
                    <Text style={styles.subHeader}>
                      What are you cooking today?
                    </Text>
                  </View>
                  <View>
                    <Image source={avatarImg} />
                  </View>
                </View>

                <View style={styles.container_search}>
                  <CustomInput
                    style={{flex: 1}}
                    placeholder="Search recipes"
                    iconPosition="left"
                    disabled={false}
                    icon={<IconSearch width={18} height={18} />}
                  />

                  <FilterButton
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
                    {filters.map((filter, index) => (
                      <FilterButton
                        key={index}
                        onPress={() => handleFilter(filter)}
                        outline={filterActive == filter ? false : null}
                        style={styles.filter_btn}
                        content={
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={[
                              styles.filter_text,
                              {
                                color:
                                  filterActive == filter
                                    ? colors.neutralColors.white
                                    : colors.primaryColors.primary100,
                              },
                            ]}>
                            {filter}
                          </Text>
                        }
                      />
                    ))}
                  </View>
                </ScrollView>

                <ScrollView
                  horizontal={true}
                  alwaysBounceHorizontal={true}
                  bounces={true}
                  decelerationRate="fast"
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={200}>
                  <View style={styles.container_cardPosts}>
                    <CardPost
                      id={1}
                      title="Classic Greek Salad"
                      time="15 Mins"
                      imageUrl=""
                      onPress={() =>
                        navigation.navigate('DetailRecipe', {
                          itemId: 1,
                        })
                      }
                    />
                    <CardPost
                      id={2}
                      title="Classic Greek Salad"
                      time="15 Mins"
                      imageUrl=""
                      onPress={() =>
                        navigation.navigate('DetailRecipe', {
                          itemId: 2,
                        })
                      }
                    />
                    <CardPost
                      id={3}
                      title="Classic Greek Salad"
                      time="15 Mins"
                      imageUrl=""
                      onPress={() =>
                        navigation.navigate('DetailRecipe', {
                          itemId: 3,
                        })
                      }
                    />
                    <CardPost
                      id={4}
                      title="Classic Greek Salad"
                      time="15 Mins"
                      imageUrl=""
                    />
                    <CardPost
                      id={5}
                      title="Classic Greek Salad"
                      time="15 Mins"
                      imageUrl=""
                    />
                    <CardPost
                      id={6}
                      title="Classic Greek Salad"
                      time="15 Mins"
                      imageUrl=""
                    />
                  </View>
                </ScrollView>

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

              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text>Awesome 🎉</Text>
                </View>
              </BottomSheetModal>
            </LayoutPadding>
          </ScrollView>
        </SafeAreaView>
      </BottomSheetModalProvider>
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
