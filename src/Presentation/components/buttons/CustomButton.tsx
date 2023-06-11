import React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {colors} from '@assets/colors/colors';

type Props = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  rest?: any;
  width?: number | string;
  backgroundColor?: string;
  style?: any;
  labelStyle?: any;
};

const CustomButton: React.FC<Props> = ({
  label = 'Button',
  onPress,
  disabled = false,
  icon,
  iconPosition = 'left',
  size = 'medium',
  rest,
  width,
  backgroundColor,
  style,
  labelStyle,
}) => {
  const [isHover, setIsHover] = React.useState(false);

  const onHoverIn = () => {
    setIsHover(true);
  };

  const onHoverOut = () => {
    setIsHover(false);
  };

  return (
    <>
      <View {...rest}>
        <Pressable
          onPressIn={onHoverIn}
          onPressOut={onHoverOut}
          onPress={onPress}
          style={[
            styles.button,
            isHover === false && disabled === false
              ? {
                  backgroundColor: backgroundColor
                    ? backgroundColor
                    : colors.primaryColors.primary100,
                  opacity: 1,
                }
              : {
                  backgroundColor: backgroundColor
                    ? backgroundColor
                    : colors.primaryColors.primary100,
                  opacity: 0.9,
                },
            disabled && {backgroundColor: colors.neutralColors.gray4},
            size === 'small' && {height: 37},
            size === 'medium' && {height: 54},
            size === 'large' && {height: 60},
            width ? {width: width} : {width: '100%'},
            style,
          ]}>
          {iconPosition === 'left' && icon ? (
            <View style={[styles.container_icon_button, {marginRight: 10}]}>
              {icon}
            </View>
          ) : null}
          <Text style={[{color: colors.neutralColors.white}, labelStyle]}>
            {label}
          </Text>
          {iconPosition === 'right' && icon ? (
            <View style={[styles.container_icon_button, {marginLeft: 10}]}>
              {icon}
            </View>
          ) : null}
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  container_icon_button: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
  },
});

export default CustomButton;
