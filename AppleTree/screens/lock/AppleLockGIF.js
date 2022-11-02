import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Image} from 'react-native';

const AppleLockGIF = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home', {screen: 'Main'});
    }, 3000);
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/gifs/appleLock.gif')}
        style={styles.appleImage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4F5D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appleImage: {
    width: 400,
    height: 400,
  },
});

export default AppleLockGIF;
