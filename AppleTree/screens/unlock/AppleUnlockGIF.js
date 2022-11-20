import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const AppleUnlockGIF = ({navigation, route}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Overview', {
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
    resizeMode: 'contain',
    width: wp('170%'),
    height: hp('170%'),
    marginBottom: wp('25%'),
  },
});

export default AppleUnlockGIF;
