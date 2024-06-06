import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const HeaderTitle = () => {
  return (
    <View style={styles.headerTitleContainer}>
      <Image source={require('../../assets/piggy-bank.png')} style={styles.headerLogo} />
      <Text style={styles.headerTitle}>Budget Bunny</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 30,
    height: 30,
    marginRight: 8,
    textAlign: 'center',
    fontFamily: 'sans-serif-medium'
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default HeaderTitle;
