import React from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const GoogleLogin = props => {
  //구글소셜로그인
  const onGoogleButtonPress = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    //로컬 스토리지에 저장
    storeToken(idToken);
    return auth().signInWithCredential(googleCredential);
  };
  //AsyncStorage 저장
  const storeToken = async idToken => {
    // console.log('storeToken');
    try {
      // console.log('googleLogin:idToken:', idToken);
      await AsyncStorage.setItem('idToken', idToken);
    } catch (error) {
      console.log('googleLogin::storeToken error ' + error);
    }
  };
  return (
    <TouchableOpacity
      onPress={
        () => onGoogleButtonPress()
        // .then(() => {
        //   props.propFunction(true);
        // })
      }>
      <Image
        style={styles.icon}
        source={require('../../assets/icons/google.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: wp('10%'),
    width: wp('10%'),
  },
});
export default GoogleLogin;
