import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
// import AudioRecorderPlayer, {
//   AVEncoderAudioQualityIOSType,
//   AVEncodingOption,
//   AudioEncoderAndroidType,
//   AudioSourceAndroidType,
//   OutputFormatAndroidType,
// } from 'react-native-audio-recorder-player';
// import type {
//   AudioSet,
//   PlayBackType,
//   RecordBackType,
// } from 'react-native-audio-recorder-player';
import {SmallButton, SmallWhiteButton} from '../components/Button';

const RecordVoice = () => {
  const [recordFlag, setRecordFlag] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.headerText}>사과에 남길 말을 담아주세요!</Text>
      </View>
      <View style={styles.recordBox}>
        <Text style={styles.recordText}>최대 1분</Text>
        {!recordFlag ? (
          <TouchableOpacity style={styles.recordButton}>
            <Image
              style={styles.recordImg}
              source={require('../assets/icons/mic.png')}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.recordButton}>
            <Image
              style={styles.recordImg}
              source={require('../assets/icons/pause.png')}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.recordText}>버튼을 눌러 녹음하세요!</Text>
      </View>
      <View style={styles.blankBox} />
      <View style={styles.bearBox}>
        <View style={styles.sideTextBox}>
          <Text style={styles.defaultText}>미래에 친구에게 전할 말을</Text>
          <Text style={styles.defaultText}>즐겁게 녹음해보세요!</Text>
        </View>
        <Image
          style={styles.bear}
          source={require('../assets/pictures/bannerpersonal.png')}
        />
      </View>
      <View style={styles.buttonBox}>
        <SmallWhiteButton text="취소" />
        <SmallButton text="완료" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF8F6',
    padding: 10,
  },
  textBox: {
    flex: 0.5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  headerText: {
    color: '#4C4036',
    fontSize: 20,
    fontFamily: 'UhBee Se_hyun',
  },
  defaultText: {
    color: '#4C4036',
    fontFamily: 'UhBee Se_hyun',
    fontSize: 12,
  },
  recordBox: {
    alignItems: 'center',
    backgroundColor: '#ECE5E0',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flex: 2,
    justifyContent: 'space-around',
  },
  recordText: {
    color: '#AAA19B',
    fontFamily: 'UhBee Se_hyun',
  },
  recordButton: {
    backgroundColor: '#FBF8F6',
    padding: 20,
    borderRadius: 50,
  },
  recordImg: {
    width: 60,
    height: 60,
  },
  blankBox: {
    flex: 1.5,
  },
  bearBox: {
    backgroundColor: '#ECE5E0',
    borderRadius: 10,
    margin: 10,
    flex: 1,
    color: '#4C4036',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sideTextBox: {
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  bear: {
    width: '35%',
    height: '100%',
  },
  buttonBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default RecordVoice;
