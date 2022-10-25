import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const GroupCreate = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>GroupCreate</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GroupCreate;
