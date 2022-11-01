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
} from 'react-native';
import Sound from 'react-native-sound';
import Video from 'react-native-video';

const img_speaker = require('../assets/icons/mic.png');
const img_pause = require('../assets/icons/mic.png');
const img_play = require('../assets/icons/mic.png');
const img_playjumpleft = require('../assets/icons/mic.png');
const img_playjumpright = require('../assets/icons/mic.png');

const data = {
  id: 1,
  type: false,
  title: '자율 프로젝트를 기념하며',
  creator: {
    teamName: '떡잎방범대',
    hostUid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
    member: [
      {
        nickname: '영제',
        uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
      },
      {
        nickname: '낙낙',
        uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
      },
      {
        nickname: '짤리',
        uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
      },
      {
        nickname: '옌',
        uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
      },
      {
        nickname: '연다',
        uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
      },
      {
        nickname: '잠송',
        uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
      },
    ],
  },
  createAt: '2022-10-18T00:00:00.000+00:00',
  unlockAt: '2022-10-20T00:00:00.000+00:00',
  createScene: 'https://www.google.com',
  content: {
    text: [
      {
        author: '영제',
        content: 'fefefefef',
      },
      {
        author: '낙낙',
        content: 'fefefefef',
      },
      {
        author: '짤리',
        content:
          '안녕 얘들아 반가워. 워워~~ 괜찮을거야~~ \n워워~~ 워어어워어~ 나의 마음속에 눈물이 많아지는 건 아마도 슬픔이 많아서 그런 걸거야. 아직도 가슴구석 한 켠에 사랑이란... 기적을 믿어..~ 원하는 대로 되지 않을 때도 진심과 다르게 아플 때도 있을 거야.. 그럴 때마다 시간을 믿어봐. 금새 우리도 모르게 더 나아가고 있을 거야! 원하던 대로!! 모든 게 제자리로워후예 더 나아진 우리로 함ㄲ[ㅔ 할 수 있을거야~ 그때가 오면~~ 이 시간들도 분명 우리도 모르게 반짝이고 있을 거야..',
      },
    ],
    photo: [
      {
        author: '영제',
        content:
          'https://item.kakaocdn.net/do/c620e34ce78db64b44ff1e422a35e2787154249a3890514a43687a85e6b6cc82',
      },
      {
        author: '낙낙',
        content:
          'https://image.tving.com/upload/cms/caip/CAIP0400/P000388342.jpg/dims/resize/1280',
      },
      {
        author: '짤리',
        content:
          'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201706/23/b71449f8-e830-45a0-bb4d-7b1a328e19f2.jpg',
      },
      {
        author: '옌',
        content:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw7NBmuS7MRpit86BM2UdjvossRlpKvjU2yw&usqp=CAU',
      },
      {
        author: '연다',
        content: 'https://i.ytimg.com/vi/1rc2OJCPZ-c/sddefault.jpg',
      },
      {
        author: '잠송',
        content: 'https://i.ytimg.com/vi/vGAb_gmZ6RI/mqdefault.jpg',
      },
    ],
    audio: [
      {
        author: '짤리',
        content: require('./vancouver.mp3'),
      },
      {
        author: '옌',
        content:
          'https://firebasestorage.googleapis.com/v0/b/apple-tree-7f863.appspot.com/o/apple-id%2Fsimplescreenrecorder-2022-10-04_16.40.32_Trim.mp4?alt=media&token=705b0813-da0d-4049-acdc-1a9cf0b4441d',
      },
    ],
    video: [
      {
        author: '짤리',
        content: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      },
      {
        author: '짤리',
        content: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      },
      {
        author: '짤리',
        content: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      },
      {
        author: '짤리',
        content: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      },
    ],
  },
  location: null,
  useSpace: false,
  isCatch: true,
};

export default class PlayerScreen extends React.Component {
  // static navigationOptions = props => ({
  //   // title: props.navigation.state.params.title,
  //   nickname: props.navigation.state.params,
  // });

  constructor() {
    super();
    this.state = {
      playState: 'paused', //playing, paused
      playSeconds: 0,
      duration: 0,
    };
    this.sliderEditing = false;
  }

  componentDidMount() {
    // this.play();

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

  play = async () => {
    if (this.sound) {
      this.sound.play(this.playComplete);
      this.setState({playState: 'playing'});
    } else {
      const filepath = require('./vancouver.mp3');
      console.log('[Play]', filepath);

      this.sound = new Sound(filepath, (error, _sound) => {
        if (error) {
          console.log('failed to load the sound', error);
          Alert.alert('Notice', 'audio file error. (Error code : 1)');
          this.setState({playState: 'paused'});
        } else {
          this.setState({
            playState: 'playing',
            duration: this.sound.getDuration(),
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
        Alert.alert('Notice', 'audio file error. (Error code : 2)');
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
        else if (nextSecs > this.state.duration) nextSecs = this.state.duration;
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

  render() {
    let nickname = '짤리';
    // let nickname = this.props.navigation.state.params;
    let text = '';
    let image = '';
    let video = '';
    let audio = '';
    for (let i = 0; i < data.content.text.length; i++) {
      if (data.content.text[i].author === nickname) {
        text = data.content.text[i].content;
        break;
      }
    }
    for (let i = 0; i < data.content.photo.length; i++) {
      if (data.content.photo[i].author === nickname) {
        image = data.content.photo[i].content;
        break;
      }
    }
    for (let i = 0; i < data.content.video.length; i++) {
      if (data.content.video[i].author === nickname) {
        video = data.content.video[i].content;
        break;
      }
    }
    for (let i = 0; i < data.content.audio.length; i++) {
      if (data.content.audio[i].author === nickname) {
        audio = data.content.audio[i].content;
        break;
      }
    }
    const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    const durationString = this.getAudioTimeString(this.state.duration);

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.textFontBold}>{nickname}님의 기록</Text>
          {text !== '' && (
            <View style={styles.textBox}>
              <Text style={styles.textFont}>{text}</Text>
            </View>
          )}
          {image !== '' && (
            <View style={styles.imageBox}>
              <Image
                style={{width: '100%', height: 200}}
                source={{
                  uri: image,
                }}
              />
            </View>
          )}
          {video !== '' && (
            <Video
              source={{
                uri: video,
              }}
              style={{width: '100%', height: 200, marginTop: '5%'}}
              paused={false} // 재생/중지 여부
              resizeMode={'cover'} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
              onLoad={e => console.log(e)} // 미디어가 로드되고 재생할 준비가 되면 호출되는 콜백 함수입니다.
              repeat={true} // video가 끝나면 다시 재생할 지 여부
              onAnimatedValueUpdate={() => {}}
            />
          )}
          {audio !== '' && (
            <View style={styles.audioBox}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginVertical: 10,
                  }}>
                  <TouchableOpacity
                    onPress={this.jumpPrev15Seconds}
                    style={{justifyContent: 'center'}}>
                    <Image
                      source={require('../assets/icons/rotate-left.png')}
                      style={{width: 25, height: 25}}
                    />
                    <Text style={styles.textFontJump}>15</Text>
                  </TouchableOpacity>
                  {this.state.playState == 'playing' && (
                    <TouchableOpacity
                      onPress={this.pause}
                      style={{marginHorizontal: 20}}>
                      <Image
                        source={require('../assets/icons/pause.png')}
                        style={{width: 25, height: 25}}
                      />
                    </TouchableOpacity>
                  )}
                  {this.state.playState == 'paused' && (
                    <TouchableOpacity
                      onPress={this.play}
                      style={{marginHorizontal: 20}}>
                      <Image
                        source={require('../assets/icons/playbrown.png')}
                        style={{width: 25, height: 25}}
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={this.jumpNext15Seconds}
                    style={{justifyContent: 'center'}}>
                    <Image
                      source={require('../assets/icons/rotate-right.png')}
                      style={{width: 25, height: 25}}
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
                    // onTouchMove={() => console.log('onTouchMove')}
                    onTouchEnd={this.onSliderEditEnd}
                    // onTouchEndCapture={() => console.log('onTouchEndCapture')}
                    // onTouchCancel={() => console.log('onTouchCancel')}
                    onValueChange={this.onSliderEditing}
                    value={this.state.playSeconds}
                    maximumValue={this.state.duration}
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
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF8F6',
    padding: '6%',
  },
  textFont: {
    fontFamily: 'UhBee Se_hyun',
  },
  textFontJump: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 1,
    fontFamily: 'UhBee Se_hyun',
    color: '#4C4036',
    fontSize: 10,
  },
  textFontTime: {
    fontFamily: 'UhBee Se_hyun',
    alignItems: 'center',
    // marginTop: 15,
    fontSize: 16,
    color: '#4C4036',
  },
  textFontBold: {
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#4C4036',
    fontSize: 18,
  },
  textBox: {
    backgroundColor: '#ECE5E0',
    borderRadius: 10,
    padding: '6%',
    marginTop: '5%',
  },
  imageBox: {
    marginTop: '5%',
  },
  audioBox: {
    backgroundColor: '#ECE5E0',
    borderRadius: 10,
    height: 100,
    marginTop: '5%',
    marginBottom: '5%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
