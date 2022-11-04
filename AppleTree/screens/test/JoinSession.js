import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {TextInput, Image} from 'react-native';
import {Text} from 'react-native';
import {View} from 'react-native-animatable';
import {UseStomp} from '../../stomp';
import {SmallButton} from '../../components/Button';
const JoinSession = ({navigation: {navigate}}) => {
  const [roomId, setRoomID] = useState('');
  function joinLockApple() {
    console.log('roomId', roomId);
    UseStomp(
      () => {
        console.log('session join succeed : ', roomId);
        navigate('GroupSession', {roomId: roomId});
      },
      () => {
        console.log('session join failed', roomId);
        alert('방번호를 다시 확인해주세요');
        navigate('GroupSession');
      },
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/pictures/aegom3.png')}
        style={styles.image}
      />
      <View style={styles.marginTopBottom}>
        <Text style={styles.txt}>방 번호</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={roomId}
            placeholder="방 번호를 입력하세요"
            onChangeText={text => setRoomID(text)}
          />
        </View>
        <View style={styles.buttonWrap}>
          <SmallButton onPress={() => joinLockApple()} text="입장하기" />
        </View>
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
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: '#ECE5E0',
    borderRadius: 10,
    justifyContent: 'center',
    color: '#4C4036',
    fontSize: 13,
    fontFamily: 'UhBee Se_hyun',
    textAlign: 'center',
    margin: 10,
  },
  txt: {
    fontSize: 15,
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#4C4036',
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: 300,
    height: 50,
    backgroundColor: '#ECE5E0',
    borderRadius: 10,
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    marginBottom: 10,
    height: 260,
  },
});

export default JoinSession;
