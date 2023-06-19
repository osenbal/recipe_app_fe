import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import LayoutPadding from '@presentation/layouts/LayoutPadding';
import CustomInput from '@presentation/components/forms/CustomInput';
import CustomButton from '@presentation/components/buttons/CustomButton';
import useProfileViewModel from '@presentation/view-model/dashboard/profile.view-model';

import {fonts} from '@assets/fonts/fonts';
import {colors} from '@assets/colors/colors';
import IconThreedots from '@assets/icons/icon_threedots.svg';
import IconLogout from '@assets/icons/icon_logout.svg';

const imgAvatar = require('@assets/images/avatar/img_avatar2.png');

const ProfileView: React.FC = ({navigation}: any) => {
  const {
    isEdit,
    setIsEdit,
    showModalOption,
    toggleModalOption,
    setShowModalOption,
    handleLogout,
    user,
    isAuthenticated,
  } = useProfileViewModel();

  return (
    <ScrollView>
      <LayoutPadding>
        {isAuthenticated === true ? (
          <View style={{position: 'relative'}}>
            <Pressable
              onPress={toggleModalOption}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                borderRadius: 5,
                zIndex: 5,
              }}>
              <View>
                <IconThreedots width={30} height={30} />
              </View>
            </Pressable>

            <Text
              style={{
                textAlign: 'center',
                fontFamily: fonts.mediumTextBold.fontFamily,
                fontSize: fonts.mediumTextBold.fontSize,
                fontWeight: 'bold',
                color: colors.labelColor,
              }}>
              Profile
            </Text>

            <View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Image
                  style={styles.image_profile}
                  source={
                    user?.profile_url ? {uri: user.profile_url} : imgAvatar
                  }
                />
              </View>

              <View style={{marginTop: 20}}>
                <CustomInput
                  label="Name"
                  value={user?.name}
                  disabled={isEdit === false ? true : false}
                />
              </View>

              <View style={{marginTop: 200}}>
                <CustomButton
                  label="Edit"
                  size="medium"
                  onPress={() => {
                    setIsEdit(true);
                  }}
                />
              </View>
            </View>
          </View>
        ) : (
          <></>
        )}
      </LayoutPadding>
      {isAuthenticated == true ? (
        <Modal
          visible={showModalOption}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowModalOption(false)}>
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPressOut={() => setShowModalOption(false)}>
            <View
              style={{
                position: 'absolute',
                right: 30,
                top: 70,
                padding: 10,
                width: 100,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                borderRadius: 8,
                backgroundColor: colors.error,
              }}>
              <Pressable
                onPress={() => {
                  setShowModalOption(false);
                  handleLogout();
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: colors.neutralColors.white,
                    fontFamily: fonts.smallTextBold.fontFamily,
                    fontSize: fonts.smallTextBold.fontSize,
                    fontWeight: 'bold',
                  }}>
                  Logout
                </Text>

                <IconLogout width={20} height={20} />
              </Pressable>
            </View>
          </TouchableOpacity>
        </Modal>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image_profile: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
});

export default ProfileView;
