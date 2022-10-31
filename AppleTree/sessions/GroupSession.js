import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
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
  const [copiedText, setCopiedText] = useState('');
  // unlockGIF loading
  const [ready, setReady] = useState(true);
  // 방장인지체크 추후 변경
  let isOwner = false;
  // 복사할 앱 링크 추후 변경
  let sessionLink = 'https://복사한-url-키키키키';
  // room id
  const {roomId} = route.params;
  // session uid, status
  const [uid, setUid] = useState({});
  const [status, setStatus] = useState([]);

  // 클립보드 복사
  const copyToClipboard = () => {
    Clipboard.setString(sessionLink);
    alert('클립보드에 복사되었습니다.');
  };
  // 사과매달기 함수 추후 변경
  const hangApple = () => {
    alert('사과 매달기 API');
    navigate('AppleLockGIF', {screen: 'AppleLockGIF'});
  };

  const stateMessage = (nickname, state) => {
    switch (state) {
      case 'JOINED':
        return nickname + '님께서 입장 하셨습니다.';
      case 'ADDING':
        return nickname + '님께서 사과를 생성 중입니다.';
      case 'ADDED':
        return nickname + '님께서 사과 생성을 완료했습니다.';
      case 'CANCELLED':
        return nickname + '님께서 방을 나갔습니다.';
      case 'LEFT':
        return nickname + '님께서 방을 나갔습니다.';
      default:
        break;
    }
  };
  // console.log('status:: 0', status[0].nickname);
  // console.log('status:: 1', status[0].nickname);
  // console.log('status::2', JSON.stringify(status.nickname));
  // console.log('status::3', JSON.parse(status).nickname);
  // console.log('status::4', status.nickname);
  // console.log('status::5', [status].nickname);
  // session start
  useEffect(() => {
    const messageListeners = {
      onChange: ({uidToIndex, statuses}) => {
        // console.log('onchange::cuidToIndex', uidToIndex);
        // console.log('onchange::cstatuses', statuses);
        setUid(uidToIndex);
        setStatus(statuses);
      },
    };
    SubscribeIfConnected(`/lock-apple-room.${roomId}`, messageListeners);
  }, [roomId]);

  const disconnect = () => {
    DisconnectIfConnected(() => {
      navigate.goBack();
    });
  };

  const actAdding = () => {
    SendIfSubscribed(`/lock-apple-room.${roomId}.adding`, {});
  };

  const actAdded = () => {
    SendIfSubscribed(
      `/lock-apple-room.${roomId}.added`,
      {
        nickname: '닉네무',
        content: {
          text: [
            {
              author: '여기는 백엔드에서 uid 로 덮어써짐',
              content: 'This is text.',
            },
          ],
        },
      }
    );
  };

  const actCancelled = () => {
    SendIfSubscribed(`/lock-apple-room.${roomId}.cancelled`, {});
  };

  const submit = () => {
    SendIfSubscribed(`/lock-apple-room.${roomId}.submit`, {});
  };
  // session end
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/pictures/aegom6.png')}
        style={{width: 111, height: 140}}
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
        <TextInput
          // value={status[0].nickname}
          pointerEvents="none"
          editable={false}
          autoCapitalize={'none'}
          style={styles.input}
          multiline={true}
          numberOfLines={3}
        />
        <View style={styles.buttons}>
          {isOwner ? (
            <Button onPress={() => disconnect()} text="추억 담기"></Button>
          ) : (
            <>
              <SmallButton
                onPress={() => hangApple()}
                text="사과 매달기"
                disabled={false}></SmallButton>
              <SmallButton
                onPress={() => navigate('GroupCreate', {screen: 'GroupCreate'})}
                text="추억 담기"
                disabled={false}></SmallButton>
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
  input: {
    justifyContent: 'center',
    backgroundColor: '#ECE5E0',
    color: '#4C4036',
    fontSize: 13,
    fontFamily: 'UhBee Se_hyun',
    // textAlign: 'center',
    marginTop: 25,
    padding: 25,
    width: 300,
    height: 250,
    borderRadius: 10,
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
});

export default GroupSession;
