import React from 'react';
import {Text, View} from 'react-native';
import {colors} from '@assets/colors/colors';

import CustomInput from '@presentation/components/forms/CustomInput';
import CustomButton from '@presentation/components/buttons/CustomButton';

import IconFacebook from '@assets/icons/icon_facebook.svg';

const HomeScreen = ({navigation}: any) => {
  return (
    <>
      <CustomInput
        label="Email"
        iconPosition="left"
        disabled={true}
        icon={
          <View>
            <IconFacebook />
          </View>
        }
      />
      <CustomInput
        label="password"
        iconPosition="left"
        icon={
          <View>
            <IconFacebook />
          </View>
        }
      />

      <CustomButton
        disabled={false}
        label="BUTTON"
        icon={<IconFacebook />}
        iconPosition="left"
      />
      <Text>tet</Text>
    </>
  );
};

const ProfileScreen = ({navigation, route}: any) => {
  return (
    <>
      <Text style={{color: colors.labelColor}}>Profile</Text>
    </>
  );
};

export {HomeScreen, ProfileScreen};
