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
import {fonts} from '@assets/fonts/fonts';
import {colors} from '@assets/colors/colors';

import IconTimer from '@assets/icons/icon_timer.svg';
import IconBookmark from '@assets/icons/icon_bookmark.svg';
import IconServe from '@assets/icons/icon_serve.svg';
import IconArrowLeft from '@assets/icons/icon_arrowLeft.svg';
const ImgThumb300X150 = require('@assets/images/post/img_thumb_300x150.png');

const DetailRecipeView: React.FC = ({route, navigation}: any) => {
  const [tab, setTab] = useState<'ingredient' | 'procedure'>('ingredient'); // ['ingredient', 'procedure']

  const {itemId} = route.params;
  return (
    <ScrollView>
      <LayoutPadding>
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
              <Image style={styles.header_Img} source={ImgThumb300X150} />
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
                20 min
              </Text>
              <View style={styles.iconBookmark}>
                <Pressable onPress={() => {}}>
                  <IconBookmark width={16} height={16} />
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.content}>
            <View>
              <Text style={styles.text_title}>Potatoes Salad</Text>
              <Text style={styles.text_description}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an
              </Text>
            </View>

            <AuthorRecipe img_urlUser="" name="Renata" />

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
                  1 Serve
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
                  0 Items
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
                  <ItemIngredient
                    ingredient="Potatoes"
                    unit="g"
                    amount={200}
                    imgUrlIngredient=""
                  />
                  <ItemIngredient
                    ingredient="Potatoes"
                    unit="g"
                    amount={200}
                    imgUrlIngredient=""
                  />
                  <ItemIngredient
                    ingredient="Potatoes"
                    unit="g"
                    amount={200}
                    imgUrlIngredient=""
                  />
                  <ItemIngredient
                    ingredient="Potatoes"
                    unit="g"
                    amount={200}
                    imgUrlIngredient=""
                  />
                </>
              ) : (
                <>
                  <ItemProcedure
                    order={1}
                    instruction="Lorem Ipsum tempor incididunt ut labore et dolore,in voluptate velit esse cillum dolore eu fugiat nulla pariatur?"
                  />
                  <ItemProcedure
                    order={2}
                    instruction="Lorem Ipsum tempor incididunt ut labore et dolore,in voluptate velit esse cillum dolore eu fugiat nulla pariatur?"
                  />
                  <ItemProcedure
                    order={3}
                    instruction="Lorem Ipsum tempor incididunt ut labore et dolore,in voluptate velit esse cillum dolore eu fugiat nulla pariatur?"
                  />
                </>
              )}
            </View>
          </View>
        </View>
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
