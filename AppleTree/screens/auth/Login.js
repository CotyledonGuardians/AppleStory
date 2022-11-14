import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet, Image} from 'react-native';
import {Text, TextInput, Pressable, Alert} from 'react-native';
import {Button} from '../../components/Button';
import auth from '@react-native-firebase/auth';
import GoogleLogin from '../../components/firebase/GoogleLogin';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Login = ({navigation}) => {
  //하위컴포넌트(GoogleLogin)=>상위컴포넌트(Login)으로 props 전달하기 위한 함수
  const getLoginState = isLogin => {
    console.log('Login:isLogin: ', isLogin);
  };
  const [email, setEmail] = useState(null);
  const [pwd, setPwd] = useState(null);

  //로그인 함수
  const onLogin = async () => {
    if (!checkLoginInput()) {
      Alert.alert('유효하지 않은 입력', '모든 값을 입력해야합니다.');
      return;
    }
    try {
      await auth()
        .signInWithEmailAndPassword(email, pwd)
        .then(() => {})
        .catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
              Alert.alert(
                '유효하지 않은 형식',
                '이메일 형식이 유효하지 않습니다.',
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
            case 'auth/user-not-found':
              Alert.alert('알 수 없는 사용자', '회원가입을 해주세요.');
              break;
            case 'auth/wrong-password':
              Alert.alert('유효하지 않은 비밀번호', '비밀번호를 확인하세요.');
              break;
            default:
              Alert.alert('error', '알 수 없는 에러 콘솔확인 요망');
              console.log('register::error' + error);
              break;
          }
        });
    } catch (error) {
      console.log('login error : ' + error.message);
    }
  };
  const checkLoginInput = () => {
    if (email !== null && pwd !== null) {
      if (!email.trim()) {
        Alert.alert('빈 값', '이메일을 입력해주세요.');
        return false;
      }
      if (!pwd.trim()) {
        Alert.alert('빈 값', '비밀번호를 입력해주세요.');
        return false;
      }
    } else {
      return false;
    }
    return true;
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgBox}>
        <Image
          source={require('AppleTree/assets/pictures/title.png')}
          style={styles.imageTitle}
        />
        <Image
          source={require('AppleTree/assets/pictures/aegoms.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.formBox}>
        <View style={styles.txtBox}>
          <Text style={styles.txt}>이메일</Text>
          <TextInput
            value={email}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            style={styles.input}
            placeholder="email"
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.txtBox}>
          <Text style={styles.txt}>비밀번호</Text>
          <TextInput
            value={pwd}
            autoCapitalize={'none'}
            style={styles.input}
            secureTextEntry
            placeholder="password"
            onChangeText={text => setPwd(text)}
          />
        </View>
        <Button onPress={() => onLogin()} text="로그인" />
      </View>
      <View style={styles.oneBox}>
        <GoogleLogin propFunction={getLoginState} />
      </View>
      <View style={styles.oneBox}>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.undertxt}>이메일로 회원가입하기</Text>
        </Pressable>
      </View>
      <View style={styles.oneBox} />
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
    flex: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formBox: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  oneBox: {
    flex: 1,
    justifyContent: 'center',
  },
  txtBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('1%'),
    width: wp('72%'),
    height: hp('7%'),
    backgroundColor: '#ECE5E0',
    borderRadius: 100,
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
    width: wp('85%'),
    marginTop: hp('2%'),
  },
  imageTitle: {
    flex: 3,
    resizeMode: 'contain',
    width: wp('40%'),
    height: wp('35%'),
    marginTop: hp('5%'),
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
    fontSize: wp('3.5%'),
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#4C4036',
  },
  undertxt: {
    color: '#ABABAB',
    textDecorationLine: 'underline',
    fontFamily: 'UhBee Se_hyun',
    paddingTop: wp('3%'),
    fontSize: wp('3.5%'),
  },
});

export default Login;
