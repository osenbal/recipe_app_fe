import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {colors} from '@assets/colors/colors';
import {fonts} from '@assets/fonts/fonts';

const ImgThumb = require('@assets/images/post/img_thumb.png');

type Props = {
  ingredient: string;
  unit: string;
  amount: string | number;
  imgUrlIngredient: string;
};

const ItemIngredient: React.FC<Props> = ({
  ingredient,
  unit,
  amount,
  imgUrlIngredient,
}) => {
  return (
    <View style={styles.item_ingredient}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          columnGap: 16,
        }}>
        <Image
          style={styles.ingredient_img}
          source={imgUrlIngredient ? {uri: imgUrlIngredient} : ImgThumb}
        />
        <Text style={styles.ingredient_name}>{ingredient}</Text>
      </View>
      <Text style={styles.ingredient_units}>
        {amount} {unit}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item_ingredient: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.neutralColors.gray4,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  ingredient_img: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },
  ingredient_name: {
    fontFamily: fonts.normalTextBold.fontFamily,
    fontSize: fonts.normalTextBold.fontSize,
    fontWeight: 'bold',
    color: colors.labelColor,
  },
  ingredient_units: {
    fontFamily: fonts.smallTextRegular.fontFamily,
    fontSize: fonts.smallTextRegular.fontSize,
    fontWeight: '400',
    color: colors.neutralColors.gray3,
  },
});

export default ItemIngredient;
