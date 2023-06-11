import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import AsyncStorageService from '@presentation/storage/asyncStorage';
import {colors} from '@assets/colors/colors';
import {fonts} from '@assets/fonts/fonts';
import CustomButton from '@presentation/components/buttons/CustomButton';
import IconArrowLeft from '@assets/icons/icon_arrowLeft.svg';

const onboardingImage1 = require('@assets/images/onboarding_1.png');
const onboardingImage2 = require('@assets/images/onboarding_2.png');
const onboardingImage3 = require('@assets/images/onboarding_3.png');

const onboardingContent = [
  {
    title: 'Welcome',
    desc: 'Welcome to MuantApp, start your healthy lifestyle with us!',
    img: onboardingImage1,
  },
  {
    title: 'Easily find the recipe you want',
    desc: 'Search for recipes based on your preferences and nutritional needs.',
    img: onboardingImage2,
  },
  {
    title: 'Save your favorite recipes for quick access.',
    desc: 'Save your favorite recipes for quick access.',
    img: onboardingImage3,
  },
];

const Onboarding: React.FC = ({navigation}: any) => {
  const [step, setStep] = React.useState<number>(0);

  const handleNext = async (): Promise<void> => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const navigateToHome = async (): Promise<void> => {
    navigation.navigate('DashboardStack');
    // set onboarding to true if user has finished onboarding
    AsyncStorageService.setItem('@onboarding', 'true');
  };

  const navigateToLogin = async (): Promise<void> => {
    navigation.navigate('Login');
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.container_img_onboarding}>
              {step > 0 && step <= 2 ? (
                <Pressable
                  onPress={() => setStep(step - 1)}
                  style={styles.btn_back}>
                  <View>
                    <IconArrowLeft />
                  </View>
                </Pressable>
              ) : null}
              <Image
                style={styles.img_onboarding}
                source={onboardingContent[step].img}></Image>
            </View>

            <View style={styles.container_content_onboarding}>
              <Text style={styles.title_onboarding}>
                {onboardingContent[step].title}
              </Text>
              <Text style={styles.desc_onboarding}>
                {onboardingContent[step].desc}
              </Text>
              {step < 2 && step >= 0 ? (
                <View
                  style={{
                    marginTop: 64,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomButton
                    onPress={handleNext}
                    size="medium"
                    width={243}
                    label="Next"
                  />
                </View>
              ) : (
                <View
                  style={{
                    marginTop: 32,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    rowGap: 12,
                  }}>
                  <CustomButton
                    label="Start Cooking"
                    size="small"
                    width={243}
                    onPress={navigateToHome}
                  />
                  <CustomButton
                    label="Login"
                    size="small"
                    width={243}
                    onPress={navigateToLogin}
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 30,
    backgroundColor: colors.neutralColors.white,
  },
  btn_back: {
    borderWidth: 1,
    borderColor: colors.neutralColors.gray4,
    borderRadius: 4,
    position: 'absolute',
    top: 18,
    left: 18,
    width: 44,
    height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_img_onboarding: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 116,
    paddingBottom: 116,
    backgroundColor: colors.primaryColors.primary20,
    maxHeight: 419,
  },
  img_onboarding: {
    width: 312,
  },
  container_content_onboarding: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  title_onboarding: {
    textAlign: 'center',
    fontSize: fonts.normalTextBold.fontSize,
    fontFamily: fonts.normalTextBold.fontFamily,
    fontWeight: 'bold',
    color: colors.neutralColors.black,
  },
  desc_onboarding: {
    marginTop: 20,
    textAlign: 'center',
    fontFamily: fonts.smallTextRegular.fontFamily,
    fontSize: fonts.smallTextRegular.fontSize,
    fontWeight: 'normal',
    color: colors.neutralColors.black,
  },
});

export default Onboarding;
