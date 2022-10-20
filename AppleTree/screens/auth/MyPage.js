import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const MyPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Main</Text>
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

export default MyPage;
