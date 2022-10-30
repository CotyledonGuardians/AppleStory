import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Image} from 'react-native';

const AppleUnlockGIF = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home', {screen: 'Main'});
    }, 3000);
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/gifs/appleUnlock.gif')}
        style={{width: 400, height: 400}}
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
});

export default AppleUnlockGIF;
