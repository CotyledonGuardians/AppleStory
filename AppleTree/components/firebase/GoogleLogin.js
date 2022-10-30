import React from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Pressable, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    // removeToken();
    try {
      // console.log('storeToken:idToken:', idToken);
      await AsyncStorage.setItem('idToken', idToken);
    } catch (error) {
      console.log('storeToken error' + error);
    }
  };
  //AsyncStorage 삭제
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('idToken');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Pressable
        onPress={() =>
          onGoogleButtonPress().then(() => {
            props.propFunction(true);
            console.log('Google login success');
          })
        }
        style={styles.container}>
        <Image
          style={styles.icon}
          source={require('../../assets/icons/google.png')}></Image>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  SocialSign: {
    flexDirection: 'row',
    height: 45,
    margin: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 50,
    width: 50,
  },
});
export default GoogleLogin;
