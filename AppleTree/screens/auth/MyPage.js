import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Text, Image, ImageBackground} from 'react-native';
import auth from '@react-native-firebase/auth';
import {getMyAppleCount} from '../../api/AppleAPI';
import LoadingDefault from '../LoadingDefault';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const MyPage = () => {
  const [appleCnt, setAppleCnt] = useState(-1);
  const email = auth().currentUser.email;

  useEffect(() => {
    getMyAppleCount()
      .then(response => {
        setAppleCnt(response.data.body);
      })
      .catch(error => {
        console.log('error', error);
      });
  });

  //AsyncStorage 삭제
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('idToken');
      console.log('logout: token remove succeed');
    } catch (error) {
      console.log(error);
    }
  };

  return appleCnt !== -1 ? (
    <SafeAreaView style={styles.screen}>
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
        <Text
          style={styles.logout}
          onPress={() => {
            auth()
              .signOut()
              .then(() => removeToken(), console.log('User signed out!'));
          }}>
          로그아웃
        </Text>
        <Image
          source={require('AppleTree/assets/pictures/aegommypage.png')}
          style={styles.image}
        />
      </SafeAreaView>
    </SafeAreaView>
  ) : (
    <LoadingDefault />
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 20,
    backgroundColor: '#FBF8F6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10%',
  },
  name: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: wp('3%'),
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#4C4036',
    backgroundColor: '#ECE5E0',
    borderRadius: 100,
    padding: '3%',
    marginBottom: '5%',
    width: wp('65%'),
    height: hp('6%'),
  },
  talk: {
    resizeMode: 'contain',
    width: wp('50%'),
    height: hp('30%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    marginBottom: '3%',
  },
  image: {
    resizeMode: 'contain',
    width: wp('100%'),
    height: hp('35%'),
  },
  txt: {
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#3A5C83',
    fontSize: wp('4%'),
    marginTop: '2%',
  },
  cnt: {
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#3A5C83',
    fontSize: wp('7%'),
    marginTop: '2%',
  },
  logout: {
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#3A5C83',
    fontSize: wp('4%'),
  },
});

export default MyPage;
