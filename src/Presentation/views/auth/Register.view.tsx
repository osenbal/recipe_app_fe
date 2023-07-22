import React, {useState} from 'react';
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {RegisterViewModel} from '@presentation/view-model/auth/Register.view-model';
import LayoutPadding from '@presentation/layouts/LayoutPadding';
import CustomButton from '@presentation/components/buttons/CustomButton';
import CustomInput from '@presentation/components/forms/CustomInput';
import {fonts} from '@assets/fonts/fonts';
import {colors} from '@assets/colors/colors';
import IconArrowLeft from '@assets/icons/icon_arrowLeft.svg';

const RegisterView: React.FC = ({navigation}: any) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    register,
    type,
    setType,
    errors,
  } = RegisterViewModel();

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <LayoutPadding>
            {type == null ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 150,
                }}>
                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: fonts.largeTextBold.fontFamily,
                      fontSize: fonts.largeTextBold.fontSize,
                      fontWeight: '700',
                      color: colors.neutralColors.black,
                    }}>
                    Register As
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: 5,
                      fontFamily: fonts.snmallerTextRegular.fontFamily,
                      fontSize: fonts.snmallerTextRegular.fontSize,
                      fontWeight: '400',
                      color: colors.labelColor,
                    }}>
                    register as a normal user or as a chef
                  </Text>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginTop: 54,
                    rowGap: 9,
                  }}>
                  <CustomButton
                    label="Chef"
                    onPress={() => setType(0)}
                    disabled={false}
                  />
                  <CustomButton
                    backgroundColor={colors.secondaryColors.secondary60}
                    label="Normal User"
                    onPress={() => setType(1)}
                    disabled={false}
                  />
                </View>

                <View style={{marginTop: 156}}>
                  <Text style={styles.alreadyMember}>
                    Already a member?{' '}
                    <Text
                      style={{color: colors.secondaryColors.secondary100}}
                      onPress={() => navigation.navigate('Login')}>
                      Sign In
                    </Text>
                  </Text>
                </View>
              </View>
            ) : (
              <View>
                <View>
                  <Text style={styles.header}>Create an account</Text>
                  <Text style={styles.subHeader}>
                    Let's help you set up your account, it won't take long.
                  </Text>
                </View>

                <View style={styles.container_input}>
                  <CustomInput
                    label="Email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={value => setEmail(value)}
                    error={errors.email}
                  />
                  <CustomInput
                    label="Password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={value => setPassword(value)}
                    secureTextEntry={true}
                    error={errors.password}
                  />
                  <CustomInput
                    label="Confirm Password"
                    placeholder="Enter Confirm Password"
                    value={confirmPassword}
                    onChange={value => setConfirmPassword(value)}
                    secureTextEntry={true}
                    error={errors.confirmPassword}
                  />
                </View>

                <View style={{marginTop: 26}}>
                  <CustomButton
                    label="Create Account"
                    onPress={register}
                    disabled={false}
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

                <View style={{marginTop: 156}}>
                  <Text style={(styles.alreadyMember, {textAlign: 'center'})}>
                    Already a member?{' '}
                    <Text
                      style={{color: colors.secondaryColors.secondary100}}
                      onPress={() => navigation.navigate('Login')}>
                      Sign In
                    </Text>
                  </Text>
                </View>
              </View>
            )}
          </LayoutPadding>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: fonts.largeTextBold.fontFamily,
    fontSize: fonts.largeTextBold.fontSize,
    fontWeight: '700',
    color: colors.neutralColors.black,
  },
  subHeader: {
    marginTop: 5,
    fontFamily: fonts.smallTextRegular.fontFamily,
    fontSize: fonts.smallTextRegular.fontSize,
    fontWeight: '400',
    color: colors.labelColor,
    maxWidth: 195,
  },
  container_input: {
    marginTop: 32,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    rowGap: 20,
  },
  alreadyMember: {
    fontFamily: fonts.smallTextSemiBold.fontFamily,
    fontSize: fonts.smallTextSemiBold.fontSize,
    fontWeight: '600',
    color: colors.neutralColors.black,
  },
});
export default RegisterView;
