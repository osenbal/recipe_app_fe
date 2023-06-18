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
  handleFavorite?: () => void;
};
const CardPost: React.FC<Props> = ({
  id,
  style,
  title,
  time,
  imageUrl,
  isFavorited = false,
  onPress,
  handleFavorite,
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
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
              }}>
              <View>
                <Text style={stylesCardPost.cardTextTime}>Time</Text>
                <Text style={stylesCardPost.cardTimeCook}>{time}</Text>
              </View>

              <View>
                <Pressable
                  onPress={handleFavorite}
                  style={[
                    stylesCardPost.cardIconBookmark,
                    {
                      backgroundColor: isFavorited
                        ? colors.primaryColors.primary100
                        : colors.neutralColors.white,
                    },
                  ]}>
                  <IconBookmark width={16} height={16} />
                </Pressable>
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
  onPress?: () => void;
  onPressFavorite?: () => void;
  title: string;
  cooking_time: number;
  chef_name: string;
  chef_email: string;
  thumbnail_url: string | null;
};
export const CardFavoriteRecipe: React.FC<PropsFavoriteRecipe> = ({
  onPress,
  onPressFavorite,
  title,
  cooking_time,
  chef_name,
  chef_email,
  thumbnail_url,
}) => {
  return (
    <Pressable style={{marginTop: 10}} onPress={onPress}>
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
          source={thumbnail_url ? {uri: thumbnail_url} : ImgRecipe1}
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
          {title}
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
            by {chef_name || chef_email}
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
              {cooking_time} min
            </Text>
            <Pressable
              onPress={onPressFavorite}
              style={{
                backgroundColor: colors.primaryColors.primary100,
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
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

type PropsCardPostSearchResult = {
  thumbnail_url: string;
  title: string;
  chef_name: string;
  chef_email: string;
  onPress: () => void;
};

export const CardPostSearchResult: React.FC<PropsCardPostSearchResult> = ({
  thumbnail_url,
  title,
  chef_name,
  chef_email,
  onPress,
}) => {
  return (
    <Pressable style={stylesCardSearch.cardRecipe} onPress={onPress}>
      <View style={stylesCardSearch.card_thumbnail}>
        <LinearGradient
          style={stylesCardSearch.overlayImg}
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']}
        />
        <Image
          style={stylesCardSearch.card_image}
          source={thumbnail_url ? {uri: thumbnail_url} : imgThumb}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
        }}>
        <Text style={stylesCardSearch.title_recipe}>{title}</Text>
        <Text style={stylesCardSearch.author_recipe}>
          {chef_name || chef_email}
        </Text>
      </View>
    </Pressable>
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
    height: 170,
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
    // marginTop: 19,
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: '100%',
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

const stylesCardSearch = StyleSheet.create({
  cardRecipe: {
    flex: 1,
    borderRadius: 10,
    flexBasis: '48%',
  },
  card_thumbnail: {
    borderRadius: 10,
  },
  overlayImg: {
    position: 'absolute',
    width: '100%',
    height: 150,
    zIndex: 1,
    borderRadius: 10,
  },
  card_image: {
    width: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
    height: 150,
  },
  title_recipe: {
    fontFamily: fonts.snmallerTextRegular.fontFamily,
    fontSize: fonts.snmallerTextRegular.fontSize,
    fontWeight: 'bold',
    color: colors.neutralColors.white,
  },
  author_recipe: {
    fontFamily: fonts.smallerLabelRegular.fontFamily,
    fontSize: fonts.smallerLabelRegular.fontSize,
    fontWeight: '400',
    color: colors.neutralColors.gray3,
  },
});

export default CardPost;
