import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {TextInput} from 'react-native';
import {Pressable, Text} from 'react-native';
import {View} from 'react-native-animatable';
import {UseStomp} from '../../stomp';
const JoinSession = ({navigation: {navigate}}) => {
  const [roomId, setRoomID] = useState('');
  function joinLockApple() {
    console.log('joinLockApple');
    console.log('roomId', roomId);
    UseStomp(
      () => {
        console.log('make room succeed', roomId);
        navigate('GroupSession', {roomId: roomId});
      },
      () => {
        console.log('make room failed', roomId);
        navigate('GroupSession');
      },
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          value={roomId}
          placeholder="방 번호를 입력하세요"
          onChangeText={text => setRoomID(text)}
        />
        <Pressable onPress={() => joinLockApple}>
          <Text>세션에 참여하기</Text>
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
});

export default JoinSession;
