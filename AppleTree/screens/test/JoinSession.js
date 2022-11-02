import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {TextInput} from 'react-native';
import {Pressable, Text} from 'react-native';
import {View} from 'react-native-animatable';
import {UseStomp} from '../../stomp';
const JoinSession = ({navigation: {navigate}}) => {
  const [roomId, setRoomID] = useState('');
  const [message, setMessage] = useState([
    {idx: 1, nickname: '쨈송', stage: 'JOINED'},
  ]);
  // useEffect(() => {
  //   ref.scrollIntoView({inline: 'end'});
  // }, [message.length]);
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
  let cnt = 1;
  const addMessage = () => {
    console.log('addMessage');
    setMessage([...message, {idx: cnt++, nickname: '똥쟁이', stage: 'ADDED'}]);
  };
  const scrollViewRef = useRef();
  const stateMessage = (nick, state) => {
    switch (state) {
      case 'JOINED':
        return nick + '님께서 입장 하셨습니다.';
      case 'ADDING':
        return nick + '님께서 사과를 생성 중입니다.';
      case 'ADDED':
        return nick + '님께서 사과 생성을 완료했습니다.';
      case 'CANCELLED':
        return nick + '님께서 방을 나갔습니다.';
      case 'LEFT':
        return nick + '님께서 방을 나갔습니다.';
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <ScrollView
          style={styles.ScrollView}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }>
          {message.map(item => (
            <Text key={item.idx}>
              {stateMessage(item.nickname, item.stage)}
            </Text>
          ))}
        </ScrollView>
      </View>
      <Pressable onPress={() => addMessage()}>
        <Text>메세지 추가</Text>
      </Pressable>
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
  ScrollView: {
    backgroundColor: '#A9A9A9',
  },
  view: {
    margin: 10,
    width: '100%',
    height: 200,
  },
});

export default JoinSession;
