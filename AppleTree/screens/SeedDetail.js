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
  Platform,
} from 'react-native';
import Sound from 'react-native-sound';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';

const img_speaker = require('../assets/icons/mic.png');
const img_pause = require('../assets/icons/mic.png');
const img_play = require('../assets/icons/mic.png');
const img_playjumpleft = require('../assets/icons/mic.png');
const img_playjumpright = require('../assets/icons/mic.png');

export default class PlayerScreen extends React.Component {
  // static navigationOptions = props => ({
  //   // title: props.navigation.state.params.title,
  //   nickname: props.navigation.state.params,
  // });

  constructor(props) {
    super();
    this.state = {
      playState: 'paused', //playing, paused
      playSeconds: 0,
      duration: 0,
      audio:
        'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3',
      nickname: props.route.params.nickname,
      text: '',
      image: '',
      video: '',
      audio: '',
    };
    this.sliderEditing = false;
    let uid = props.route.params.uid;
    let data = props.route.params.data;
    for (let i = 0; i < data.content.text.length; i++) {
      if (data.content.text[i].author === uid) {
        this.text = data.content.text[i].content;
        break;
      }
    }
    for (let i = 0; i < data.content.photo.length; i++) {
      if (data.content.photo[i].author === uid) {
        this.image = data.content.photo[i].content;
        break;
      }
    }
    for (let i = 0; i < data.content.video.length; i++) {
      if (data.content.video[i].author === uid) {
        this.video = data.content.video[i].content;
        break;
      }
    }
    for (let i = 0; i < data.content.audio.length; i++) {
      if (data.content.audio[i].author === uid) {
        this.audio = data.content.audio[i].content;
        break;
      }
    }
    console.log(this.video, 'this.video');
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

  play = () => {
    if (this.sound) {
      this.sound.play(this.playComplete);
      this.setState({playState: 'playing'});
    } else {
      const filepath = this.audio;
      this.sound = new Sound(filepath, null, error => {
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
    const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    const durationString = this.getAudioTimeString(this.state.duration);
    // this.setState({audio: audio});
    return (
      <SafeAreaView style={styles.container}>
        <Text style={[styles.textFontBold, styles.header]}>
          {this.state.nickname}님의 기록
        </Text>
        {!this.text && !this.image && !this.video && !this.audio && (
          <View style={styles.emptyData}>
            <Image
              source={require('../assets/pictures/aegom3.png')}
              style={{width: 150, height: 200}}
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
          {this.image && (
            <View style={styles.imageBox}>
              <Image
                style={{width: '100%', height: 200}}
                source={{
                  uri: this.image,
                }}
              />
            </View>
          )}
          {this.video && (
            <Video
              source={{
                uri: this.video,
              }}
              style={{width: '100%', height: 200, marginTop: '5%'}}
              paused={false} // 재생/중지 여부
              resizeMode={'cover'} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
              onLoad={e => console.log(e)} // 미디어가 로드되고 재생할 준비가 되면 호출되는 콜백 함수입니다.
              repeat={true} // video가 끝나면 다시 재생할 지 여부
              onAnimatedValueUpdate={() => {}}
            />
          )}
          {this.audio && (
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
                    onTouchEnd={this.onSliderEditEnd}
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
  header: {
    marginBottom: '5%',
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
  emptyData: {
    fontFamily: 'UhBee Se_hyun',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: '20%',
  },
  textFontTime: {
    fontFamily: 'UhBee Se_hyun',
    alignItems: 'center',
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
