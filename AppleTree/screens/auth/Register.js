import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Text, TextInput, Image, Pressable} from 'react-native';
import auth from '@react-native-firebase/auth';

import {Button} from '../../components/Button';
const Register = ({navigation}) => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  //회원가입 함수
  const register = async () => {
    try {
      const user = await auth().createUserWithEmailAndPassword(
        registerEmail,
        registerPassword,
      );
      console.log('User account created & signed in!' + user);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('AppleTree/assets/pictures/title.png')}
        style={styles.imageTitle}
      />
      <Image
        source={require('AppleTree/assets/pictures/aegomjoin.png')}
        style={styles.image}
      />
      <View style={styles.marginTopBottom}>
        <View style={styles.email}>
          <Text style={styles.txt}>이메일</Text>
          <TextInput
            value={registerEmail}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            style={styles.input}
            placeholder="email"
            onChange={e => setRegisterEmail(e.nativeEvent.text)}
          />
        </View>
        <View style={styles.email}>
          <Text style={styles.txt}>비밀번호</Text>
          <TextInput
            value={registerPassword}
            autoCapitalize={'none'}
            style={styles.input}
            placeholder="password"
            secureTextEntry
            onChange={e => setRegisterPassword(e.nativeEvent.text)}
          />
        </View>
        <Button onPress={() => register()} text="인증 요청" />
      </View>
      <View style={styles.marginTopBottom}>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backtxt}>로그인</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const onCertify = () => {
  alert('이멜인증보내기함수');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF8F6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  marginTopBottom: {
    marginTop: 10,
    marginBottom: 10,
  },
  email: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: 300,
    height: 50,
    backgroundColor: '#ECE5E0',
    borderRadius: 100,
  },
  input: {
    flex: 0.7,
    backgroundColor: '#ECE5E0',
    borderRadius: 100,
    color: '#4C4036',
    fontSize: 15,
  },
  image: {
    resizeMode: 'contain',
    marginBottom: 10,
    height: 260,
  },
  imageTitle: {
    resizeMode: 'contain',
    marginBottom: 10,
    width: 140,
    height: 80,
  },
  button: {
    width: 300,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#373043',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    flex: 0.3,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#4C4036',
  },
  backtxt: {
    color: '#ABABAB',
    textDecorationLine: 'underline',
    fontFamily: 'UhBee Se_hyun',
  },
});

export default Register;
