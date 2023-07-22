import React from 'react';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {IIngredient} from '@domain/entity/recipe/structures/GetIngredient';
import {IUnit} from '@domain/entity/recipe/structures/GetRecipeById';
import {colors} from '@assets/colors/colors';

import IconSearch from '@assets/icons/icon_search.svg';
import IconDropdown from '@assets/icons/icon_dropdown.svg';
const ImgThum = require('@assets/images/post/img_thumb.png');

type Props = {
  units: Array<IUnit>;
  valueUnit?: number;
  onChangeUnit?: any;
  label?: string;
};

const InputOnlyUnit: React.FC<Props> = ({units, onChangeUnit, label}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.containerInput}>
        <View style={styles.selectUnit}>
          <SelectDropdown
            data={units}
            search={true}
            searchPlaceHolder="Search unit"
            showsVerticalScrollIndicator={false}
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
            dropdownStyle={{
              backgroundColor: colors.neutralColors.white,
              borderRadius: 10,
              elevation: 0,
            }}
            buttonStyle={{
              borderWidth: 0,
              width: '100%',
              flex: 1,
              backgroundColor: 'transparent',
            }}
            selectedRowStyle={{
              backgroundColor: colors.neutralColors.gray4,
            }}
            onSelect={onChangeUnit}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    marginBottom: 5,
  },
  containerInput: {
    borderWidth: 1,
    borderColor: colors.neutralColors.gray4,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
  },
  indicator: {
    borderWidth: 0.4,
    borderColor: '#000',
    flex: 1,
  },
  textInputIngredient: {
    flex: 3,
  },
  selectUnit: {
    flex: 1,
  },
});

export default InputOnlyUnit;
