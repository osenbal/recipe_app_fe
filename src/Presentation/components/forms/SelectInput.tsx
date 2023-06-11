import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';

import {View, Text, StyleSheet} from 'react-native';
import {colors} from '@assets/colors/colors';
import {fonts} from '@assets/fonts/fonts';

import IconDropdown from '@assets/icons/icon_dropdown.svg';
import IconSearch from '@assets/icons/icon_search.svg';

type Props = {
  label: string;
  options: any[];
  search: boolean;
  onSelect: (selectedItem: string, index: number) => void;
  buttonTextAfterSelection: (selectedItem: string, index: number) => string;
  rowTextForSelection: (item: string, index: number) => string;
  style?: any;
};

const SelectInput: React.FC<Props> = ({
  label,
  options,
  search,
  onSelect,
  buttonTextAfterSelection,
  rowTextForSelection,
  style,
}) => {
  return (
    <View style={[style]}>
      <Text style={{marginBottom: 5}}>{label}</Text>

      <SelectDropdown
        buttonStyle={{
          width: '100%',
          borderRadius: 10,
        }}
        dropdownIconPosition="right"
        searchInputStyle={{
          borderWidth: 0,
          borderRadius: 10,
        }}
        dropdownStyle={{
          backgroundColor: colors.neutralColors.white,
          borderRadius: 10,
          elevation: 0,
          width: '85%',
        }}
        renderDropdownIcon={() => {
          return (
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: 'transparent',
              }}>
              <IconDropdown />
            </View>
          );
        }}
        renderSearchInputLeftIcon={() => {
          return <IconSearch />;
        }}
        renderCustomizedRowChild={(item, index) => {
          return (
            <View
              style={{
                height: 40,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                columnGap: 10,
                paddingHorizontal: 5,
              }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                }}></View>
              <Text>{item.name}</Text>
            </View>
          );
        }}
        buttonTextStyle={{
          color: colors.neutralColors.black,
          fontFamily: fonts.normalTextRegular.fontFamily,
          fontSize: fonts.normalTextRegular.fontSize,
          textAlign: 'center',
        }}
        data={options}
        search={search}
        onSelect={onSelect}
        buttonTextAfterSelection={buttonTextAfterSelection}
        rowTextForSelection={rowTextForSelection}
      />
    </View>
  );
};

export default SelectInput;
