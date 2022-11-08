import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Button} from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Register = ({navigation}) => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  //AsyncStorage 저장
  const storeToken = async idToken => {
    // removeToken();
    try {
      // console.log('storeToken:idToken:', idToken);
      await AsyncStorage.setItem('idToken', idToken);
      await AsyncStorage.getItem('idToken');
    } catch (error) {
      console.log('storeToken error' + error);
    }
  };
  const checkRegisterInput = () => {
    if (registerEmail !== null && registerPassword !== null) {
      if (!registerEmail.trim()) {
        Alert.alert('Please enter ID!');
        return false;
      }
      if (!registerPassword.trim()) {
        Alert.alert('Please enter password!');
        return false;
      }
    } else {
      return false;
    }
    return true;
  };
  //회원가입 함수
  const register = async () => {
    if (!checkRegisterInput()) {
      Alert.alert('엽슈!', '모든 값을 입력해야합니다.');
      return;
    }
    try {
      const user = await auth()
        .createUserWithEmailAndPassword(registerEmail, registerPassword)
        .then(() => {
          console.log('User account created & signed in!' + user);
          //AsyncStorage에 idToken저장
          const idToken = auth().currentUser.getIdToken();
          storeToken(idToken);
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
              Alert.alert(
                '유효하지 않은 형식',
                ' 이메일 형식이 유효하지 않습니다.',
              );
              break;
            case 'auth/email-already-in-use':
              Alert.alert('등록된 메일', ' 이미 등록된 이메일입니다.');
              break;
            case 'auth/weak-password':
              Alert.alert(
                '약한 비밀번호',
                '비밀번호는 6글자 이상이어야합니다.',
              );
              break;
            default:
              Alert.alert('error', '알 수 없는 에러 콘솔확인 요망');
              console.log('register::error' + error);
              break;
          }
        });
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
        <Button onPress={() => register()} text="회원 가입" />
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
