import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import {
  SubscribeIfConnected,
  DisconnectIfConnected,
  SendIfSubscribed,
} from '../stomp/';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const AppleHitSession = ({navigation, route}) => {
  const [showPunch, setShowPunch] = useState(false);
  const [clickProgress, SetClickProgress] = useState(1);
  const [punchPosition, setPunchPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showExpression, setShowExpression] = useState(false);
  const [showText, setShowText] = useState(false);
  const [apple, setApple] = useState(0);
  const [party, setParty] = useState(0);

  let randomFace = [
    require('../assets/pictures/expression1.png'),
    require('../assets/pictures/expression2.png'),
  ];
  let randomText = [
    require('../assets/pictures/hittext1.png'),
    require('../assets/pictures/hittext2.png'),
    require('../assets/pictures/hittext3.png'),
  ];
  // let randomXY = ['hittext1', 'hittext2', 'hittext3'];
  const roomId = route.params.id;

  // session start
  useEffect(() => {
    let totalHp = 0;

    // console.log('useEffect::roomId', roomId);
    const messageListeners = {
      onPartyChange: ({totalHealth, appleSize, partySize, currentHealth}) => {
        // console.log(
        //   `totalHealth: ${totalHealth}, appleSize: ${appleSize}, partySize: ${partySize}`,
        // );
        totalHp = totalHealth;
        // console.log('onPartyChange::totalHealth', totalHp);
        setApple(appleSize);
        setParty(partySize);
        // console.log(currentHealth);
        SetClickProgress(parseFloat((currentHealth / totalHp).toFixed(1)));
      },
      onHealthChange: ({currentHealth}) => {
        setExpression();
        setText();
        // console.log(`currentHealth: ${currentHealth}`);
        SetClickProgress(parseFloat((currentHealth / totalHp).toFixed(1)));
      },
      onDie: () => {
        alert('사과 따기 성공!');
        disconnect();
      },
    };

    //방에 들어가기
    SubscribeIfConnected(`/unlock-apple-room.${roomId}`, messageListeners);
  }, [roomId]);

  const disconnect = () => {
    DisconnectIfConnected(() => {
      navigation.replace('AppleUnlockGIF', {
        id: roomId,
      });
    });
  };

  const attack = () => {
    SendIfSubscribed(`/unlock-apple-room.${roomId}.attack`, {});
  };

  //다른사람이 applehit했을때
  const setExpression = () => {
    setShowExpression(true);
    setTimeout(() => {
      setShowExpression(false);
    }, 300);
  };
  const setText = () => {
    setShowText(true);
    setTimeout(() => {
      setShowText(false);
    }, 300);
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.countBox}>
        <Image
          style={styles.countIcon}
          source={require('../assets/icons/usercount.png')}
        />
        <Text style={styles.countText}>
          {party} / {apple}
        </Text>
      </View>

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
      {/* <Animatable.Text
        style={styles.toptxt}
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite">
        사과가 열리기까지 이 정도 남았어요!
      </Animatable.Text> */}
      <Text style={styles.toptxt}>사과가 열리기까지 이 정도 남았어요!</Text>
      <Pressable onPress={pressHandler}>
        <Animatable.Image
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          source={require('../assets/pictures/apple4.png')}
          style={{resizeMode: 'contain', width: 300, height: 300}}
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
                top: punchPosition.y - 550,
              }}
            />
          </Animatable.View>
        )}
        {showExpression && (
          <Image
            style={styles.face}
            source={
              randomFace[Math.floor(Math.random() * randomFace.length)]
            }></Image>
        )}
        {showText && (
          <Image
            style={styles.hittext2}
            source={
              randomText[Math.floor(Math.random() * randomText.length)]
            }></Image>
        )}
      </Pressable>
      {/* <Animatable.Image
        animation="MakeItRain"
        iterationCount="infinite"
        source={require('../assets/pictures/apple4.png')}></Animatable.Image> */}
      <Text style={styles.bottomtxt}>함께 때리면 더 빨리 열 수 있어요!</Text>
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
  box: {
    width: 350,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    marginTop: 20,
    marginBottom: 5,
  },
  toptxt: {
    fontFamily: 'UhBee Se_hyun',
    textAlign: 'left',
    marginBottom: 10,
  },
  bottomtxt: {
    fontFamily: 'UhBee Se_hyun Bold',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
  },
  countBox: {
    width: 100,
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 30,
    marginTop: 5,
    backgroundColor: '#ECE5E0',
    paddingRight: 10,
    paddingLeft: 15,
  },
  countIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  countText: {
    fontFamily: 'UhBee Se_hyun Bold',
    fontSize: 16,
    color: '#4C4036',
  },
  face: {
    width: wp('65%'),
    height: wp('65%'),
    position: 'absolute',
    // top: hp('1%'),
    bottom: hp('-1.5%'),
    left: wp('7%'),
  },
  hittext1: {
    fontFamily: 'UhBee Se_hyun Bold',
    width: wp('20%'),
    height: wp('15%'),
    position: 'absolute',
    // top: hp('1%'),
    bottom: hp('30%'),
    left: wp('0%'),
  },
  hittext2: {
    fontFamily: 'UhBee Se_hyun Bold',
    width: wp('20%'),
    height: wp('15%'),
    position: 'absolute',
    // top: hp('1%'),
    bottom: hp('0%'),
    left: wp('60%'),
  },
  hittext3: {
    fontFamily: 'UhBee Se_hyun Bold',
    width: wp('20%'),
    height: wp('15%'),
    position: 'absolute',
    // top: hp('1%'),
    bottom: hp('30%'),
    left: wp('60%'),
  },
  hittext4: {
    fontFamily: 'UhBee Se_hyun Bold',
    width: wp('20%'),
    height: wp('15%'),
    position: 'absolute',
    // top: hp('1%'),
    bottom: hp('0%'),
    left: wp('0%'),
  },
});

export default AppleHitSession;
