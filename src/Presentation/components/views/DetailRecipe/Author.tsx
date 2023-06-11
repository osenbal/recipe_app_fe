import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {fonts} from '@assets/fonts/fonts';
import {colors} from '@assets/colors/colors';
const ImgThumb300X150 = require('@assets/images/post/img_thumb_300x150.png');

type Props = {
  img_urlUser: string;
  name: string;
};
const AuthorRecipe: React.FC<Props> = ({img_urlUser, name}) => {
  return (
    <View style={styles.author}>
      <Image
        style={styles.img_author}
        source={img_urlUser ? {uri: img_urlUser} : ImgThumb300X150}
      />
      <Text style={styles.name_author}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  author: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 17,
    justifyContent: 'flex-start',
    columnGap: 11,
  },
  img_author: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  name_author: {
    fontFamily: fonts.smallTextBold.fontFamily,
    fontSize: fonts.smallTextBold.fontSize,
    fontWeight: '700',
    color: colors.labelColor,
  },
});

export default AuthorRecipe;
