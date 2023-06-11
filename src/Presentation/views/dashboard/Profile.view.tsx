import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import LayoutPadding from '@presentation/layouts/LayoutPadding';

const ProfileView: React.FC = () => {
  return (
    <ScrollView>
      <LayoutPadding>
        <View>
          <Text>Profile</Text>
        </View>
      </LayoutPadding>
    </ScrollView>
  );
};

export default ProfileView;
