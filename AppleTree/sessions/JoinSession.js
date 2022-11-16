import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {TextInput, Image, Alert} from 'react-native';
import {Text} from 'react-native';
import {View} from 'react-native-animatable';
import {UseStomp, DisconnectIfConnected} from '../stomp';
import {SmallButton} from '../components/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const JoinSession = ({navigation, route}) => {
  const [roomId, setRoomID] = useState('');

  function joinLockApple() {
    const connect = () => {
      UseStomp(
        () => {
          navigation.navigate('GroupSession', {roomId: roomId});
        },
        () => {
          Alert.alert('방번호를 다시 확인해주세요.');
          navigation.navigate('JoinSession');
        },
      );
    };
    DisconnectIfConnected(connect, {}, connect);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgBox}>
        <Image
          source={require('../assets/pictures/aegom3.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.formBox}>
        <Text style={styles.txt}>방 번호</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={roomId}
            placeholder="방 번호를 입력하세요"
            onChangeText={text => setRoomID(text)}
          />
        </View>
      </View>
      <View style={styles.buttonWrap}>
        <SmallButton onPress={() => joinLockApple()} text="입장하기" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#FBF8F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgBox: {
    flex: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  formBox: {
    flex: 2,
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: wp('50%'),
    height: wp('60%'),
    marginTop: hp('5%'),
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('1%'),
    width: wp('50%'),
    height: hp('7%'),
    backgroundColor: '#ECE5E0',
    borderRadius: 10,
  },
  txt: {
    textAlign: 'left',
    fontSize: wp('4%'),
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#4C4036',
  },
  input: {
    flex: 0.7,
    width: wp('50%'),
    height: hp('7%'),
    backgroundColor: '#ECE5E0',
    borderRadius: 10,
    justifyContent: 'center',
    color: '#4C4036',
    fontSize: wp('3%'),
    fontFamily: 'UhBee Se_hyun',
    textAlign: 'center',
    margin: hp('2%'),
  },
  buttonWrap: {
    flex: 2,
    justifyContent: 'flex-start',
  },
});

export default JoinSession;
