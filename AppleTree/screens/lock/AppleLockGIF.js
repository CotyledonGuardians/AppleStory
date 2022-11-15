import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
    resizeMode: 'contain',
    width: wp('100%'),
    height: hp('100%'),
    marginBottom: wp('20%'),
  },
});

export default AppleLockGIF;
