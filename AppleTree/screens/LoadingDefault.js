import React from 'react';
import {SafeAreaView, StyleSheet, ActivityIndicator, View} from 'react-native';

const Loading = () => {
  return (
    <SafeAreaView style={styles.backView}>
      <View style={styles.spinnerView}>
        <ActivityIndicator size="large" color={'#4c4036'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backView: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },

  spinnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
