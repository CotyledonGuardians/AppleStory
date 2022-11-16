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
  Alert,
} from 'react-native';
import {SmallButton} from '../components/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import {getOpenAppleList, getCloseAppleList} from '../api/AppleAPI';
import {UseStomp, DisconnectIfConnected} from '../stomp';
import LoadingDefault from './LoadingDefault';
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
            Alert.alert('이미 사과가 따졌어요!');
            navigation.navigate('Overview', {
              id: apple.id,
            });
          } else {
            const connect = () => {
              UseStomp(
                () => {
                  console.log('make room succeed', apple.id);
                  navigation.replace('HitApple', {
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
              navigation.navigate('Overview', {
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
  const [openApples, setOpenApples] = useState(null);
  const [closeApples, setCloseApples] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [apple, setApple] = useState();
  const [time, setTime] = useState();
  const [idToken, setIdToken] = useState();

  const slideInDown = {
    from: {
      translateY: -30,
    },
    to: {
      translateY: 0,
    },
  };

  useEffect(() => {
    let getFlag = true;
    const getApples = async () => {
      setIdToken(await AsyncStorage.getItem('idToken'));
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

  return (
    <SafeAreaView style={styles.container}>
      {openApples !== null && closeApples !== null ? (
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
              onPress={() =>
                navigation.navigate('List', {screen: 'AppleList'})
              }>
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
          {closeApples.length === 0 && openApples.length === 0 ? (
            <View style={styles.comment}>
              <ImageBackground
                source={require('../assets/pictures/balloon.png')}
                style={styles.talk}>
                <Text style={styles.txt}>사과를</Text>
                <Text style={styles.txt}>만들어보세요!</Text>
              </ImageBackground>
              <Animatable.View>
                <Animatable.Image
                  source={require('../assets/icons/arrow.png')}
                  style={styles.arrow}
                  animation={slideInDown}
                  iterationCount={Infinity}
                  direction="alternate"
                />
              </Animatable.View>
            </View>
          ) : (
            <></>
          )}
        </ImageBackground>
      ) : (
        <LoadingDefault />
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
              <Image
                source={require('../assets/pictures/aegomkey.png')}
                style={styles.modalImg}
              />
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
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
  apple: {
    width: wp('17%'),
    height: wp('15%'),
  },
  apple1: {
    resizeMode: 'contain',
    width: wp('17%'),
    height: wp('15%'),
    position: 'absolute',
    top: hp('15%'),
    left: wp('37%'),
  },
  apple2: {
    resizeMode: 'contain',
    width: wp('17%'),
    height: wp('15%'),
    position: 'absolute',
    top: hp('25%'),
    left: wp('17%'),
  },
  apple3: {
    resizeMode: 'contain',
    width: wp('17%'),
    height: wp('15%'),
    position: 'absolute',
    top: hp('20%'),
    left: wp('62%'),
  },
  apple4: {
    resizeMode: 'contain',
    width: wp('17%'),
    height: wp('15%'),
    position: 'absolute',
    top: hp('32%'),
    left: wp('42%'),
  },
  apple5: {
    resizeMode: 'contain',
    width: wp('17%'),
    height: wp('15%'),
    position: 'absolute',
    top: hp('38%'),
    left: wp('67%'),
  },
  apple6: {
    resizeMode: 'contain',
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
    bottom: hp('8%'),
    left: wp('50%'),
  },
  basketTouch: {
    width: wp('28%'),
    height: wp('29%'),
    position: 'absolute',
    bottom: hp('15%'),
    left: wp('10%'),
  },
  basket: {
    width: wp('28%'),
    height: wp('29%'),
  },
  comment: {
    bottom: hp('5.5%'),
    left: wp('35%'),
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'flex-end',
  },
  arrow: {
    resizeMode: 'contain',
    width: wp('12%'),
    height: wp('12%'),
  },
  talk: {
    resizeMode: 'contain',
    width: wp('30%'),
    height: wp('25%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontFamily: 'UhBee Se_hyun Bold',
    fontSize: wp('3.5%'),
  },
  //모달 스타일 start
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp('10%'),
  },
  buttonView: {
    flexDirection: 'row',
  },
  modalView: {
    fontFamily: 'UhBee Se_hyun Bold',
    margin: wp('5%'),
    backgroundColor: '#ECE5E0',
    borderRadius: 20,
    padding: wp('5%'),
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
  modalImg: {
    resizeMode: 'contain',
    width: wp('35%'),
    height: wp('40%'),
  },
  modalText: {
    fontFamily: 'UhBee Se_hyun Bold',
    fontSize: wp('4.5%'),
    color: '#373043',
    marginBottom: wp('5%'),
    textAlign: 'center',
    flexDirection: 'column',
  },
  timeText: {
    fontFamily: 'UhBee Se_hyun Bold',
    fontSize: wp('8%'),
    color: '#4c4036',
    textAlign: 'center',
  },
  //모달 스타일 end
});

export default Main;
