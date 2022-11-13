import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Text, Image, ImageBackground} from 'react-native';
import auth from '@react-native-firebase/auth';
import {getMyAppleCount} from '../../api/AppleAPI';
import LoadingDefault from '../LoadingDefault';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  ) : (
    <LoadingDefault />
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
    fontSize: 16,
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
  logout: {
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#3A5C83',
    fontSize: 15,
  },
});

export default MyPage;
