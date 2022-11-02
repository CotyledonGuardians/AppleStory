import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {SmallButton, Button} from '../components/Button';
import {
  SubscribeIfConnected,
  DisconnectIfConnected,
  SendIfSubscribed,
} from '../stomp/';
const GroupSession = ({navigation: {navigate}, route}) => {
  // set copy text
  const [copiedText, setCopiedText] = useState(null);
  // unlockGIF loading
  const [ready, setReady] = useState(true);
  // session nickname
  const [nickname, setNickname] = useState(null);
  // session stage
  const [stage, setStage] = useState(null);
  // session total cnt
  const [total, setTotal] = useState(null);
  // session compelete cnt
  const [compelete, setCompelete] = useState(null);
  // session message
  const [message, setMessage] = useState([
    {idx: 1, nickname: 'nickname', stage: 'JOINED'},
  ]);
  // 방장인지체크 추후 변경
  let isOwner = false;
  // 복사할 앱 링크 추후 변경
  let sessionLink = 'https://복사한-url-키키키키';
  // room id
  const {roomId} = route.params;
  // 클립보드 복사
  const copyToClipboard = () => {
    Clipboard.setString(sessionLink);
    alert('클립보드에 복사되었습니다.');
  };
  // 사과매달기 함수 추후 변경
  const hangApple = () => {
    navigate('AppleLockGIF', {screen: 'AppleLockGIF'});
  };
  // 자동 스크롤밑으로
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
  // session start
  useEffect(() => {
    alert(roomId);
    const messageListeners = {
      onChange: ({uidToIndex, statuses}) => {
        //세션의 들어온 사용자의 상태 저장
        // setStatus(statuses);
        setNickname(statuses[0].nickname);
        setStage(statuses[0].stage);
      },
    };
    //방에 들어가기
    SubscribeIfConnected(`/lock-apple-room.${roomId}`, messageListeners);
  }, [roomId]);

  const disconnect = () => {
    DisconnectIfConnected(() => {
      navigate('Home', {screen: 'Main'});
    });
  };

  const actAdding = () => {
    SendIfSubscribed(`/lock-apple-room.${roomId}.adding`, {});
  };

  const actAdded = () => {
    SendIfSubscribed(`/lock-apple-room.${roomId}.added`, {
      nickname: '이것이닉넴',
      content: {
        text: [
          {
            author: '이것은 uid로 덮어써짐',
            content: 'This is text.',
          },
        ],
      },
    });
  };

  const actCancelled = () => {
    SendIfSubscribed(`/lock-apple-room.${roomId}.cancelled`, {});
  };

  const submit = () => {
    SendIfSubscribed(`/lock-apple-room.${roomId}.submit`, {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/pictures/aegom6.png')}
        style={styles.image}
      />
      <Text style={styles.complete}>
        {/* 추후 변경 */}
        {/* {}명 중 {}명 완료 */}
        3명 중 2명 완료
      </Text>
      <View style={styles.form}>
        <Pressable onPress={() => copyToClipboard()}>
          <View style={styles.copy}>
            <Image
              source={require('../assets/icons/copy.png')}
              style={styles.copyIcon}
            />
            <Text style={styles.copyText}>
              링크를 복사해서 친구를 초대하세요!
            </Text>
          </View>
        </Pressable>
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
        <View style={styles.buttons}>
          {isOwner ? (
            <Button onPress={() => disconnect()} text="추억 담기" />
          ) : (
            <>
              <SmallButton
                onPress={() => hangApple()}
                text="사과 매달기"
                disabled={false}
              />
              <SmallButton
                onPress={() => navigate('GroupCreate', {roomId: roomId})}
                text="추억 담기"
                disabled={false}
              />
            </>
          )}
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
  view: {
    justifyContent: 'center',
    marginTop: 25,
    padding: 25,
    width: 300,
    height: 250,
    borderRadius: 10,
  },
  ScrollView: {
    justifyContent: 'center',
    backgroundColor: '#ECE5E0',
    color: '#4C4036',
    fontSize: 12,
    fontFamily: 'UhBee Se_hyun',
  },
  complete: {
    fontSize: 16,
    color: '#4C4036',
    fontFamily: 'UhBee Se_hyun Bold',
    marginTop: 10,
  },
  copy: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  copyText: {
    fontSize: 13,
    color: '#A6A6A6',
    fontFamily: 'UhBee Se_hyun Bold',
    marginTop: 10,
    textAlign: 'center',
  },
  copyIcon: {
    marginRight: 5,
    marginTop: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  image: {
    width: 111,
    height: 140,
  },
});

export default GroupSession;
