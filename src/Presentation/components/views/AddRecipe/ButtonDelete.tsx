import React from 'react';
import {View, Pressable} from 'react-native';

import IconCross from '@assets/icons/icon_cross.svg';

type Props = {
  onPress: (index?: any) => void;
  style?: any;
};

const ButtonDelete: React.FC<Props> = ({onPress, style}) => {
  return (
    <View
      style={[
        {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}>
      <Pressable
        onPress={onPress}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 30,
          height: 30,
          borderRadius: 10,
          backgroundColor: 'red',
        }}>
        <IconCross />
      </Pressable>
    </View>
  );
};

export default ButtonDelete;
