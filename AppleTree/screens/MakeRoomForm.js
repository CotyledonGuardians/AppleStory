import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/ko';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {SmallButton} from '../components/Button';
import {makeRoomAPI} from '../api/AppleAPI';
import {UseStomp} from '../stomp';
import GroupSession from '../sessions/GroupSession';
import JoinSession from './test/JoinSession';
import {ScrollView} from 'react-native-gesture-handler';
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
  //date picker start
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    setUnlockDate(moment(date).format('YYYY-MM-DD'));
    onChangeText(moment(date).format('YYYY-MM-DD'));
    setDateValid(true);
    hideDatePicker();
  };
  //date picker end
  let today = new Date();
  // useEffect(()=>{

  // },[]);
  //방 만들기(groupSession으로 이동)
  const makeRoom = () => {
    console.log('makeRoom:::');
    // api connect start
    const tempAppleDTO = {
      title: title,
      creator: {
        teamName: teamName,
      },
      unlockAt: unlockDate,
      location: {
        lat: 37.5,
        lng: 127.5,
      },
    };
    setAppleDTO(tempAppleDTO);
    // console.log('tempAppleDTO', tempAppleDTO);
    makeRoomAPI(tempAppleDTO)
      .then(response => {
        console.log('makeRoom::response', response);
        // console.log('makeRoom::response.data', response.data);
        return response.data;
      })
      .then(({roomId}) => {
        UseStomp(
          () => {
            console.log('make room succeed', roomId);
            navigate('GroupSession', {roomId: roomId});
          },
          () => {
            console.log('make room failed', roomId);
            navigate('GroupSession');
          },
        );
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
  return (
    <ScrollView>
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
                headerTextIOS={placeholder}
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </Pressable>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            minimumDate={today}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <View style={styles.buttonWrap}>
            <SmallButton
              onPress={() => makeRoom()}
              text="방 만들기"
              disabled={!titleValid || !teamNameValid || !dateValid}
            />
            <SmallButton
              onPress={() => navigate('JoinSession')}
              text="입장하기"
              disabled={false}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
});
export default MakeRoomForm;
