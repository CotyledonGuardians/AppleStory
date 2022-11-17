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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
    if (registerEmail === null || !registerEmail.trim()) {
      Alert.alert('이메일을 입력해주세요.');
      return false;
    }

    if (registerPassword === null || !registerPassword.trim()) {
      Alert.alert('비밀번호를 입력해주세요.');
      return false;
    }

    const regex = /\s/g;
    if (
      registerEmail.length !== registerEmail.replace(regex, '').length ||
      registerPassword.length !== registerPassword.replace(regex, '').length
    ) {
      Alert.alert('공백을 제거해주세요.');
      return false;
    }

    return true;
  };

  //회원가입 함수
  const register = async () => {
    if (!checkRegisterInput()) {
      return;
    }
    try {
      const user = await auth()
        .createUserWithEmailAndPassword(registerEmail, registerPassword)
        .then(() => {
          console.log('User account created & signed in!' + user);
          //AsyncStorage에 idToken저장
          // const idToken = auth().currentUser.getIdToken();
          // storeToken(idToken);
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
      <View style={styles.imgBox}>
        <Image
          source={require('AppleTree/assets/pictures/title.png')}
          style={styles.imageTitle}
        />
        <Image
          source={require('AppleTree/assets/pictures/aegomjoin.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.formBox}>
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
        <Button
          style={styles.registerButton}
          onPress={() => register()}
          text="회원 가입"
        />
      </View>
      <View style={styles.loginBox}>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backtxt}>로그인</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 20,
    backgroundColor: '#FBF8F6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  imgBox: {
    flex: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formBox: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    flex: 2,
    alignItems: 'center',
  },
  email: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('1%'),
    width: wp('72%'),
    height: hp('7%'),
    backgroundColor: '#ECE5E0',
    borderRadius: 100,
  },
  registerButton: {
    width: wp('72%'),
    height: hp('7%'),
  },
  input: {
    flex: 0.7,
    backgroundColor: '#ECE5E0',
    borderRadius: 100,
    color: '#4C4036',
    fontSize: wp('3%'),
  },
  image: {
    flex: 7,
    resizeMode: 'contain',
    width: wp('75%'),
    height: wp('75%'),
    marginTop: hp('2%'),
  },
  imageTitle: {
    flex: 3,
    resizeMode: 'contain',
    width: wp('40%'),
    height: wp('35%'),
    marginTop: hp('5%'),
  },
  txt: {
    flex: 0.3,
    textAlign: 'center',
    fontSize: wp('3.5%'),
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#4C4036',
  },
  backtxt: {
    color: '#ABABAB',
    textDecorationLine: 'underline',
    fontFamily: 'UhBee Se_hyun',
    fontSize: wp('3.5%'),
  },
});

export default Register;
