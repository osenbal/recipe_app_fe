import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import LayoutPadding from '@presentation/layouts/LayoutPadding';
import {CardFavoriteRecipe} from '@presentation/components/card/CardPost';
import useMyFavoriteViewModel from '@presentation/view-model/dashboard/my-favorite.view-model';
import {IFavorite} from '@domain/entity/favorite/structures/GetFavorite';
import CustomButton from '@presentation/components/buttons/CustomButton';

import {fonts} from '@assets/fonts/fonts';
import {colors} from '@assets/colors/colors';

const MyFavoriteView: React.FC = ({navigation}: any) => {
  const {myFavorite, isAuthenticated, removeFavorite, refreshing, onRefresh} =
    useMyFavoriteViewModel();

  return (
    <>
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <LayoutPadding>
            <View style={styles.container}>
              <Text style={styles.header_text}>Saved Recipes</Text>
              {isAuthenticated ? (
                myFavorite.length > 0 ? (
                  myFavorite.map((item: IFavorite, index: number) => {
                    return (
                      <CardFavoriteRecipe
                        key={index}
                        onPress={() =>
                          navigation.navigate('DetailRecipe', {
                            recipeId: item?.recipe?.id,
                          })
                        }
                        onPressFavorite={() => removeFavorite(item?.recipe_id)}
                        title={item?.recipe?.title}
                        thumbnail_url={item?.recipe?.thumbnail_url}
                        cooking_time={item?.recipe?.cookingTime}
                        chef_email={item?.recipe?.chef?.user?.email}
                        chef_name={item?.recipe?.chef?.name}
                      />
                    );
                  })
                ) : (
                  <Text style={{textAlign: 'center', marginTop: 20}}>
                    You don't have any saved recipes
                  </Text>
                )
              ) : (
                <>
                  <Text style={{textAlign: 'center', marginTop: 20}}>
                    Please login to see your saved recipes
                  </Text>
                  <View
                    style={{
                      marginTop: 20,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <CustomButton
                      width={200}
                      label="Login"
                      size="small"
                      onPress={() => navigation.navigate('Login')}
                    />
                  </View>
                </>
              )}
            </View>
          </LayoutPadding>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
  },
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
