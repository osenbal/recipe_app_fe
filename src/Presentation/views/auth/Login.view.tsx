import React from 'react';
import {
  Text,
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import FilterButton from '@presentation/components/buttons/FilterButton';
import LayoutPadding from '@presentation/layouts/LayoutPadding';
import CustomInput from '@presentation/components/forms/CustomInput';
import CustomButton from '@presentation/components/buttons/CustomButton';
import LoginViewModel from '@presentation/view-model/auth/Login.view-model';
import {fonts} from '@assets/fonts/fonts';
import {colors} from '@assets/colors/colors';

import IconArrowLeft from '@assets/icons/icon_arrowLeft.svg';
import IconEyeOpen from '@assets/icons/icon_eyeOpen.svg';
import IconEyeClose from '@assets/icons/icon_eyeClose.svg';

const LoginView: React.FC = ({navigation}: any) => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    hiddenPassword,
    toggleHiddenPassword,
    erros,
    isLoadingLogin,
    login,
  } = LoginViewModel();

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <LayoutPadding>
            <View style={styles.container}>
              <Text style={styles.header}>Hello, </Text>
              <Text style={styles.subHeader}>Welcome back!</Text>
            </View>

            <View style={styles.container_input}>
              <CustomInput
                value={email}
                onChange={value => setEmail(value)}
                label="Email"
                placeholder="Enter Email"
                error={erros.email}
              />
              <CustomInput
                value={password}
                onChange={value => setPassword(value)}
                secureTextEntry={hiddenPassword}
                label="Password"
                placeholder="Enter Password"
                iconPosition="right"
                error={erros.password}
                icon={
                  <View>
                    {hiddenPassword ? (
                      <IconEyeClose onPress={toggleHiddenPassword} />
                    ) : (
                      <IconEyeOpen onPress={toggleHiddenPassword} />
                    )}
                  </View>
                }
              />
            </View>
            <View style={{marginTop: 20}}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </View>

            <View style={{marginTop: 25}}>
              <CustomButton
                label="Login"
                onPress={login}
                disabled={isLoadingLogin ? true : false}
                iconPosition="right"
                icon={
                  <View>
                    <IconArrowLeft
                      stroke={colors.neutralColors.white}
                      style={{
                        transform: [{rotate: '180deg'}],
                      }}
                    />
                  </View>
                }
              />
            </View>

            <View
              style={{
                marginTop: 70,
              }}>
              <Text style={styles.dontHaveAccount}>
                Don't have an account?
                <Text
                  style={{color: colors.secondaryColors.secondary100}}
                  onPress={() => navigation.navigate('Register')}>
                  {' '}
                  Sign up
                </Text>
              </Text>
            </View>

            <View
              style={{
                marginTop: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <FilterButton
                style={{
                  maxWidth: 200,
                }}
                outline={true}
                onPress={() => navigation.navigate('Home')}
                content={
                  <View>
                    <Text>Continue Without Login</Text>
                  </View>
                }
              />
            </View>
          </LayoutPadding>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  container_input: {
    marginTop: 57,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    rowGap: 30,
  },
  header: {
    fontFamily: fonts.headerTextBold.fontFamily,
    fontSize: fonts.headerTextBold.fontSize,
    fontWeight: 'bold',
    color: colors.neutralColors.black,
  },
  subHeader: {
    fontFamily: fonts.largeTextRegular.fontFamily,
    fontSize: fonts.largeTextRegular.fontSize,
    color: colors.labelColor,
  },
  forgotPassword: {
    fontFamily: fonts.smallTextRegular.fontFamily,
    fontSize: fonts.smallTextRegular.fontSize,
    fontWeight: '400',
    color: colors.secondaryColors.secondary100,
  },
  dontHaveAccount: {
    fontFamily: fonts.smallTextRegular.fontFamily,
    fontSize: fonts.smallTextRegular.fontSize,
    fontWeight: '500',
    color: colors.labelColor,
    textAlign: 'center',
  },
});

export default LoginView;
