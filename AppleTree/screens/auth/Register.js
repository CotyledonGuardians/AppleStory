import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Text, TextInput, Image} from 'react-native';
import {TouchableOpacity} from 'react-native';

// import joinImg from '../../assets/pictures/aegomjoin.png';
import {Button} from '../../components/Button';

const Register = () => {
  const [email] = React.useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('AppleTree/assets/pictures/aegomjoin.png')}
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
        <Button onPress={onCertify} text="인증 요청" />
      </View>
      <View style={styles.marginTopBottom}>
        <TouchableOpacity onPress={onBack}>
          <Text
            style={{
              color: '#ABABAB',
              textDecorationLine: 'underline',
              fontFamily: 'UhBee Se_hyun',
            }}>
            뒤로 가기
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const onCertify = () => {
  alert('이멜인증보내기함수');
};

const onBack = () => {
  alert('뒤로가기함수넣기');
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
    // keyboardType: 'email-address',
  },
  image: {
    resizeMode: 'contain',
    marginBottom: 10,
    height: '50%',
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

export default Register;
