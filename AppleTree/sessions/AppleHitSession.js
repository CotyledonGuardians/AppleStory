import {TestScheduler} from 'jest';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Image, Text, Pressable} from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import {
  SubscribeIfConnected,
  DisconnectIfConnected,
  SendIfSubscribed,
} from '../stomp/';

const AppleHitSession = ({navigation, route}) => {
  const [showPunch, setShowPunch] = useState(false);
  const [clickProgress, SetClickProgress] = useState(1);
  const [punchPosition, setPunchPosition] = useState({
    x: 0,
    y: 0,
  });
  const [totalHp, setTotalHp] = useState(0);
  const [apple, setApple] = useState(0);
  const [party, setParty] = useState(0);
  const [currentHp, setCurrentHp] = useState(0);

  const roomId = route.params.id;
  console.log('여기는1', clickProgress);
  console.log(route.params.id);

  // session start
  useEffect(() => {
    console.log('useEffect::roomId', roomId);
    const messageListeners = {
      onPartyChange: ({totalHealth, appleSize, partySize}) => {
        console.log(
          `totalHealth: ${totalHealth}, appleSize: ${appleSize}, partySize: ${partySize}`,
        );
        setTotalHp(totalHealth);
        console.log('onPartyChange::totalHealth', totalHp);
        setApple(appleSize);
        console.log('onPartyChange::appleSize', apple);
        setParty(partySize);
      },
      onHealthChange: ({currentHealth}) => {
        console.log(`currentHealth: ${currentHealth}`);
        setCurrentHp(currentHealth);
        console.log(`appleSize: ${apple}`);
        console.log('onHealthChange::totalHp', totalHp);
        console.log('onHealthChange::currentHp', currentHp);
        // console.log('몇이게', (currentHealth / totalHp).toFixed(1));
        SetClickProgress(parseFloat((currentHealth / totalHp).toFixed(1)));
        // SetClickProgress(parseFloat((currentHealth / totalHp).toFixed(1)));
      },
      onDie: () => {
        console.log('잡았당~!');
      },
    };

    //방에 들어가기
    SubscribeIfConnected(`/unlock-apple-room.${roomId}`, messageListeners);
  }, [roomId]);

  const disconnect = () => {
    DisconnectIfConnected(() => {
      navigation.navigate('List');
    });
  };

  const attack = () => {
    console.log('쥰내게 때리기~');

    SendIfSubscribed(`/unlock-apple-room.${roomId}.attack`, {});
  };

  const pressHandler = e => {
    // console.log(e.nativeEvent.pageX);
    // console.log(e.nativeEvent.pageY);
    setShowPunch(true);
    setPunchPosition({
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
    });

    attack();
    // if (clickProgress <= 0) {
    //   SetClickProgress(1);
    // } else {
    //   console.log(clickProgress);
    //   SetClickProgress(clickProgress - 0.1);
    // }
    console.log('여기는2', clickProgress);
    setTimeout(() => {
      setShowPunch(false);
    }, 250);
  };
  //Animatable npm에서 커스텀 fadeOut 함수 만든거
  const fadeOut = {
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  };
  //체력 hp 추후 변경
  console.log('여기는3', clickProgress);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.toptxt}>사과가 열리기까지 이 정도 남았어요!</Text>
      <Progress.Bar
        progress={clickProgress}
        width={300}
        animated={true}
        color="#4C4036"
        unfilledColor="#ECE5E0"
        style={styles.progress}
        height={30}
        borderRadius={15}
        borderWidth={5}
      />
      <Pressable onPress={pressHandler}>
        <Image
          source={require('../assets/pictures/apple4.png')}
          style={{width: 300, height: 300}}
        />
        {/* 클릭이벤트일때 주먹 사진 가져오기 */}
        {showPunch && (
          // Animateble.~~쓸때 꼭 Animatable.View로 감싸줘야됨
          <Animatable.View>
            <Animatable.Image
              animation={fadeOut}
              duration={300}
              source={require('../assets/icons/punch.png')}
              style={{
                height: 100,
                width: 100,
                position: 'absolute',
                left: punchPosition.x - 100,
                top: punchPosition.y - 620,
              }}
            />
          </Animatable.View>
        )}
      </Pressable>
      {/* <Text style={styles.bottomtxt}>함께 때리면 더 빨리 열 수 있어요!</Text> */}
      <Text style={styles.bottomtxt}>총 HP : {totalHp}</Text>
      <Text style={styles.bottomtxt}>총 인원 수 : {apple}</Text>
      <Text style={styles.bottomtxt}>참가 인원 수 : {party}</Text>
      <Text style={styles.bottomtxt}>현재 HP : {currentHp}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF8F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    marginBottom: 50,
  },
  toptxt: {
    fontFamily: 'UhBee Se_hyun',
    textAlign: 'left',
    marginBottom: 10,
  },
  bottomtxt: {
    fontFamily: 'UhBee Se_hyun Bold',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 20,
  },
});

export default AppleHitSession;
