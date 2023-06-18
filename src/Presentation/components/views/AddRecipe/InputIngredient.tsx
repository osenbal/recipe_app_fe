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
  ingredients: Array<IIngredient>;
  units: Array<IUnit>;
  ingredientSelected?: number;
  valueAmount?: string;
  valueUnit?: number;
  onChangeIngredient?: any;
  onChangeAmount?: any;
  onChangeUnit?: any;
  label?: string;
};

const InputIngredient: React.FC<Props> = ({
  ingredients,
  units,
  ingredientSelected,
  valueAmount,
  valueUnit,
  onChangeIngredient,
  onChangeAmount,
  onChangeUnit,
  label,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.containerInput}>
        <View style={styles.textInputIngredient}>
          <SelectDropdown
            data={ingredients}
            search={true}
            searchPlaceHolder="Search ingredients"
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
                    paddingHorizontal: 10,
                  }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                    }}>
                    <Image
                      style={{width: 40, height: 40}}
                      source={{uri: ingredients[index].img_url}}
                    />
                  </View>
                  <Text>{item.name}</Text>
                </View>
              );
            }}
            renderSearchInputLeftIcon={() => {
              return <IconSearch />;
            }}
            buttonStyle={{
              borderWidth: 0,
              width: '100%',
              backgroundColor: 'transparent',
            }}
            selectedRowStyle={{
              backgroundColor: colors.neutralColors.gray4,
            }}
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
            onSelect={onChangeIngredient}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
          />
        </View>
        <TextInput
          style={[styles.indicator]}
          value={valueAmount}
          onChangeText={onChangeAmount}
          keyboardType={'numeric'}
          maxLength={10}
        />
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

export default InputIngredient;
