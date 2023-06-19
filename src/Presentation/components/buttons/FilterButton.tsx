import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '@assets/colors/colors';

type Props = {
  onPress?: () => void;
  style?: any;
  outline?: boolean | null;
  content?: React.ReactNode;
};

const FilterButton: React.FC<Props> = ({
  onPress,
  style,
  outline = null,
  content,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        style,
        outline == null
          ? null
          : outline == true
          ? styles.outline_btn
          : styles.fill_btn,
      ]}
      onPress={onPress}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    maxWidth: 80,
    minWidth: 44,
    maxHeight: 44,
    minHeight: 27,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  outline_btn: {
    borderWidth: 1,
    borderColor: colors.primaryColors.primary80,
  },
  fill_btn: {
    backgroundColor: colors.primaryColors.primary100,
  },
});

export default FilterButton;
