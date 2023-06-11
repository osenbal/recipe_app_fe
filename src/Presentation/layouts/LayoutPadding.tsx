import React from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';

type Props = {
  children: React.ReactNode;
};

const LayoutPadding: React.FC<Props> = ({children}) => {
  return (
    <>
      <View style={styles.container}>{children}</View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
});

export default LayoutPadding;
