import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomButton from '@presentation/components/buttons/CustomButton';
import FilterButton from '@presentation/components/buttons/FilterButton';

import {colors} from '@assets/colors/colors';
import {fonts} from '@assets/fonts/fonts';

type Props = {
  snapPoints: Array<string | number>;
  bottomSheetRef: React.RefObject<BottomSheet>;
  handleSheetChanges: (index: number) => void;
  renderBackdrop: any;
  handleFilter: () => void;
  filterTime: string | undefined;
  setFilterTime: (time: 'newest' | 'oldest') => void;
  filterCategory: number | undefined;
  setFilterCategory: (category: number | undefined) => void;
  filterDish: number | undefined;
  setFilterDish: (dish: number | undefined) => void;
  filterTimeData: Array<string>;
  categories: Array<any>;
  dish: Array<any>;
};

const FilterBottomSheet: React.FC<Props> = ({
  snapPoints,
  bottomSheetRef,
  handleSheetChanges,
  renderBackdrop,
  handleFilter,
  filterTime,
  setFilterTime,
  filterCategory,
  setFilterCategory,
  filterDish,
  setFilterDish,
  filterTimeData,
  categories,
  dish,
}) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <View style={styles.container_bottomSheet}>
        <Text style={[styles.header_textFilter, {textAlign: 'center'}]}>
          Filter Search
        </Text>
        <View style={{marginTop: 20}}>
          <Text style={styles.header_textFilter}>Time</Text>
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              columnGap: 10,
              marginTop: 10,
              flexWrap: 'wrap',
              rowGap: 10,
            }}>
            {filterTimeData.map((item: any, index: number) => {
              return (
                <FilterButton
                  key={index}
                  onPress={() => setFilterTime(item)}
                  style={styles.filter_btn}
                  outline={filterTime === item ? false : true}
                  content={
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        fontFamily: fonts.smallTextRegular.fontFamily,
                        fontSize: fonts.smallTextRegular.fontSize,
                        fontWeight: '400',
                        color:
                          filterTime === item
                            ? colors.neutralColors.white
                            : colors.neutralColors.black,
                      }}>
                      {item}
                    </Text>
                  }
                />
              );
            })}
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.header_textFilter}>Category</Text>
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              columnGap: 10,
              marginTop: 10,
              flexWrap: 'wrap',
              rowGap: 10,
            }}>
            {categories.map((item: any, index: number) => {
              return (
                <FilterButton
                  key={index}
                  onPress={() =>
                    item.id === filterCategory
                      ? setFilterCategory(undefined)
                      : setFilterCategory(item.id)
                  }
                  style={styles.filter_btn}
                  outline={filterCategory === item.id ? false : true}
                  content={
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        fontFamily: fonts.smallTextRegular.fontFamily,
                        fontSize: fonts.smallTextRegular.fontSize,
                        fontWeight: '400',
                        color:
                          filterCategory === item.id
                            ? colors.neutralColors.white
                            : colors.neutralColors.black,
                      }}>
                      {item.name}
                    </Text>
                  }
                />
              );
            })}
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.header_textFilter}>Dish</Text>
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              columnGap: 10,
              marginTop: 10,
              flexWrap: 'wrap',
              rowGap: 10,
            }}>
            {dish.map((item: any, index: number) => {
              return (
                <FilterButton
                  key={index}
                  style={styles.filter_btn}
                  onPress={() =>
                    item.id === filterDish
                      ? setFilterDish(undefined)
                      : setFilterDish(item.id)
                  }
                  outline={filterDish === item.id ? false : true}
                  content={
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        fontFamily: fonts.smallTextRegular.fontFamily,
                        fontSize: fonts.smallTextRegular.fontSize,
                        fontWeight: '400',
                        color:
                          filterDish === item.id
                            ? colors.neutralColors.white
                            : colors.neutralColors.black,
                      }}>
                      {item.name}
                    </Text>
                  }
                />
              );
            })}
          </View>
        </View>

        <View style={styles.container_btnFilter}>
          <CustomButton
            onPress={handleFilter}
            style={{marginTop: 31}}
            width={174}
            label="Filter"
            size="small"
          />
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container_bottomSheet: {
    flex: 1,
    height: 500,
    padding: 30,
  },
  filter_btn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 27,
  },
  header_textFilter: {
    fontFamily: fonts.smallTextBold.fontFamily,
    fontSize: fonts.smallTextBold.fontSize,
    fontWeight: 'bold',
    color: colors.neutralColors.black,
  },
  container_btnFilter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FilterBottomSheet;
