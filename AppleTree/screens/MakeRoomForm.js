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
} from 'react-native';
import moment from 'moment';
import 'moment/locale/ko';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {SmallButton} from '../components/Button';
import {makeRoomAPI} from '../api/AppleAPI';
import {UseStomp, DisconnectIfConnected} from '../stomp';
import {ScrollView} from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import Loading from './LoadingDefault';

async function requestPermission() {
  try {
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always');
    }
    // 안드로이드 위치 정보 수집 권한 요청
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  } catch (e) {
    console.log(e);
  }
}

const MakeRoomForm = ({navigation: {navigate}}) => {
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
    if (date <= today) {
      alert('오늘 또는 과거의 날짜는 선택할 수 없습니다.');
      showDatePicker();
    } else {
      hideDatePicker();
      setUnlockDate(moment(date).format('YYYY-MM-DD'));
      onChangeText(moment(date).format('YYYY-MM-DD'));
      setDateValid(true);
    }
  };

  // location
  const [useLocation, setUseLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  //date picker end
  let today = new Date();
  var tomorrow = new Date(today.setDate(today.getDate() + 1));

  useEffect(() => {
    requestPermission().then(result => {
      console.log({result});
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
  }, []);

  //방 만들기(groupSession으로 이동)
  const makeRoom = () => {
    // console.log('makeRoom:::');
    // api connect start
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
              navigate('GroupSession', {roomId: roomId, appleId: appleId});
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
    <ScrollView contentContainerStyle={styles.scroll}>
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../assets/pictures/listgroup1.png')}
          style={styles.image}
        />
        <View style={styles.marginTopBottom}>
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
          <View style={styles.form}>
            <Pressable onPress={showDatePicker}>
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
                minimumDate={tomorrow}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </Pressable>
          </View>
          <View style={styles.buttonWrap}>
            <SmallButton
              onPress={() => makeRoom()}
              text="방 만들기"
              disabled={!titleValid || !teamNameValid || !dateValid}
            />
            {/* <SmallButton
              onPress={() => navigate('JoinSession')}
              text="방 번호로   입장하기"
              disabled={false}
            /> */}
          </View>
          <Text onPress={() => navigate('JoinSession')} style={styles.copyText}>
            here! 방 번호로 참여하기
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#FBF8F6',
    padding: 10,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: '100%',
    backgroundColor: '#FBF8F6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  marginTopBottom: {
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: 300,
    height: 50,
    backgroundColor: '#ECE5E0',
    borderRadius: 10,
  },
  input: {
    justifyContent: 'center',
    flex: 0.7,
    backgroundColor: '#ECE5E0',
    color: '#4C4036',
    fontSize: 13,
    fontFamily: 'UhBee Se_hyun',
    textAlign: 'center',
  },
  image: {
    resizeMode: 'contain',
    marginBottom: 10,
    height: 260,
  },
  imageTitle: {
    resizeMode: 'contain',
    marginBottom: 10,
    width: 140,
    height: 80,
  },
  button: {
    width: 300,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#373043',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    textAlign: 'left',
    fontSize: 15,
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#4C4036',
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  copyText: {
    fontSize: 13,
    color: '#373043',
    fontFamily: 'UhBee Se_hyun Bold',
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
export default MakeRoomForm;
