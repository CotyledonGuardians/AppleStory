import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  Platform,
  PermissionsAndroid,
  Modal,
  Alert,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/ko';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {SmallButton} from '../components/Button';
import {makeRoomAPI} from '../api/AppleAPI';
import {UseStomp, DisconnectIfConnected} from '../stomp';
import Loading from '../screens/LoadingDefault';
import Geolocation from 'react-native-geolocation-service';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {black} from 'react-native-paper/lib/typescript/styles/colors';

const MakeRoomForm = ({navigation}) => {
  //inputs
  const [title, setTitle] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const [unlockDate, setUnlockDate] = useState(null);
  const [appleDTO, setAppleDTO] = useState(null);
  //datePicker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [text, onChangeText] = useState('');
  const placeholder = '클릭';
  //input Valid check
  const [titleValid, setTitleValid] = useState(false);
  const [teamNameValid, setTeamNameValid] = useState(false);
  const [dateValid, setDateValid] = useState(false);
  const [loading, setLoading] = useState(false);
  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOk, setModalOk] = useState(false);
  //date picker start
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    // console.log('date::', date);
    let today = new Date();
    // if (date <= today) {
    //   alert('오늘 또는 과거의 날짜는 선택할 수 없습니다.');
    //   showDatePicker();
    // } else {
    hideDatePicker();
    setUnlockDate(moment(date).format('YYYY-MM-DD'));
    onChangeText(moment(date).format('YYYY-MM-DD'));
    setDateValid(true);
    // }
  };

  // location
  const [useLocation, setUseLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  async function requestPermission() {
    try {
      if (modalOk && Platform.OS === 'ios') {
        return await Geolocation.requestAuthorization('always');
      }
      // 안드로이드 위치 정보 수집 권한 요청
      if (modalOk && Platform.OS === 'android') {
        return await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
  //date picker end
  let today = new Date();
  let tomorrow = new Date(today.setDate(today.getDate() + 1));
  let yesterday = new Date(today.setDate(today.getDate() - 1));

  let endDate = new Date(2022, 10, 21);
  // console.log('endDate', endDate);

  useEffect(() => {
    //권한 체크
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => {
        switch (result) {
          case RESULTS.DENIED:
            setModalVisible(true);
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
        }
      })
      .catch(error => {
        console.log('location permission error: ', error);
      });
  }, []);
  useEffect(() => {
    //위치사용 모달에서 확인을 누른 경우
    if (modalOk) {
      requestPermission().then(result => {
        console.log('모달확인후: ', {result});
        if (result === 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              setUseLocation({
                latitude,
                longitude,
              });
            },
            error => {
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      });
    }
  }, [modalOk]);

  const checkInput = () => {
    if (!titleValid) {
      Alert.alert('제목을 입력해주세요.');
      return false;
    }

    if (!teamNameValid) {
      Alert.alert('팀 이름을 입력해주세요.');
      return false;
    }

    if (!dateValid) {
      Alert.alert('해제 날짜를 입력해주세요.');
      return false;
    }

    return true;
  };

  //방 만들기(groupSession으로 이동)
  const makeRoom = () => {
    // console.log('makeRoom:::');
    // api connect start

    if (!checkInput()) {
      return;
    }

    const tempAppleDTO = {
      title: title,
      creator: {
        teamName: teamName,
      },
      unlockAt: unlockDate,
      location: {
        lat: useLocation.latitude !== 0 ? useLocation.latitude : null,
        lng: useLocation.longitude !== 0 ? useLocation.longitude : null,
      },
    };
    setAppleDTO(tempAppleDTO);
    setLoading(true);
    // console.log('tempAppleDTO', tempAppleDTO);
    makeRoomAPI(tempAppleDTO)
      .then(response => {
        console.log('makeRoom::response', response);
        console.log('makeRoom::response.data', response.data);
        return response.data;
      })
      .then(({roomId, appleId}) => {
        const connect = () => {
          UseStomp(
            () => {
              console.log('make room succeed', roomId, appleId);
              navigation.navigate('GroupSession', {
                roomId: roomId,
                appleId: appleId,
              });
            },
            () => {
              console.log('make room failed', roomId);
            },
          );
        };
        DisconnectIfConnected(connect, {}, connect);
      })
      .catch(error => {
        console.log('makeRoom::error', error);
      });
    // api connect end
  };
  // input valid handler start
  const titleChangeHandler = text => {
    if (text.trim().length === 0) {
      setTitleValid(false);
    } else {
      setTitleValid(true);
    }
    setTitle(text);
  };
  const teamNameChangeHandler = text => {
    if (text.trim().length === 0) {
      setTeamNameValid(false);
    } else {
      setTeamNameValid(true);
    }
    setTeamName(text);
  };

  // inpust valid handler end
  return !loading ? (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          source={require('../assets/pictures/listgroup1.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.formBox}>
        <Text style={styles.txt}>제목</Text>
        <View style={styles.form}>
          <TextInput
            value={title}
            autoCapitalize={'none'}
            style={styles.input}
            placeholder="제목을 입력하세요."
            onChangeText={text => titleChangeHandler(text)}
          />
        </View>
        <Text style={styles.txt}>팀 이름</Text>
        <View style={styles.form}>
          <TextInput
            value={teamName}
            autoCapitalize={'none'}
            style={styles.input}
            placeholder="팀 명을 입력하세요."
            onChangeText={text => teamNameChangeHandler(text)}
          />
        </View>
        <Text style={styles.txt}>해제 날짜</Text>

        <Pressable onPress={showDatePicker}>
          <View style={styles.form}>
            <TextInput
              pointerEvents="none"
              style={styles.input}
              placeholder={placeholder}
              underlineColorAndroid="transparent"
              editable={false}
              value={text}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              // minimumDate={tomorrow}
              minimumDate={yesterday}
              // mm배포용
              maximumDate={endDate}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              style={styles.calendar}
            />
          </View>
        </Pressable>

        <View style={styles.buttonWrap}>
          <SmallButton
            onPress={() => makeRoom()}
            text="방 만들기"
            // disabled={!titleValid || !teamNameValid || !dateValid}
          />
        </View>
        <Text
          onPress={() => navigation.navigate('JoinSession')}
          style={styles.copyText}>
          here! 방 번호로 참여하기
        </Text>
      </View>
      {/* 모달 start */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={require('../assets/icons/exclamationMark.png')}
              style={styles.imageMark}
            />
            <Text style={styles.modalText}>'사과나무 추억걸렸네' 는</Text>
            <Text style={styles.modalText}>사과를 만드는 상황에서 </Text>
            <Text style={styles.modalText}>사과에 위치를 기록하기 위해</Text>
            <Text style={styles.modalText}>
              위치 정보를 수집/전송/저장합니다.
            </Text>
            <View style={styles.buttonBox}>
              <SmallButton
                onPress={() => {
                  setModalVisible(false);
                  navigation.goBack();
                }}
                text="취소"
                disabled={false}
              />
              <SmallButton
                onPress={() => {
                  setModalOk(true);
                  setModalVisible(false);
                }}
                text="동의"
                disabled={false}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* </View> */}
    </SafeAreaView>
  ) : (
    <Loading />
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
  formBox: {
    flex: 6,
    justifyContent: 'center',
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('1%'),
    width: wp('70%'),
    height: hp('7%'),
    backgroundColor: '#ECE5E0',
    borderRadius: 10,
  },
  input: {
    justifyContent: 'center',
    flex: 0.8,
    backgroundColor: '#ECE5E0',
    color: '#4C4036',
    width: wp('70%'),
    height: hp('7%'),
    fontSize: wp('3%'),
    fontFamily: 'UhBee Se_hyun',
    textAlign: 'center',
  },
  imageBox: {
    flex: 3.5,
    justifyContent: 'flex-end',
  },
  image: {
    resizeMode: 'contain',
    width: wp('50%'),
    height: wp('50%'),
  },
  txt: {
    textAlign: 'left',
    fontSize: wp('4%'),
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#4C4036',
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  copyText: {
    fontSize: wp('3.5%'),
    color: '#373043',
    fontFamily: 'UhBee Se_hyun Bold',
    marginTop: hp('1.5%'),
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  calendar: {
    width: wp('90%'),
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
    marginTop: hp('1%'),
    flexDirection: 'row',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'UhBee Se_hyun',
    fontSize: wp('4%'),
    color: '#000000',
    marginBottom: wp('2%'),
    textAlign: 'center',
    flexDirection: 'column',
  },
  imageMark: {
    resizeMode: 'contain',
    width: wp('12%'),
    height: wp('12%'),
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
  },
  //모달 스타일 end
});
export default MakeRoomForm;
