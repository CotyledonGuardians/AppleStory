import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet, Image} from 'react-native';
import {Text, TextInput, Pressable, Alert} from 'react-native';
import {Button} from '../../components/Button';
import auth from '@react-native-firebase/auth';
import GoogleLogin from '../../components/firebase/GoogleLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({navigation}) => {
  //하위컴포넌트(GoogleLogin)=>상위컴포넌트(Login)으로 props 전달하기 위한 함수
  const getLoginState = isLogin => {
    console.log('Login:isLogin: ', isLogin);
  };
  const [email, setEmail] = useState(null);
  const [pwd, setPwd] = useState(null);
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
  //로그인 함수
  const onLogin = async () => {
    if (!checkLoginInput()) {
      Alert.alert('엽슈!', '모든 값을 입력해야합니다.');
      return;
    }
    try {
      const user = await auth().signInWithEmailAndPassword(email, pwd);
      console.log('User account created & signed in!' + user);
      //AsyncStorage에 idToken저장
      const idToken = await auth().currentUser.getIdToken();
      storeToken(idToken);
    } catch (error) {
      console.log('login error : ' + error.message);
    }
    // auth()
    //   .signInWithEmailAndPassword(email, pwd)
    //   .then(data => {
    //     // AsyncStorage.setItem('idToken', JSON.stringify(data.user.getIdToken()));
    //     console.log('onLogin::data' + JSON.stringify(data));
    //     return data.user.getIdToken();
    //   })
    //   .then(idToken => {
    //     console.log('onLogin::idToken' + idToken);
    //   })
    //   .catch(error => {
    //     switch (error.code) {
    //       case 'auth/invalid-email':
    //         setErrMsg('Invalid email');
    //         break;
    //       case 'auth/user-not-found':
    //         setErrMsg('No account with that email was found');
    //         break;
    //       case 'auth/wrong-password':
    //         setErrMsg('Incorrect password');
    //         break;
    //       default:
    //         setErrMsg('exception');
    //         break;
    //     }
    //     Alert.alert(errMsg);
    //   });
  };
  const checkLoginInput = () => {
    if (email !== null && pwd !== null) {
      if (!email.trim()) {
        Alert.alert('Please enter ID!');
        return false;
      }
      if (!pwd.trim()) {
        Alert.alert('Please enter password!');
        return false;
      }
    } else {
      return false;
    }
    return true;
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('AppleTree/assets/pictures/title.png')}
        style={styles.imageTitle}
      />
      <Image
        source={require('AppleTree/assets/pictures/aegoms.png')}
        style={styles.image}
      />
      <View style={styles.marginTopBottom}>
        <View style={styles.txtBox}>
          <Text style={styles.txt}>이메일</Text>
          <TextInput
            value={email}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            style={styles.input}
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
            onChangeText={text => setPwd(text)}
          />
        </View>
        <Button onPress={() => onLogin()} text="로그인" />
      </View>
      <View style={styles.marginTopBottom}>
        <GoogleLogin propFunction={getLoginState} />
      </View>
      <View style={styles.marginTopBottom}>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.undertxt}>이메일로 회원가입하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
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
  txtBox: {
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
    width: '100%',
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
  undertxt: {
    color: '#ABABAB',
    textDecorationLine: 'underline',
    fontFamily: 'UhBee Se_hyun',
  },
});

export default Login;
