import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {fonts} from '@assets/fonts/fonts';
import {colors} from '@assets/colors/colors';

import IconBookmark from '@assets/icons/icon_bookmark.svg';
import IconTimer from '@assets/icons/icon_timer.svg';
const imgThumb = require('@assets/images/post/img_thumb.png');
const ImgRecipe1 = require('@assets/images/post/img_recipe1.png');

type Props = {
  id: number;
  style?: any;
  title: string;
  time: string;
  imageUrl: string | null;
  isFavorited?: boolean;
  onPress?: () => void;
};
const CardPost: React.FC<Props> = ({
  id,
  style,
  title,
  time,
  imageUrl,
  isFavorited = false,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={stylesCardPost.cardContainer}>
        <View style={stylesCardPost.imageContainer}>
          <Image
            style={stylesCardPost.cardImage}
            source={imageUrl ? {uri: imageUrl} : imgThumb}
          />
        </View>
        <View style={stylesCardPost.cardContent}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={stylesCardPost.cardTitle}>
            {title}
          </Text>
          <View style={stylesCardPost.containerCardAction}>
            <View>
              <Text style={stylesCardPost.cardTextTime}>Time</Text>
              <Text style={stylesCardPost.cardTimeCook}>{time}</Text>
            </View>

            <View>
              <View
                style={[
                  stylesCardPost.cardIconBookmark,
                  {
                    backgroundColor: isFavorited
                      ? colors.primaryColors.primary100
                      : colors.neutralColors.white,
                  },
                ]}>
                <IconBookmark width={16} height={16} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

type PropsNewRecipe = {
  style?: any;
  title: string;
  time: string;
  imageUrl: string | null;
  isFavorited?: boolean;
};
export const CardPostNewRecipe: React.FC<PropsNewRecipe> = ({
  style,
  title,
  time,
  imageUrl,
  isFavorited = false,
}) => {
  return (
    <View style={stylesCardPostNewRecipe.cardContainer}>
      <View style={stylesCardPostNewRecipe.imageContainer}>
        <Image
          style={stylesCardPostNewRecipe.cardImage}
          source={imageUrl ? {uri: imageUrl} : imgThumb}
        />
      </View>
      <View style={stylesCardPostNewRecipe.cardContent}>
        <Text style={stylesCardPostNewRecipe.cardTitleRecipe}>Nasi Goreng</Text>

        <View style={stylesCardPostNewRecipe.cardAuthor}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              columnGap: 8,
            }}>
            <Image
              style={stylesCardPostNewRecipe.authorImage}
              source={imgThumb}
            />
            <Text style={stylesCardPostNewRecipe.textAthor}>
              By James Milner
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              columnGap: 5,
            }}>
            <IconTimer width={17} height={17} />
            <Text style={stylesCardPostNewRecipe.textAthor}>20 mins</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

type PropsFavoriteRecipe = {
  navigation: any;
};
export const CardFavoriteRecipe: React.FC<PropsFavoriteRecipe> = ({
  navigation,
}: any) => {
  return (
    <View style={{marginTop: 10}}>
      <View>
        <LinearGradient
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 1,
            opacity: 0.3,
            borderRadius: 10,
          }}
          colors={['white', 'black']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0}}></LinearGradient>

        <Image
          source={ImgRecipe1}
          style={{
            width: '100%',
            height: 150,
            borderRadius: 10,
            resizeMode: 'cover',
          }}
        />
      </View>

      <View
        style={{
          zIndex: 5,
          position: 'absolute',
          bottom: 10,
          paddingHorizontal: 10,
          width: '100%',
        }}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{
            color: colors.neutralColors.white,
            fontFamily: fonts.smallTextBold.fontFamily,
            fontSize: fonts.smallTextBold.fontSize,
            fontWeight: 'bold',
          }}>
          Semur daging
        </Text>

        <View
          style={{
            paddingTop: 30,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              color: colors.neutralColors.white,
              fontFamily: fonts.smallTextRegular.fontFamily,
              fontSize: fonts.smallTextRegular.fontSize,
              fontWeight: '400',
            }}>
            by Chef Juna
          </Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              columnGap: 5,
            }}>
            <IconTimer width={17} height={17} />
            <Text
              style={{
                color: colors.neutralColors.white,
                fontFamily: fonts.smallTextRegular.fontFamily,
                fontSize: fonts.smallTextRegular.fontSize,
                fontWeight: '400',
              }}>
              20 min
            </Text>
            <View
              style={{
                backgroundColor: colors.neutralColors.white,
                borderRadius: 24 / 2,
                width: 24,
                height: 24,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginLeft: 5,
              }}>
              <IconBookmark width={17} height={17} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const stylesCardPost = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    paddingTop: 100,
    width: 150,
  },
  imageContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
  },
  cardContent: {
    padding: 10,
    paddingTop: 70,
    backgroundColor: colors.neutralColors.gray4,
    borderRadius: 10,
  },
  cardTitle: {
    fontFamily: fonts.smallTextBold.fontFamily,
    fontSize: fonts.smallTextBold.fontSize,
    fontWeight: 'bold',
    color: colors.neutralColors.gray1,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  containerCardAction: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 19,
  },
  cardTextTime: {
    fontFamily: fonts.smallTextRegular.fontFamily,
    fontSize: fonts.smallTextRegular.fontSize,
    fontWeight: 'normal',
    color: colors.neutralColors.gray3,
  },
  cardTimeCook: {
    fontFamily: fonts.smallTextBold.fontFamily,
    fontSize: fonts.smallTextBold.fontSize,
    fontWeight: 'bold',
    color: colors.neutralColors.gray1,
  },
  cardIconBookmark: {
    width: 24,
    height: 24,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const stylesCardPostNewRecipe = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    paddingTop: 45,
    width: 251,
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    right: 10,
    zIndex: 3,
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
  },
  cardContent: {
    backgroundColor: colors.neutralColors.white,
    shadowColor: colors.neutralColors.gray3,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: colors.neutralColors.gray4,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
    padding: 10,
  },
  cardTitleRecipe: {
    fontFamily: fonts.smallTextBold.fontFamily,
    fontSize: fonts.smallTextBold.fontSize,
    fontWeight: 'bold',
    color: colors.neutralColors.gray1,
    marginBottom: 30,
    paddingTop: 20,
  },
  cardAuthor: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textAthor: {
    fontFamily: fonts.snmallerTextRegular.fontFamily,
    fontSize: fonts.snmallerTextRegular.fontSize,
    fontWeight: 'normal',
    color: colors.neutralColors.gray3,
  },
  authorImage: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
  },
});

export default CardPost;
