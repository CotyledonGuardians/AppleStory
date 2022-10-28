import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Image, Text, Pressable} from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
const AppleHitSession = ({navigation}) => {
  const [showPunch, setShowPunch] = useState(false);
  const [clickProgress, SetClickProgress] = useState(1);
  const [punchPosition, setPunchPosition] = useState({
    x: 0,
    y: 0,
  });
  console.log('여기는1', clickProgress);
  const pressHandler = e => {
    // console.log(e.nativeEvent.pageX);
    // console.log(e.nativeEvent.pageY);
    setShowPunch(true);
    setPunchPosition({
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
    });
    if (clickProgress <= 0) {
      SetClickProgress(1);
    } else {
      SetClickProgress(clickProgress - 0.1);
    }
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
