import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Text, TextInput, Image} from 'react-native';
import {Pressable} from 'react-native';

// import joinImg from '../../assets/pictures/aegomjoin.png';
import {Button} from '../../components/Button';
// import Register from './Register';

const Login = ({navigation}) => {
  const [email] = React.useState(null);

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
        <View style={styles.email}>
          <Text
            style={{
              flex: 0.3,
              textAlign: 'center',
              fontSize: 15,
              fontFamily: 'UhBee Se_hyun Bold',
              color: '#4C4036',
            }}>
            이메일
          </Text>
          <TextInput
            value={email}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            style={styles.input}
          />
        </View>
        <Button onPress={onLogin} text="로그인" />
      </View>
      <View style={styles.marginTopBottom}>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text
            style={{
              color: '#ABABAB',
              textDecorationLine: 'underline',
              fontFamily: 'UhBee Se_hyun',
            }}>
            이메일로 회원가입 하기
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const onLogin = () => {
  alert('로긘');
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
});

export default Login;
