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
import auth from '@react-native-firebase/auth';
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
  // session total cnt
  const [total, setTotal] = useState(0);
  // session compelete cnt
  const [compelete, setCompelete] = useState(0);
  // session message
  const [message, setMessage] = useState([]);
  // 방장인지체크 추후 변경
  const [isHost, setIsHost] = useState(false);
  // room id
  const {roomId} = route.params;
  // 클립보드 복사
  const copyToClipboard = () => {
    Clipboard.setString(roomId);
  };
  // 사과매달기 함수 추후 변경
  const hangApple = () => {
    navigate('AppleLockGIF', {screen: 'AppleLockGIF'});
  };
  // 자동 스크롤밑으로
  const scrollViewRef = useRef();
  // 메세지 컨버터
  const stateMessage = (nick, state) => {
    console.log('stateMessage');
    console.log(nick);
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
    const myid = auth().currentUser.uid;
    const messageListeners = {
      onChange: ({uidToIndex, statuses, hostUid}) => {
        //방장인지 체크
        if (myid === hostUid) {
          setIsHost(true);
        }
        let length = statuses.length;
        let hasUpload = 0;
        for (let i = 0; i < statuses.length; i++) {
          if (statuses[i].nickname === null) {
            statuses[i].nickname = 'user' + (i + 1);
          }
          if (statuses[i].stage === 'LEFT' && statuses[i].hasUpload === false) {
            length = length - 1;
          }
          if (statuses[i].hasUpload === true) {
            hasUpload = hasUpload + 1;
          }
        }
        setTotal(length);
        setCompelete(hasUpload);
        // 배열을 계속 갈아끼워줌(닉네임과 상태에 따라)
        const newMessage = statuses.map((item, idx) => ({
          idx: idx,
          nickname: item.nickname,
          stage: item.stage,
        }));
        setMessage([...newMessage]);
      },
      onSave: savedAppleId => {
        console.log('savedAppleId:', savedAppleId);
        console.log('typeof it:', typeof savedAppleId);
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
        {total}명 중 {compelete}명 완료
      </Text>
      <View style={styles.form}>
        <Pressable onPress={() => copyToClipboard()}>
          <View style={styles.copy}>
            <Image
              source={require('../assets/icons/copy.png')}
              style={styles.copyIcon}
            />
            <Text style={styles.copyText}>
              방 번호를 복사해서 친구를 초대하세요!
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
              <Text key={item.idx} style={styles.txt}>
                {stateMessage(item.nickname, item.stage)}
              </Text>
            ))}
          </ScrollView>
        </View>
        <View style={styles.buttons}>
          {!isHost ? (
            <Button onPress={() => disconnect()} text="추억 담기" />
          ) : (
            <>
              <SmallButton
                onPress={() => hangApple()}
                text="사과 매달기"
                disabled={false}
              />
              <SmallButton
                onPress={() => {
                  actAdding();
                  navigate('GroupCreate', {roomId: roomId});
                }}
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
    marginTop: 25,
    padding: 25,
    width: 370,
    height: 250,
    fontSize: 12,
    fontFamily: 'UhBee Se_hyun',
  },
  ScrollView: {
    backgroundColor: '#ECE5E0',
    borderRadius: 10,
    color: '#4C4036',
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
  txt: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
    marginTop: 5,
    fontFamily: 'UhBee Se_hyun Bold',
    fontSize: 13,
    color: '#4c4036',
  },
});

export default GroupSession;
