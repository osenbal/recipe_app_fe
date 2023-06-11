import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {fonts} from '@assets/fonts/fonts';
import {colors} from '@assets/colors/colors';

type Props = {
  order: string | number;
  instruction: string;
};

const ItemProcedure: React.FC<Props> = ({order, instruction}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.order}>Step {order}</Text>
        <Text style={styles.instruction}>{instruction}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutralColors.gray4,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  order: {
    fontFamily: fonts.smallTextBold.fontFamily,
    fontSize: fonts.snmallerTextRegular.fontSize,
    fontWeight: 'bold',
    color: colors.labelColor,
  },
  instruction: {
    marginTop: 5,
    fontFamily: fonts.smallTextRegular.fontFamily,
    fontSize: fonts.snmallerTextRegular.fontSize,
    fontWeight: '400',
    color: colors.neutralColors.gray3,
  },
});

export default ItemProcedure;
