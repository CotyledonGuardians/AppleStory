import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Text, Image} from 'react-native';
import {Pressable} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const IntroFirst = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('AppleTree/assets/pictures/intro1.png')}
        style={styles.introImg}
      />
      <View style={styles.txtBox}>
        <Text style={styles.title}>여러분의 추억을 사과나무에 달아 보세요</Text>
        <Text style={styles.sub}>
          다시 기억하고 싶은 시간에, {'\n'}사과에 담긴 추억을 확인할 수 있습니다
        </Text>
      </View>
      <View style={styles.next}>
        <Pressable
          onPress={() => navigation.navigate('IntroFirst')}
          style={styles.circleBold}
        />
        <Pressable
          onPress={() => navigation.navigate('IntroSecond')}
          style={styles.circle}
        />
      </View>
      <View style={styles.next}>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.title}>넘기기</Text>
        </Pressable>
        <View style={{flex: 0.8}} />
        <Pressable onPress={() => navigation.navigate('IntroSecond')}>
          <Text style={styles.title}>다음</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const IntroSecond = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('AppleTree/assets/pictures/intro2.png')}
        style={styles.introImg}
      />
      <View style={styles.txtBox}>
        <Text style={styles.title}>추억을 다른 사람과 나눠 보세요</Text>
        <Text style={styles.sub}>
          사람들과 함께 사과를 만들어 {'\n'} 추억을 나눌 수 있습니다
        </Text>
      </View>
      <View style={styles.next}>
        <Pressable
          onPress={() => navigation.navigate('IntroFirst')}
          style={styles.circle}
        />
        <Pressable
          onPress={() => navigation.navigate('IntroSecond')}
          style={styles.circleBold}
        />
      </View>
      <View style={styles.next}>
        <View />
        <View style={{flex: 0.8}} />
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.title}>완료</Text>
        </Pressable>
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
  introImg: {
    resizeMode: 'contain',
    width: wp('80%'),
    height: hp('70%'),
  },
  txtBox: {
    flex: 2,
    justifyContent: 'center',
  },
  next: {
    flex: 1,
    flexDirection: 'row',
    marginTop: wp('2%'),
  },
  title: {
    textAlign: 'center',
    fontSize: wp('4%'),
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#4C4036',
  },
  sub: {
    textAlign: 'center',
    fontSize: wp('3%'),
    fontFamily: 'UhBee Se_hyun',
    color: '#4C4036',
  },
  circle: {
    marginRight: 5,
    marginLeft: 5,
    width: wp('2.5%'),
    height: wp('2.5%'),
    borderRadius: 100,
    backgroundColor: '#AAA19B',
  },
  circleBold: {
    marginRight: 5,
    marginLeft: 5,
    width: wp('2.5%'),
    height: wp('2.5%'),
    borderRadius: 100,
    backgroundColor: '#4C4036',
  },
});

export {IntroFirst, IntroSecond};
