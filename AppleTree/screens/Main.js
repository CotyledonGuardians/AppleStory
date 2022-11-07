import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {SmallButton} from '../components/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getOpenAppleList, getCloseAppleList} from '../api/AppleAPI';
import {UseStomp, DisconnectIfConnected} from '../stomp';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// 남은 시간에 따라 사과 사진 변경
const imgUrl = [
  require('../assets/pictures/apple1.png'),
  require('../assets/pictures/apple2.png'),
  require('../assets/pictures/apple3.png'),
  require('../assets/pictures/apple4.png'),
];

const Apple = ({
  index,
  apple,
  navigation,
  setApple,
  setModalVisible,
  setTime,
}) => {
  const appleStyle = [
    styles.apple1,
    styles.apple2,
    styles.apple3,
    styles.apple4,
    styles.apple5,
    styles.apple6,
  ];

  const today = new Date().getTime();
  const unlockDay = new Date(apple.unlockAt.split('T')[0]).getTime();

  if (unlockDay - today - 32400 <= 0) {
    return (
      <TouchableOpacity
        style={appleStyle[index]}
        onPress={() => {
          if (apple.isCatch) {
            navigation.navigate('AppleDetail', {
              id: apple.id,
            });
          } else {
            const connect = () => {
              UseStomp(
                () => {
                  console.log('make room succeed', apple.id);
                  navigation.navigate('HitApple', {
                    id: apple.id,
                  });
                },
                () => {
                  console.log('make room failed', apple.id);
                },
              );
            };
            DisconnectIfConnected(connect, {}, connect);
          }
        }}>
        <Image style={styles.apple} source={imgUrl[3]} />
      </TouchableOpacity>
    );
  } else {
    const diff = Math.ceil((unlockDay - today - 32400) / (1000 * 60 * 60 * 24));
    if (diff === 0) {
      return (
        <TouchableOpacity
          style={appleStyle[index]}
          onPress={() => {
            if (apple.isCatch) {
              navigation.navigate('AppleDetail', {
                id: apple.id,
              });
            } else {
              const connect = () => {
                UseStomp(
                  () => {
                    console.log('make room succeed', apple.id);
                    navigation.navigate('HitApple', {
                      id: apple.id,
                    });
                  },
                  () => {
                    console.log('make room failed', apple.id);
                  },
                );
              };
              DisconnectIfConnected(connect, {}, connect);
            }
          }}>
          <Image style={styles.apple} source={imgUrl[3]} />
        </TouchableOpacity>
      );
    } else if (diff <= 3) {
      return (
        <TouchableOpacity
          style={appleStyle[index]}
          onPress={() => {
            openModal(apple, diff, setApple, setModalVisible, setTime);
          }}>
          <Image style={styles.apple} source={imgUrl[2]} />
        </TouchableOpacity>
      );
    } else if (diff <= 7) {
      return (
        <TouchableOpacity
          style={appleStyle[index]}
          onPress={() => {
            openModal(apple, diff, setApple, setModalVisible, setTime);
          }}>
          <Image style={styles.apple} source={imgUrl[1]} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={appleStyle[index]}
          onPress={() => {
            openModal(apple, diff, setApple, setModalVisible, setTime);
          }}>
          <Image style={styles.apple} source={imgUrl[0]} />
        </TouchableOpacity>
      );
    }
  }
};

const openModal = (apple, diff, setApple, setModalVisible, setTime) => {
  setApple(apple);
  setTime('D - ' + diff);
  setModalVisible(true);
};

const Main = ({navigation}) => {
  const [openApples, setOpenApples] = useState();
  const [closeApples, setCloseApples] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [apple, setApple] = useState();
  const [time, setTime] = useState();
  // auth()
  //   .currentUser.getIdToken()
  //   .then(idToken => {
  //     storeToken(idToken);
  //   });
  useEffect(() => {
    let getFlag = true;
    const getApples = async () => {
      console.log('getFlag');
      const closeAppleList = await getCloseAppleList(1, 0, 6);
      const openAppleList = await getOpenAppleList(1, 0, 1);
      if (getFlag) {
        setCloseApples(closeAppleList.data.body.content);
        setOpenApples(openAppleList.data.body.content);
      }
    };

    getApples();

    return () => {
      getFlag = false;
    };
  }, []);

  //AsyncStorage 저장
  const storeToken = async idToken => {
    // removeToken();
    try {
      // console.log('storeToken:idToken:', idToken);
      await AsyncStorage.setItem('idToken', idToken);
    } catch (error) {
      console.log('storeToken error' + error);
    }
  };
  //AsyncStorage 삭제
  // const removeToken = async () => {
  //   try {
  //     await AsyncStorage.removeItem('idToken');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // AsyncStorage 토큰 삭제 필요시
  // removeToken();

  return (
    <SafeAreaView style={styles.container}>
      {openApples && closeApples ? (
        <ImageBackground
          style={styles.backgroundImg}
          source={require('../assets/pictures/main.png')}>
          {closeApples.length > 0 ? (
            <Apple
              index={0}
              apple={closeApples[0]}
              navigation={navigation}
              setApple={setApple}
              setModalVisible={setModalVisible}
              setTime={setTime}
            />
          ) : (
            <></>
          )}
          {closeApples.length > 1 ? (
            <Apple
              index={1}
              apple={closeApples[1]}
              navigation={navigation}
              setApple={setApple}
              setModalVisible={setModalVisible}
              setTime={setTime}
            />
          ) : (
            <></>
          )}
          {closeApples.length > 2 ? (
            <Apple
              index={2}
              apple={closeApples[2]}
              navigation={navigation}
              setApple={setApple}
              setModalVisible={setModalVisible}
              setTime={setTime}
            />
          ) : (
            <></>
          )}
          {closeApples.length > 3 ? (
            <Apple
              index={3}
              apple={closeApples[3]}
              navigation={navigation}
              setApple={setApple}
              setModalVisible={setModalVisible}
              setTime={setTime}
            />
          ) : (
            <></>
          )}
          {closeApples.length > 4 ? (
            <Apple
              index={4}
              apple={closeApples[4]}
              navigation={navigation}
              setApple={setApple}
              setModalVisible={setModalVisible}
              setTime={setTime}
            />
          ) : (
            <></>
          )}
          {closeApples.length > 5 ? (
            <Apple
              index={5}
              apple={closeApples[5]}
              navigation={navigation}
              setApple={setApple}
              setModalVisible={setModalVisible}
              setTime={setTime}
            />
          ) : (
            <></>
          )}
          {openApples.length > 0 ? (
            <TouchableOpacity
              style={styles.basketTouch}
              onPress={() => navigation.navigate('AppleList')}>
              <Image
                style={styles.basket}
                source={require('../assets/pictures/basketfull.png')}
              />
            </TouchableOpacity>
          ) : (
            <Image
              style={styles.basketTouch}
              source={require('../assets/pictures/basket.png')}
            />
          )}
          <Image
            style={styles.bear}
            source={require('../assets/gifs/eatingApple.gif')}
          />
        </ImageBackground>
      ) : (
        <Text>Loading</Text>
      )}

      {/* 안익은 사과 모달 start */}
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>사과를 아직 열 수 없어요!</Text>
              <Image source={require('../assets/pictures/aegomkey.png')} />
              <Text style={styles.timeText}>{time}</Text>
              <View style={styles.buttonBox}>
                <SmallButton
                  onPress={() => setModalVisible(false)}
                  text="닫기"
                  disabled={false}
                />
                <SmallButton
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('LockAppleDetail', {id: apple.id});
                  }}
                  text="자세히 보기"
                  disabled={false}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    width: '100%',
    height: '100%',
  },
  apple: {
    width: wp('17%'),
    height: wp('15%'),
  },
  apple1: {
    width: wp('17%'),
    height: wp('15%'),
    position: 'absolute',
    top: hp('15%'),
    left: wp('37%'),
  },
  apple2: {
    width: wp('17%'),
    height: wp('15%'),
    position: 'absolute',
    top: hp('25%'),
    left: wp('17%'),
  },
  apple3: {
    width: wp('17%'),
    height: wp('15%'),
    position: 'absolute',
    top: hp('20%'),
    left: wp('62%'),
  },
  apple4: {
    width: wp('17%'),
    height: wp('15%'),
    position: 'absolute',
    top: hp('32%'),
    left: wp('42%'),
  },
  apple5: {
    width: wp('17%'),
    height: wp('15%'),
    position: 'absolute',
    top: hp('38%'),
    left: wp('67%'),
  },
  apple6: {
    width: wp('17%'),
    height: wp('15%'),
    position: 'absolute',
    top: hp('40%'),
    left: wp('12%'),
  },
  bear: {
    width: wp('70%'),
    height: wp('67%'),
    position: 'absolute',
    top: hp('50%'),
    left: wp('50%'),
  },
  basketTouch: {
    width: wp('28%'),
    height: wp('29%'),
    position: 'absolute',
    top: hp('65%'),
    left: wp('10%'),
  },
  basket: {
    width: wp('28%'),
    height: wp('29%'),
  },
  //모달 스타일 start
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  buttonView: {
    flexDirection: 'row',
  },
  modalView: {
    fontFamily: 'UhBee Se_hyun Bold',
    margin: 20,
    backgroundColor: '#ECE5E0',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonBox: {
    flexDirection: 'row',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'UhBee Se_hyun Bold',
    fontSize: 15,
    color: '#373043',
    marginBottom: 15,
    textAlign: 'center',
    flexDirection: 'column',
  },
  timeText: {
    fontFamily: 'UhBee Se_hyun Bold',
    fontSize: 30,
    color: '#4c4036',
    textAlign: 'center',
  },
  //모달 스타일 end
});

export default Main;
