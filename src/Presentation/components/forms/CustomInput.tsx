import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {colors} from '@assets/colors/colors';
import {fonts} from '@assets/fonts/fonts';

type Props = {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  error?: string | null;
  style?: any;
  multiline?: boolean;
  numberOfLines?: number;
  onFocusInput?: () => void;
  onBlurInput?: () => void;
  onPress?: () => void;
  onSubmitEditing?: () => void;
  autoFocus?: boolean;
};

const CustomInput: React.FC<Props> = ({
  label,
  value,
  onChange,
  placeholder = 'Enter text',
  secureTextEntry,
  keyboardType = 'default',
  icon,
  iconPosition = 'left',
  error,
  disabled = false,
  style,
  multiline = false,
  numberOfLines = 1,
  onFocusInput,
  onBlurInput,
  onSubmitEditing,
  autoFocus,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
    onFocusInput && onFocusInput();
  };

  const onBlur = () => {
    setIsFocused(false);
    onBlurInput && onBlurInput();
  };

  return (
    <>
      <View style={style}>
        <Text style={styles.label}>{label}</Text>
        <View
          style={[
            styles.input_container,
            styles.bordered,
            isFocused && {borderColor: colors.primaryColors.primary80},
            disabled && {backgroundColor: colors.neutralColors.gray4},
          ]}>
          {iconPosition === 'left' && (
            <View style={styles.container_input_icon}>{icon}</View>
          )}
          <TextInput
            multiline={multiline}
            numberOfLines={numberOfLines}
            selectTextOnFocus={disabled ? false : true}
            editable={disabled ? false : true}
            onFocus={onFocus}
            onBlur={onBlur}
            autoFocus={autoFocus}
            style={[
              styles.input,
              isFocused && {color: colors.neutralColors.black},
              disabled && {color: colors.neutralColors.gray2},
            ]}
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            onChangeText={onChange}
            onSubmitEditing={onSubmitEditing}
          />
          {iconPosition === 'right' && (
            <View style={styles.container_input_icon}>{icon}</View>
          )}
        </View>
        {error != null ? <Text style={styles.errorInput}>{error}</Text> : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 0,
  },
  label: {
    fontFamily: fonts.smallTextRegular.fontFamily,
    fontSize: fonts.smallTextRegular.fontSize,
    color: colors.labelColor,
    marginBottom: 4,
    fontWeight: '400',
  },
  input: {
    flex: 1,
    borderWidth: 0,
    fontFamily: fonts.smallTextRegular.fontFamily,
    fontSize: fonts.smallTextRegular.fontSize,
    color: colors.neutralColors.gray4,
    fontWeight: '400',
  },
  container_input_icon: {
    alignItems: 'center',
    display: 'flex',
    marginRight: 10,
    fontSize: 18,
  },
  bordered: {
    borderWidth: 1.3,
    borderColor: colors.neutralColors.gray4,
    borderRadius: 10,
  },
  errorInput: {
    color: colors.warning,
  },
});

export default CustomInput;
