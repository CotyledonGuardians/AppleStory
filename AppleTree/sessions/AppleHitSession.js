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

  // let randomFace = [
  //   require('../assets/pictures/expression1.png'),
  //   require('../assets/pictures/expression2.png'),
  // ];
  // let randomText = [
  //   require('../assets/pictures/hittext1.png'),
  //   require('../assets/pictures/hittext2.png'),
  //   require('../assets/pictures/hittext3.png'),
  // ];
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
    setShowText(false);
    setShowExpression(false);
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
        width={wp('80%')}
        animated={true}
        color="#4C4036"
        unfilledColor="#ECE5E0"
        style={styles.progress}
        height={wp('7%')}
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
          style={styles.appleimg}
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
                width: wp('20%'),
                height: wp('20%'),
                position: 'absolute',
                left: punchPosition.x - wp('25%'),
                top: punchPosition.y - wp('140%'),
              }}
            />
          </Animatable.View>
        )}
        {showExpression && (
          <Image
            style={styles.face}
            source={require('../assets/pictures/expression2.png')}></Image>
        )}
        {showText && (
          <Image
            style={styles.hittext2}
            source={require('../assets/pictures/hittext1.png')}></Image>
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
  progress: {
    marginTop: wp('4%'),
    marginBottom: wp('1%'),
  },
  toptxt: {
    fontFamily: 'UhBee Se_hyun',
    textAlign: 'left',
    marginBottom: 10,
    fontSize: wp('4%'),
  },
  bottomtxt: {
    fontFamily: 'UhBee Se_hyun Bold',
    textAlign: 'center',
    marginTop: 20,
    fontSize: wp('5%'),
  },
  countBox: {
    width: wp('27%'),
    height: wp('10%'),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: '#ECE5E0',
    paddingRight: wp('5%'),
    paddingLeft: wp('5%'),
  },
  countIcon: {
    width: wp('5%'),
    height: wp('5%'),
    marginLeft: wp('1%'),
    marginRight: wp('2%'),
  },
  countText: {
    fontFamily: 'UhBee Se_hyun Bold',
    fontSize: wp('3%'),
    color: '#4C4036',
  },
  face: {
    width: wp('65%'),
    height: wp('65%'),
    position: 'absolute',
    bottom: hp('-1.5%'),
    left: wp('4%'),
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
    width: wp('20%'),
    height: wp('15%'),
    position: 'absolute',
    // top: hp('1%'),
    bottom: hp('0%'),
    left: wp('60%'),
  },
  hittext3: {
    width: wp('20%'),
    height: wp('15%'),
    position: 'absolute',
    bottom: hp('30%'),
    left: wp('60%'),
  },
  hittext4: {
    width: wp('20%'),
    height: wp('15%'),
    position: 'absolute',
    bottom: hp('0%'),
    left: wp('0%'),
  },
  appleimg: {
    resizeMode: 'contain',
    width: wp('80%'),
    height: wp('70%'),
    marginTop: wp('2%'),
  },
});

export default AppleHitSession;
