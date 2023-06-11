import React from 'react';
import {Text, StyleSheet, ScrollView, View, Image} from 'react-native';
import LayoutPadding from '@presentation/layouts/LayoutPadding';
import {CardFavoriteRecipe} from '@presentation/components/card/CardPost';

import {fonts} from '@assets/fonts/fonts';
import {colors} from '@assets/colors/colors';

const MyFavoriteView: React.FC = ({navigation}: any) => {
  return (
    <>
      <ScrollView>
        <LayoutPadding>
          <View>
            <Text style={styles.header_text}>Saved Recipes</Text>

            <CardFavoriteRecipe navigation={navigation} />
            <CardFavoriteRecipe navigation={navigation} />
            <CardFavoriteRecipe navigation={navigation} />
            <CardFavoriteRecipe navigation={navigation} />
          </View>
        </LayoutPadding>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  header_text: {
    fontFamily: fonts.mediumTextBold.fontFamily,
    fontWeight: 'bold',
    fontSize: fonts.mediumTextBold.fontSize,
    color: colors.labelColor,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default MyFavoriteView;
