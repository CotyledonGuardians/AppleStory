import React, {useState} from 'react';
import {
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {SmallButton, SmallWhiteButton} from '../components/Button';

const RecordVoiceTest = () => {
  // recordStatus : 0(녹음된 내용이 없음), 1(녹음 중), 2(녹음된 완료/재생가능), 3(녹음된 파일 임시 정지)
  const [recordStatus, setRecordStatus] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00');
  const [playTime, setPlayTime] = useState('00:00');
  const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(new AudioRecorderPlayer());
  audioRecorderPlayer.setSubscriptionDuration(0.1);

  const onStartRecord = () => {
    startRecord()
    .then(() => {
        setRecordStatus(1);
        // Alert.alert('녹음 시작!');
    })
    .catch(() => {
        Alert.alert('녹음 시작 불가!');
    });
  }

  const onStopRecord = () => {
    stopRecord()
    .then(() => {
      // Alert.alert('녹음 완료!');
      setRecordStatus(2);
    })
    .catch(() => {
        Alert.alert('녹음 완료 불가!');
    });
  }

  const onRetryRecord = () => {
    // 기존 플레이어를 제거하고, callback listener 제거
    try{
      stopPlay();
    } catch(err) {
      console.log("err:removePlayer ", err);
    }
    setAudioRecorderPlayer(new AudioRecorderPlayer());
    setRecordTime(0);
    setRecordStatus(0);
  }

  const onPlayRecord = () => {
    playRecord()
    .then(() => {
      // Alert.alert('녹음 듣기!');
      setRecordStatus(3);
    })
    .catch(() => {
        Alert.alert('녹음 듣기 불가!');
    });
  }

  const onPausePlay = () => {
    pausePlay()
    .then(() => {
      // Alert.alert('녹음 듣기 중지!');
      setRecordStatus(4);
    })
    .catch(() => {
        Alert.alert('녹음 듣기 중지 불가!');
    });
  }

  const onResumePlay = () => {
    resumePlay()
    .then(() => {
      setRecordStatus(3);
      // Alert.alert('녹음 듣기!');
    })
    .catch(() => {
        Alert.alert('녹음 듣기 불가!');
    });
  }

  const startRecord = async () => {
    //권한 설정
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
  
        console.log('write external stroage', grants);
  
        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    console.log(`startRecord ${audioRecorderPlayer._isRecording}`);
    const result = await audioRecorderPlayer.startRecorder().then((uri) => {
        return uri;
    }).catch((err) => {
        console.log("Error in startRecorder: ". err);
    });
    
    try{  
      audioRecorderPlayer.addRecordBackListener((e) => {
        if(Math.floor(e.currentPosition/1000) >= 60) {
          onStopRecord();
        }
        // setRecordSecs(e.currentPosition/1000);
        setRecordTime(audioRecorderPlayer.mmss(Math.floor(e.currentPosition/1000)));
      });
    } catch(err) {
      console.log(`addListener: ${err}`)
    }
    console.log(`startRecorder: ${result}`);
  }

  const stopRecord = async () => {
    console.log(`stopRecord ${audioRecorderPlayer._isRecording}`);
    const result = await audioRecorderPlayer.stopRecorder()
    .then((uri) => uri)
    .catch((err) => {
      console.log('Error in stopRecord: ', err);
    });
    audioRecorderPlayer.removeRecordBackListener();
    console.log(`stopRecorder: ${result}`);
  };

  const playRecord = async () => {
    console.log('onStartPlay');

    const msg = await audioRecorderPlayer.startPlayer().catch((err) => {
      console.log("Error in startPlayer: ", err);
    });
    const volume = await audioRecorderPlayer.setVolume(1.0).catch((err) => {
      console.log("Error in setVolume: ", err);
    });
    console.log(`file: ${msg}`, `volume: ${volume}`);

    audioRecorderPlayer.addPlayBackListener((e) => {
        const _playTime = audioRecorderPlayer.mmss(
          Math.floor(e.currentPosition/1000));
        const _duration = audioRecorderPlayer.mmss(
          Math.floor(e.duration/1000));

        if(_playTime === _duration) {
          stopPlay();
          setPlayTime("00:00");
          playRecord();
        }

        setPlayTime(_playTime);
    });
  };

  const pausePlay = async () => {
    try {
      await audioRecorderPlayer.pausePlayer()
      .catch((err) => {
        console.log("Error in pausePlay: ", err);
      });
    } catch(err) {
      console.log('Err: pausePlayingRecord');
    }
  }

  const resumePlay = async () => {
    try {
      await audioRecorderPlayer.resumePlayer().catch((err) => {
        console.log('Error in resumePlay: ', err);
      });
    } catch(err) {
      console.log('Error: resumePlayingRecord');
    }
  }

  const stopPlay = async () => {
    try {
      await audioRecorderPlayer.stopPlayer()
      .catch((err) => {
        console.log('Error in stopPlay: ', err);
      });
      audioRecorderPlayer.removePlayBackListener();
    } catch(err) {
      console.log('Error: stopPlay');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.headerText}>사과에 남길 말을 담아주세요!</Text>
      </View>
      <View style={styles.recordBox}>
        <Text style={styles.recordText}>최대 1분</Text>
        <View style={styles.test}>
          {(recordStatus === 2 || recordStatus === 4) ?
          <View style={styles.retryBox}>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={onRetryRecord}>
              <Image
                style={styles.retryImg}
                source={require('../assets/icons/retry.png')}
              />
            </TouchableOpacity>
            <Text>다시 녹음</Text>
          </View>:<View style={styles.dummyBox}></View>}
          <View style={styles.recordButtonBox}>
            { (recordStatus === 0) ?
              (<TouchableOpacity 
                style={styles.recordButton}
                onPress={onStartRecord}>
                <Image
                  style={styles.recordImg}
                  source={require('../assets/icons/mic.png')}
                />
              </TouchableOpacity>)
              : ( (recordStatus === 1) ?
               (<TouchableOpacity
                style={styles.recordButton}
                onPress={onStopRecord}>
                <Text>{recordTime}</Text>
                <Image
                  style={styles.recordImg}
                  source={require('../assets/icons/stop.png')}
                />
              </TouchableOpacity>) 
              : ((recordStatus === 2) ? 
                (<TouchableOpacity
                  style={styles.recordButton}
                  onPress={onPlayRecord}>
                  <Text>{recordTime}</Text>
                  <Image
                    style={styles.recordImg}
                    source={require('../assets/icons/play.png')}
                  />
                </TouchableOpacity>)
              : ((recordStatus === 3) ? (<TouchableOpacity
                style={styles.recordButton}
                onPress={onPausePlay}>
                <Text>{playTime} / {recordTime}</Text>
                <Image
                  style={styles.recordImg}
                  source={require('../assets/icons/pause.png')}
                />
              </TouchableOpacity>) 
              // recordSatatus === 4
              : (<TouchableOpacity
                style={styles.recordButton}
                onPress={onResumePlay}>
                <Text>{playTime} / {recordTime}</Text>
                <Image
                  style={styles.recordImg}
                  source={require('../assets/icons/play.png')}
                />
              </TouchableOpacity>))
              )
              )
            }
          </View>
          <View style={styles.dummyBox}></View>
        </View>
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
  recordButtonBox: {
    flex: 2,
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
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
    // alignItems: 'flex-start',
  },
  recordImg: {
    width: 60,
    height: 60,
  },
  retryButton: {
    backgroundColor: '#FBF8F6',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
  retryBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  retryImg: {
    width: 30,
    height: 30,
  },
  dummyBox: {
    flex: 1,
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
  test: {
    flexDirection: 'row',
  },

});

export default RecordVoiceTest;
