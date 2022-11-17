import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
  Slider,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Sound from 'react-native-sound';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
// import Slider from '@react-native-community/slider';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const img_speaker = require('../../assets/icons/mic.png');
const img_pause = require('../../assets/icons/mic.png');
const img_play = require('../../assets/icons/mic.png');
const img_playjumpleft = require('../../assets/icons/mic.png');
const img_playjumpright = require('../../assets/icons/mic.png');

export default class PlayerScreen extends React.Component {
  videoPlayer;

  constructor(props) {
    super();
    this.state = {
      playState: 'paused', //playing, paused
      playSeconds: 0,
      duration2: 0,
      nickname: props.route.params.nickname,
      text: '',
      image: '',
      video: '',
      audio: '',
      imgUrl: '',
      currentTime: 0,
      duration: 0,
      isFullScreen: true,
      isLoading: true,
      paused: true,
      playerState: PLAYER_STATES.PAUSED,
      screenType: 'cover',
    };
    this.sliderEditing = false;
    let uid = props.route.params.uid;
    let data = props.route.params.data;
    if (data.content.text != null) {
      for (let i = 0; i < data.content.text.length; i++) {
        if (data.content.text[i].author === uid) {
          this.text = data.content.text[i].content;
          break;
        }
      }
    }
  }

  async componentDidMount() {
    let uid = this.props.route.params.uid;
    let data = this.props.route.params.data;

    if (data.content.photo != null) {
      for (let i = 0; i < data.content.photo.length; i++) {
        if (data.content.photo[i].author === uid) {
          const imageRef = storage().ref(data.content.photo[i].content);
          await imageRef.getDownloadURL().then(url => {
            this.setState({image: url});
          });
          break;
        }
      }
    }

    if (data.content.video != null) {
      for (let i = 0; i < data.content.video.length; i++) {
        if (data.content.video[i].author === uid) {
          const videoRef = storage().ref(data.content.video[i].content);
          videoRef.getDownloadURL().then(url => {
            this.setState({video: url});
          });
          break;
        }
      }
    }

    if (data.content.audio != null) {
      for (let i = 0; i < data.content.audio.length; i++) {
        if (data.content.audio[i].author === uid) {
          const audioRef = storage().ref(data.content.audio[i].content);
          audioRef.getDownloadURL().then(url => {
            this.setState({audio: url});
          });
          break;
        }
      }
    }

    this.timeout = setInterval(() => {
      if (
        this.sound &&
        this.sound.isLoaded() &&
        this.state.playState == 'playing' &&
        !this.sliderEditing
      ) {
        this.sound.getCurrentTime((seconds, isPlaying) => {
          this.setState({playSeconds: seconds});
        });
      }
    }, 100);
  }
  componentWillUnmount() {
    if (this.sound) {
      this.sound.release();
      this.sound = null;
    }
    if (this.timeout) {
      clearInterval(this.timeout);
    }
  }

  onSliderEditStart = () => {
    this.sliderEditing = true;
  };
  onSliderEditEnd = () => {
    this.sliderEditing = false;
  };
  onSliderEditing = value => {
    if (this.sound) {
      this.sound.setCurrentTime(value);
      this.setState({playSeconds: value});
    }
  };

  play = () => {
    if (this.sound) {
      this.sound.play(this.playComplete);
      this.setState({playState: 'playing'});
    } else {
      const filepath = this.state.audio;
      this.sound = new Sound(filepath, null, error => {
        if (error) {
          console.log('failed to load the sound', error);
          // Alert.alert('Notice', 'audio file error. (Error code : 1)');
          this.setState({playState: 'paused'});
        } else {
          this.setState({
            playState: 'playing',
            duration2: this.sound.getDuration(),
          });
          this.sound.play(this.playComplete);
        }
      });
    }
  };
  playComplete = success => {
    if (this.sound) {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        // Alert.alert('Notice', 'audio file error. (Error code : 2)');
      }
      this.setState({playState: 'paused', playSeconds: 0});
      this.sound.setCurrentTime(0);
    }
  };

  pause = () => {
    if (this.sound) {
      this.sound.pause();
    }

    this.setState({playState: 'paused'});
  };

  jumpPrev15Seconds = () => {
    this.jumpSeconds(-15);
  };
  jumpNext15Seconds = () => {
    this.jumpSeconds(15);
  };
  jumpSeconds = secsDelta => {
    if (this.sound) {
      this.sound.getCurrentTime((secs, isPlaying) => {
        let nextSecs = secs + secsDelta;
        if (nextSecs < 0) nextSecs = 0;
        else if (nextSecs > this.state.duration2)
          nextSecs = this.state.duration2;
        this.sound.setCurrentTime(nextSecs);
        this.setState({playSeconds: nextSecs});
      });
    }
  };

  getAudioTimeString(seconds) {
    const m = parseInt((seconds % (60 * 60)) / 60);
    const s = parseInt(seconds % 60);

    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
  }

  //Handler for change in seekbar
  onSeek = seek => {
    this.videoPlayer.seek(seek);
  };

  //Handler for Video Pause
  onPaused = playerState => {
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  //Handler for Replay
  onReplay = () => {
    this.setState({playerState: PLAYER_STATES.PLAYING});
    this.videoPlayer.seek(0);
  };

  // Video Player will continue progress even if the video already ended
  onProgress = data => {
    const {isLoading, playerState} = this.state;

    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({currentTime: data.currentTime});
    }
  };

  onLoad = data => this.setState({duration: data.duration, isLoading: false});

  onLoadStart = data => this.setState({isLoading: true});

  onEnd = () => this.setState({playerState: PLAYER_STATES.ENDED});

  onError = () => alert('Something Wrong!! ', error);

  exitFullScreen = () => {
    alert('Exit full screen');
  };

  enterFullScreen = () => {
    alert('entered full screen');
  };

  onFullScreen = () => {
    if (this.state.screenType == 'contain')
      this.setState({screenType: 'cover'});
    else this.setState({screenType: 'contain'});
  };
  renderToolbar = () => (
    <View>
      <Text>Video Streaming Example </Text>
    </View>
  );

  onSeeking = currentTime => this.setState({currentTime});

  checkPermission = async type => {
    if (Platform.OS === 'ios') {
      this.downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: '미디어 저장소 접근 요청',
            message:
              '파일을 다운받으려면 미디어 저장소에 접근을 허용해야 합니다.',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          this.downloadFile(type);
          // console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert(
            '파일 저장 불가',
            '미디어 저장소에 접근을 허용해야 합니다.',
          );
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  downloadFile = type => {
    let date = new Date();
    let FILE_URL = '';

    if (type === 'image') {
      FILE_URL = this.state.image;
    } else if (type === 'video') {
      FILE_URL = this.state.video;
    } else {
      FILE_URL = this.state.audio;
    }
    let extension = this.getExtFromURL(FILE_URL);

    if (FILE_URL !== '') {
      // config: To get response by passing the downloading related options
      // fs: Root directory path to download
      const {config, fs} = RNFetchBlob;
      let RootDir = fs.dirs.DownloadDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          path:
            RootDir +
            '/apple_story/' +
            type +
            '/' +
            type +
            '_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            extension,
          notification: true,
          // useDownloadManager works with Android only
          useDownloadManager: true,
        },
      };
      config(options)
        .fetch('GET', FILE_URL)
        .then(res => {
          console.log('res -> ', JSON.stringify(res));
          alert('저장 완료!');
        })
        .catch(error => {
          console.log('File Download Error ', error);
        });
    } else {
      console.log('File Url Error..');
    }
  };

  getFileExtention = fileUrl => {
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  getExtFromURL = url => {
    const _startQuery = url.lastIndexOf('?');
    const urlWithoutQuery = url.substring(0, _startQuery);
    const _lastDot = urlWithoutQuery.lastIndexOf('.');
    const _fileExt = urlWithoutQuery
      .substring(_lastDot, urlWithoutQuery.length)
      .toLowerCase()
      .trim();
    return _fileExt;
  };

  render() {
    const {navigate} = this.props.navigation;
    const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    const durationString = this.getAudioTimeString(this.state.duration2);
    return (
      <SafeAreaView style={styles.container}>
        <Text style={[styles.textFontBold, styles.header]}>
          {this.state.nickname}님의 기록
        </Text>
        {!this.text &&
          !this.state.image &&
          !this.state.video &&
          !this.state.audio && (
            <View style={styles.emptyData}>
              <Image
                source={require('../../assets/pictures/aegom3.png')}
                style={{
                  resizeMode: 'contain',
                  height: hp('25%'),
                }}
              />
              <Text style={styles.textFont}>기록된 데이터가 없어요 ㅠㅠ</Text>
            </View>
          )}
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.text && (
            <View style={styles.textBox}>
              <Text style={styles.textFont}>{this.text}</Text>
            </View>
          )}
          {this.state.image !== '' && (
            <View style={styles.imageBox}>
              <TouchableOpacity
                onPress={() => {
                  navigate('ImageFullScreen', {
                    url: this.state.image,
                  });
                }}>
                <Image
                  style={{
                    // marginTop: hp('1%'),
                    height: '100%',
                    aspectRatio: 1.6,
                    flex: 1,
                    width: '100%',
                    resizeMode: 'contain',
                  }}
                  source={{
                    uri: this.state.image,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          {this.state.video !== '' && (
            <View
              style={{width: '100%', height: hp('30%'), marginTop: hp('3%')}}>
              <Video
                style={styles.mediaPlayer}
                onEnd={this.onEnd}
                onLoad={this.onLoad}
                onLoadStart={this.onLoadStart}
                onProgress={this.onProgress}
                paused={this.state.paused}
                ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                resizeMode={this.state.screenType}
                onFullScreen={this.state.isFullScreen}
                source={{uri: this.state.video}}
                repeat={false}
                controls={false}
                volume={10}
              />
              <MediaControls
                duration={this.state.duration}
                isLoading={this.state.isLoading}
                mainColor="#333"
                // onFullScreen={this.onFullScreen}
                onPaused={this.onPaused}
                onReplay={this.onReplay}
                onSeek={this.onSeek}
                onSeeking={this.onSeeking}
                playerState={this.state.playerState}
                progress={this.state.currentTime}
                // toolbar={this.renderToolbar()}
              />
            </View>
          )}
          {this.state.audio !== '' && (
            <View style={styles.audioBox}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginVertical: wp('1%'),
                  }}>
                  <TouchableOpacity
                    onPress={this.jumpPrev15Seconds}
                    style={{justifyContent: 'center'}}>
                    <Image
                      source={require('../../assets/icons/rotate-left.png')}
                      style={{
                        width: wp('5%'),
                        height: hp('5%'),
                        resizeMode: 'contain',
                      }}
                    />
                    <Text style={styles.textFontJump}>15</Text>
                  </TouchableOpacity>
                  {this.state.playState == 'playing' && (
                    <TouchableOpacity
                      onPress={this.pause}
                      style={{marginHorizontal: wp('5%')}}>
                      <Image
                        source={require('../../assets/icons/pause.png')}
                        style={{
                          width: wp('5%'),
                          height: hp('5%'),
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                  )}
                  {this.state.playState == 'paused' && (
                    <TouchableOpacity
                      onPress={this.play}
                      style={{marginHorizontal: wp('5%')}}>
                      <Image
                        source={require('../../assets/icons/playbrown.png')}
                        style={{
                          width: wp('5%'),
                          height: hp('5%'),
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={this.jumpNext15Seconds}
                    style={{justifyContent: 'center'}}>
                    <Image
                      source={require('../../assets/icons/rotate-right.png')}
                      style={{
                        width: wp('5%'),
                        height: hp('5%'),
                        resizeMode: 'contain',
                      }}
                    />
                    <Text style={styles.textFontJump}>15</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    // marginVertical: 10,
                    marginHorizontal: 15,
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.textFontTime}>{currentTimeString}</Text>
                  <Slider
                    onTouchStart={this.onSliderEditStart}
                    onTouchEnd={this.onSliderEditEnd}
                    onValueChange={this.onSliderEditing}
                    value={this.state.playSeconds}
                    maximumValue={this.state.duration2}
                    maximumTrackTintColor="gray"
                    minimumTrackTintColor="#4C4036"
                    thumbTintColor="#4C4036"
                    style={{
                      flex: 1,
                      alignSelf: 'center',
                      marginHorizontal: Platform.select({ios: 5}),
                    }}
                  />
                  <Text style={styles.textFontTime}>{durationString}</Text>
                </View>
              </View>
            </View>
          )}
          {(this.state.image !== '' ||
            this.state.video !== '' ||
            this.state.audio !== '') && (
            <View style={styles.download}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text style={styles.txtTitle}>다운로드</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  marginTop: hp('1%'),
                  margin: hp('20%'),
                }}>
                {this.state.image !== '' && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.checkPermission('image')}>
                    <Text style={styles.txt}>사진</Text>
                    <Image
                      style={styles.buttonIcon}
                      source={require('../../assets/icons/photo.png')}
                    />
                  </TouchableOpacity>
                )}
                {this.state.video !== '' && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.checkPermission('video')}>
                    <Text style={styles.txt}>영상</Text>
                    <Image
                      style={styles.buttonIcon}
                      source={require('../../assets/icons/video.png')}
                    />
                  </TouchableOpacity>
                )}
                {this.state.audio !== '' && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.checkPermission('audio')}>
                    <Text style={styles.txt}>오디오</Text>
                    <Image
                      style={styles.buttonIcon}
                      source={require('../../assets/icons/mic.png')}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF8F6',
    padding: wp('6%'),
  },
  txtTitle: {
    fontSize: wp('4%'),
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#4C4036',
  },
  txt: {
    fontSize: wp('4%'),
    fontFamily: 'UhBee Se_hyun',
    color: '#4C4036',
  },
  button: {
    paddingTop: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: wp('2%'),
    marginLeft: wp('2%'),
    alignContent: 'center',
    width: wp('21%'),
    height: hp('5%'),
    backgroundColor: '#FBF8F6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 25,
  },
  buttonIcon: {
    resizeMode: 'contain',
    width: wp('5%'),
    height: hp('4%'),
    marginLeft: wp('1%'),
  },
  download: {
    backgroundColor: '#ECE5E0',
    borderRadius: 10,
    height: hp('13%'),
    marginTop: hp('3%'),
    marginBottom: hp('3%'),
    alignContent: 'center',
    padding: hp('1%'),
    // justifyContent: 'center',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // flexDirection: 'row',
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
  header: {
    marginBottom: hp('2%'),
  },
  textFont: {
    fontFamily: 'UhBee Se_hyun',
    fontSize: hp('2%'),
  },
  textFontJump: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 1,
    fontFamily: 'UhBee Se_hyun',
    color: '#4C4036',
    fontSize: wp('2%'),
  },
  emptyData: {
    fontFamily: 'UhBee Se_hyun',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: hp('20%'),
  },
  textFontTime: {
    fontFamily: 'UhBee Se_hyun',
    alignItems: 'center',
    fontSize: wp('4%'),
    color: '#4C4036',
  },
  textFontBold: {
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#4C4036',
    fontSize: wp('4%'),
  },
  textBox: {
    backgroundColor: '#ECE5E0',
    borderRadius: 10,
    padding: wp('5%'),
  },
  imageBox: {
    marginTop: hp('3%'),
  },
  audioBox: {
    backgroundColor: '#ECE5E0',
    borderRadius: 10,
    height: hp('10%'),
    marginTop: hp('3%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
