import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Image} from 'react-native';

const AppleUnlockGIF = ({navigation, route}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Overview', {
        // screen: 'AppleDetail',
        id: route.params.id,
      });
    }, 3000);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/gifs/appleUnlock.gif')}
        style={styles.appleImage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0CAC7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appleImage: {
    width: 400,
    height: 400,
  },
});

export default AppleUnlockGIF;
