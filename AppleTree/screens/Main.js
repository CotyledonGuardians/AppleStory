import React, {useEffect, useState} from 'react';
import {
  Image,
  Alert,
  Modal,
  Text,
  Pressable,
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {SmallButton} from '../components/Button';
// import {width, height} from '../config/globalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getOpenAppleList, getCloseAppleList} from '../api/AppleAPI';

// 남은 시간에 따라 사과 사진 변경
const imgUrl = [
  require('../assets/pictures/apple1.png'),
  require('../assets/pictures/apple2.png'),
  require('../assets/pictures/apple3.png'),
  require('../assets/pictures/apple4.png'),
];

const Apple = ({index, apple, navigation}) => {
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
        onPress={() => navigation.navigate('')}>
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
            navigation.navigate('');
          }}>
          <Image style={styles.apple} source={imgUrl[3]} />
        </TouchableOpacity>
      );
    } else if (diff <= 3) {
      return (
        <TouchableOpacity style={appleStyle[index]}>
          <Image style={styles.apple} source={imgUrl[2]} />
        </TouchableOpacity>
      );
    } else if (diff <= 7) {
      return (
        <TouchableOpacity style={appleStyle[index]}>
          <Image style={styles.apple} source={imgUrl[1]} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={appleStyle[index]}>
          <Image style={styles.apple} source={imgUrl[0]} />
        </TouchableOpacity>
      );
    }
  }
};

// const openModal = apple => {
//   setApple(apple);
//   setModalVisible(true);
// };

const Main = ({navigation}) => {
  const [openApples, setOpenApples] = useState();
  const [closeApples, setCloseApples] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [apple, setApple] = useState();

  useEffect(() => {
    getCloseAppleList(1, 0, 6)
      .then(response => {
        console.log('close-response', response.data);
        setCloseApples(response.data.body.content);
      })
      .catch(error => {
        console.log('error', error);
      });

    getOpenAppleList(1, 0, 1)
      .then(response => {
        console.log('open-response', response.data.body.content);
        setOpenApples(response.data.body.content);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {openApples && closeApples ? (
        <ImageBackground
          style={styles.backgroundImg}
          source={require('../assets/pictures/main.png')}>
          {closeApples.length > 0 ? (
            <Apple index={0} apple={closeApples[0]} navigation={navigation} />
          ) : (
            <></>
          )}
          {closeApples.length > 1 ? (
            <Apple index={1} apple={closeApples[1]} navigation={navigation} />
          ) : (
            <></>
          )}
          {closeApples.length > 2 ? (
            <Apple index={2} apple={closeApples[2]} navigation={navigation} />
          ) : (
            <></>
          )}
          {closeApples.length > 3 ? (
            <Apple index={3} apple={closeApples[3]} navigation={navigation} />
          ) : (
            <></>
          )}
          {closeApples.length > 4 ? (
            <Apple index={4} apple={closeApples[4]} navigation={navigation} />
          ) : (
            <></>
          )}
          {closeApples.length > 5 ? (
            <Apple index={5} apple={closeApples[5]} navigation={navigation} />
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
          apple={apple}
          onRequestClose={() => {
            Alert.alert('모달 닫힘.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>사과를 아직 열 수 없어요!</Text>
              <Image source={require('../assets/pictures/aegomkey.png')} />
              <Text style={styles.timeText}>334일 2시 32분</Text>
              <View style={{flexDirection: 'row'}}>
                <SmallButton
                  onPress={() => setModalVisible(!modalVisible)}
                  text="닫기"
                  disabled={false}
                />
                <SmallButton
                  onPress={() => setModalVisible(!modalVisible)}
                  text="자세히 보기"
                  disabled={false}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>

      {/* 안익은 사과에 연결할 버튼!(임시) */}
      {/* <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>안익은 사과</Text>
        </Pressable> */}
      {/* 안익은 사과 모달 end */}
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

  //나중에 삭제
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'red',
  },
  //나중에 삭제 end

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
