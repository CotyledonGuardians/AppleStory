import React, {useState} from 'react';
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
const MakeRoomForm = ({navigation}) => {
  //제목, 팀이름, 해제 날짜
  const [title, setTitle] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const [unlockDate, setUnlockDate] = useState(null);
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
    // console.warn('A date has been picked: ', date);
    setUnlockDate(date);
    onChangeText(moment(date).format('YYYY-MM-DD'));
    setDateValid(true);
    hideDatePicker();
  };
  //date picker end
  let today = new Date();
  const makeRoom = () => {
    alert('방만들기 함수 호출');
    navigation.navigate('GroupSession', {screen: 'GroupSession'});
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
  // console.warn('valid: ' + titleValid + teamNameValid + dateValid + '끝');
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/pictures/listgroup1.png')}
        style={{width: 170, height: 170}}></Image>
      <View style={styles.marginTopBottom}>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 15,
            fontFamily: 'UhBee Se_hyun Bold',
            color: '#4C4036',
          }}>
          제목
        </Text>
        <View style={styles.form}>
          <TextInput
            value={title}
            autoCapitalize={'none'}
            style={styles.input}
            placeholder="자율프로젝트를 기념하며"
            onChangeText={text => titleChangeHandler(text)}
          />
        </View>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 15,
            fontFamily: 'UhBee Se_hyun Bold',
            color: '#4C4036',
          }}>
          팀 이름
        </Text>
        <View style={styles.form}>
          <TextInput
            value={teamName}
            autoCapitalize={'none'}
            style={styles.input}
            placeholder="떡잎방범대"
            onChangeText={text => teamNameChangeHandler(text)}
          />
        </View>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 15,
            fontFamily: 'UhBee Se_hyun Bold',
            color: '#4C4036',
          }}>
          해제 날짜
        </Text>
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
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <SmallButton
            onPress={() => makeRoom()}
            text="방 만들기"
            disabled={!titleValid || !teamNameValid || !dateValid}
          />
          <SmallButton
            onPress={() => navigation.goBack()}
            text="홈으로"
            disabled={false}
          />
        </View>
      </View>
    </SafeAreaView>
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
});
export default MakeRoomForm;
