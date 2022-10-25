import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Text, Image, ImageBackground} from 'react-native';

const MyPage = () => {
  // const [appleCnt] = React.useState(null);
  const email = 'ssafy@ssafy.com';
  const appleCnt = 10;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.name}>{email}</Text>
      <View>
        <ImageBackground
          source={require('AppleTree/assets/pictures/talkingballoon.png')}
          style={styles.talk}>
          <Text style={styles.txt}>당신이 심은 사과는</Text>
          <Text style={styles.cnt}>총 {appleCnt}개</Text>
          <Text style={styles.txt}>입니다 !</Text>
        </ImageBackground>
      </View>
      <Image
        source={require('AppleTree/assets/pictures/aegommypage.png')}
        style={styles.image}
      />
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
  name: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#4C4036',
    backgroundColor: '#ECE5E0',
    borderRadius: 100,
    padding: 10,
    marginBottom: 20,
    width: 300,
    height: 50,
  },
  talk: {
    resizeMode: 'contain',
    width: 200,
    height: 200,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '40%',
  },
  txt: {
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#3A5C83',
    fontSize: 16,
  },
  cnt: {
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#3A5C83',
    fontSize: 32,
  },
});

export default MyPage;
