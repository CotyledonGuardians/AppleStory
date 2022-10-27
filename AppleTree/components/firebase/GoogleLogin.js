import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Pressable, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GoogleLogin = props => {
  //구글소셜로그인
  const onGoogleButtonPress = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    storeToken(idToken);
    return auth().signInWithCredential(googleCredential);
  };
  //AsyncStorage 저장
  const storeToken = async idToken => {
    try {
      // console.log('storeToken: ', idToken);
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
  const [login, setLogin] = useState(null);
  return (
    <>
      <Pressable
        onPress={() =>
          onGoogleButtonPress().then(() => props.propFunction(true))
        }
        style={styles.container}>
        <Text style={styles.SocialText}>구글계정으로 시작하기</Text>
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
  SocialText: {
    fontSize: 23,
  },
});
export default GoogleLogin;
