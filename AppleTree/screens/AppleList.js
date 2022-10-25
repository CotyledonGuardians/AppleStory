import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const AppleList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>AppleList</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppleList;
