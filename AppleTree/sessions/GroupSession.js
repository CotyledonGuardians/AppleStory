import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Clipboard from '@react-native-clipboard/clipboard';
import {SmallButton, Button, HangButton} from '../components/Button';
import {
  SubscribeIfConnected,
  DisconnectIfConnected,
  SendIfSubscribed,
} from '../stomp/';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const GroupSession = ({navigation: {navigate}, route}) => {
  // 세션에 들어온 총 인원
  const [total, setTotal] = useState(0);
  // 추억을 담은 인원
  const [compelete, setCompelete] = useState(0);
  // 세션 상태메세지(채팅방)
  const [message, setMessage] = useState([]);
  // 방장인지체크
  const [isHost, setIsHost] = useState(false);
  // 세션 방 번호
  const {roomId} = route.params;
  // apple id
  const [reservedAppleId, setReservedAppleId] = useState(-1);
  // 나의 올린 상태
  const [myHasUpload, setMyHasUpload] = useState(false);
  // 클립보드 복사
  const copyToClipboard = () => {
    Alert.alert('코드가 복사되었습니다!');
    Clipboard.setString(roomId);
  };
  // 사과매달기
  const hangApple = () => {
    if (total === compelete) {
      // 사과에 담은 데이터 제출(세션에서 제출한 모든 인원)
      submit();
      // 세션 연결 끊기
      disconnect();
      // LockGIF로 이동시키기
      navigate('AppleLockGIF', {screen: 'AppleLockGIF'});
    } else {
      Alert.alert('사과를 만들지 않은 사람이 있어요!');
    }
  };
  // 자동 스크롤밑으로
  const scrollViewRef = useRef();
  // 메세지 컨버터
  const stateMessage = (nick, state) => {
    // console.log('stateMessage');
    // console.log(nick);
    switch (state) {
      case 'JOINED':
        return nick + '님께서 입장 하셨습니다❣';
      case 'ADDING':
        return nick + '님께서 내용을 입력 중입니다...';
      case 'ADDED':
        return nick + '님께서 사과 생성을 완료했습니다❣';
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
    const myid = auth().currentUser.uid;
    const messageListeners = {
      onChange: ({uidToIndex, statuses, hostUid, appleId}) => {
        console.log('_appleId::::::', appleId);
        setReservedAppleId(appleId);
        //방장인지 체크
        if (myid === hostUid) {
          setIsHost(true);
        }
        // 현재유저가 status배열의 몇번째에 있는지 체크
        let length = statuses.length;
        let hasUpload = 0;
        for (let i = 0; i < statuses.length; i++) {
          // 처음 들어왔을때 익명번호 부여 user[N]
          if (statuses[i].nickname === null) {
            statuses[i].nickname = 'user' + (i + 1);
          }
          // 업로드 안하고 세션에서 나갔을때
          if (statuses[i].stage === 'LEFT' && statuses[i].hasUpload === false) {
            length = length - 1;
          }
          // 업로드 했을때
          if (statuses[i].hasUpload === true) {
            hasUpload = hasUpload + 1;
          }
          if (statuses[uidToIndex[myid]].hasUpload === true) {
            setMyHasUpload(true);
          }
        }
        //세션의 총 인원 저장#ㅁ
        setTotal(length);
        //세션에서 사과내용 제출한 인원 저장
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
    SubscribeIfConnected(
      {
        roomType: 'lock-apple-room',
        roomId: roomId,
      },
      messageListeners,
    );
  }, [roomId]);

  // 세션 연결 해제
  const disconnect = () => {
    DisconnectIfConnected(() => {
      navigate('Home', {screen: 'Main'});
    });
  };

  // 세션에서 사과에 내용을 쓰고있는 상태
  const actAdding = () => {
    SendIfSubscribed(
      {
        roomType: 'lock-apple-room',
        roomId: roomId,
        action: 'adding',
      },
      {},
    );
  };

  const actCancelled = () => {
    SendIfSubscribed(
      {
        roomType: 'lock-apple-room',
        roomId: roomId,
        action: 'cancelled',
      },
      {},
    );
  };

  //방장이 사과매달기를 할때(hasUpload가 true인 모든 인원 제출)
  const submit = () => {
    SendIfSubscribed(
      {
        roomType: 'lock-apple-room',
        roomId: roomId,
        action: 'submit',
      },
      {},
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgBox}>
        <Image
          source={require('../assets/pictures/aegom6.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.completeBox}>
        <Text style={styles.complete}>
          {total}명 중 {compelete}명 완료
        </Text>
      </View>
      <View style={styles.formBox}>
        <View style={styles.copyBox}>
          <Pressable onPress={() => copyToClipboard()}>
            <View style={styles.copy}>
              <Image
                source={require('../assets/icons/copy.png')}
                style={styles.copyIcon}
              />
              <Text style={styles.copyText}>{roomId}</Text>
            </View>
          </Pressable>
        </View>
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
      </View>
      <View style={styles.buttonBox}>
        {
          //방장이 아니고
          !isHost ? (
            <Button
              onPress={() => {
                if (myHasUpload) {
                  Alert.alert('이미 작성을 완료했습니다.');
                } else {
                  actAdding();
                  navigate('GroupCreate', {
                    roomId: roomId,
                    isHost: isHost,
                    appleId: reservedAppleId,
                  });
                }
              }}
              text="사과 내용쓰기"
            />
          ) : (
            <>
              <HangButton
                onPress={() => hangApple()}
                text="사과 봉인하기"
                disabled={false}
              />
              <SmallButton
                onPress={() => {
                  if (myHasUpload) {
                    Alert.alert('이미 작성을 완료했습니다.');
                  } else {
                    actAdding();
                    navigate('GroupCreate', {
                      roomId: roomId,
                      isHost: isHost,
                      appleId: reservedAppleId,
                    });
                  }
                }}
                text="사과 내용쓰기"
                disabled={false}
              />
            </>
          )
        }
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
    padding: 10,
  },
  imgBox: {
    flex: 2.5,
    justifyContent: 'flex-end',
  },
  image: {
    resizeMode: 'contain',
    width: wp('30%'),
    height: wp('32%'),
  },
  completeBox: {
    flex: 0.5,
    justifyContent: 'center',
  },
  complete: {
    fontSize: wp('4%'),
    color: '#4C4036',
    fontFamily: 'UhBee Se_hyun Bold',
  },
  formBox: {
    flex: 5,
  },
  copyBox: {
    flex: 1,
  },
  copy: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: wp('3%'),
  },
  copyText: {
    fontSize: wp('5.5%'),
    color: '#4C4036',
    fontFamily: 'SourceCodePro-Medium',
    textAlign: 'center',
  },
  copyIcon: {
    resizeMode: 'contain',
    marginTop: wp('0.8%'),
    width: wp('5%'),
    height: wp('6%'),
  },
  view: {
    flex: 3.5,
    fontSize: wp('2.5%'),
    width: wp('80%'),
    fontFamily: 'UhBee Se_hyun',
  },
  ScrollView: {
    backgroundColor: '#ECE5E0',
    borderRadius: 10,
    color: '#4C4036',
  },
  txt: {
    fontFamily: 'UhBee Se_hyun Bold',
    fontSize: wp('3.5%'),
    color: '#4c4036',
    textAlign: 'center',
    margin: hp('1%'),
  },
  buttonBox: {
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: wp('5%'),
  },
});

export default GroupSession;
