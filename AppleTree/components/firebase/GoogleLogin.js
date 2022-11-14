import React from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { err } from 'react-native-svg/lib/typescript/xml';

const GoogleLogin = props => {
  //구글소셜로그인
  const onGoogleButtonPress = async () => {
    // Network check
    const state = await NetInfo.fetch().catch((err) => {
      console.log("err in getting network info:::", err);
    });

    if(!state.isConnected) {
      Alert.alert('네트워크 연결 상태를 확인해주세요.');
      return;
    }

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
      {/* <Image
        style={styles.icon}
        source={require('../../assets/icons/googleIcon.png')}
      />
      <Text style={styles.buttonText}>구글로 로그인하기</Text> */}
    </TouchableOpacity>
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
  buttonShape: {
    width: 300,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#4c4036',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'UhBee Se_hyun Bold',
    marginLeft: 10,
  },
});
export default GoogleLogin;
