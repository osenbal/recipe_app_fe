import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CustomButton from '../buttons/CustomButton';
import {NavigationContext} from '@react-navigation/native';

const ModalMustLogin: React.FC = () => {
  const navigation = React.useContext(NavigationContext);

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            rowGap: 10,
            flexDirection: 'column',
          }}>
          <Text>You're not loggin</Text>
          <View>
            <CustomButton
              label="Login"
              size="small"
              onPress={() => {
                navigation?.navigate('Login');
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ModalMustLogin;
