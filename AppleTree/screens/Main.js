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
} from 'react-native';
import {SmallButton} from '../components/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getOpenAppleList, getCloseAppleList} from '../api/AppleAPI';

const Apple = ({index, apple}) => {
  const appleStyle = [
    styles.apple1,
    styles.apple2,
    styles.apple3,
    styles.apple4,
    styles.apple5,
    styles.apple6,
  ];

  // 남은 시간에 따라 사과 사진 변경
  let imgUrl = [
    require('../assets/pictures/apple1.png'),
    require('../assets/pictures/apple2.png'),
    require('../assets/pictures/apple3.png'),
    require('../assets/pictures/apple4.png'),
  ];

  return <Image style={appleStyle[index]} source={imgUrl[3]} />;
};

const Main = () => {
  useEffect(() => {
    getCloseAppleList(3, 0, 6)
      .then(response => {
        console.log('response', response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  });
  const [modalVisible, setModalVisible] = useState(false);
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
      {/* {!isLoading
        ? console.log('appleList', appleList)
        : console.log('loading')} */}
      <ImageBackground
        style={styles.backgroundImg}
        source={require('../assets/pictures/main.png')}>
        <Image
          style={styles.hanging}
          source={require('../assets/gifs/hanging.gif')}
        />
        {/* {appleList.length > 0 ? (
          <Apple index={0} apple={appleList[0]} />
        ) : (
          <></>
        )}
        {appleList.length > 1 ? (
          <Apple index={1} apple={appleList[1]} />
        ) : (
          <></>
        )}
        {appleList.length > 2 ? (
          <Apple index={2} apple={appleList[2]} />
        ) : (
          <></>
        )}
        {appleList.length > 3 ? (
          <Apple index={3} apple={appleList[3]} />
        ) : (
          <></>
        )}
        {appleList.length > 4 ? (
          <Apple index={4} apple={appleList[4]} />
        ) : (
          <></>
        )}
        {appleList.length > 5 ? (
          <Apple index={5} apple={appleList[5]} />
        ) : (
          <></>
        )}
        {openApples.length > 0 ? (
          <Image
            style={styles.basket}
            source={require('../assets/pictures/basketfull.png')}
          />
        ) : (
          <Image
            style={styles.basket}
            source={require('../assets/pictures/basket.png')}
          />
        )} */}

        <Apple index={0} />
        <Apple index={1} />
        <Apple index={2} />
        <Apple index={3} />
        <Apple index={4} />
        <Apple index={5} />
        <Image
          style={styles.basket}
          source={require('../assets/pictures/basketfull.png')}
        />
        <Image
          style={styles.bear}
          source={require('../assets/gifs/eatingApple.gif')}
        />
      </ImageBackground>
      {/* 안익은 사과 모달 start */}
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
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
        {/* 안익은 사과에 연결할 버튼!(임시) */}
        {/* <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>안익은 사과</Text>
        </Pressable> */}
      </View>
      {/* 안익은 사과 모달 end */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    width: '100%',
    height: '100%',
  },
  hanging: {
    width: wp('20%'),
    height: hp('30%'),
    top: 0,
    left: wp('90%'),
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
  basket: {
    width: wp('28%'),
    height: wp('29%'),
    position: 'absolute',
    top: hp('65%'),
    left: wp('10%'),
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
