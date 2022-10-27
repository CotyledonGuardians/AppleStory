import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import Sound from 'react-native-sound';
import Video from 'react-native-video';

// https://github.com/zmxv/react-native-sound

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
        content:
          'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3',
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

const Button = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);

const Header = ({children, style}) => (
  <Text style={[styles.header, style]}>{children}</Text>
);

const Feature = ({title, onPress, buttonLabel = 'PLAY', status}) => (
  <View style={styles.feature}>
    <Header style={{flex: 1}}>{title}</Header>
    {/* {status ? (
      <Text style={{padding: 5}}>{resultIcons[status] || ''}</Text>
    ) : null} */}
    <Button title={buttonLabel} onPress={onPress} />
  </View>
);

const resultIcons = {
  '': '',
  pending: '?',
  playing: '\u25B6',
  win: '\u2713',
  fail: '\u274C',
};

const audioTests = [
  {
    title: 'mp3 via require()',
    isRequire: true,
    url: require('./vancouver.mp3'),
  },
  {
    title: 'mp3 remote download',
    url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3',
  },
];

function setTestState(testInfo, component, status) {
  component.setState({
    tests: {...component.state.tests, [testInfo.title]: status},
  });
}

/**
 * Generic play function for majority of tests
 */
function playSound(testInfo, component) {
  setTestState(testInfo, component, 'pending');
  console.log('testInfo', testInfo);
  const callback = (error, sound) => {
    if (error) {
      Alert.alert('error', error.message);
      setTestState(testInfo, component, 'fail');
      return;
    }
    setTestState(testInfo, component, 'playing');
    // Run optional pre-play callback
    testInfo.onPrepared && testInfo.onPrepared(sound, component);
    sound.play(() => {
      // Success counts as getting to the end
      setTestState(testInfo, component, 'win');
      // Release when it's done so we're not using up resources
      sound.release();
    });
  };

  // If the audio is a 'require' then the second parameter must be the callback.
  if (testInfo.isRequire) {
    const sound = new Sound(testInfo, error => callback(error, sound));
  } else {
    const sound = new Sound(testInfo, testInfo.basePath, error =>
      callback(error, sound),
    );
  }
}

class SeedDetail extends Component {
  constructor(props) {
    super(props);

    Sound.setCategory('Playback', true); // true = mixWithOthers

    // Special case for stopping
    this.stopSoundLooped = () => {
      if (!this.state.loopingSound) {
        return;
      }

      this.state.loopingSound.stop().release();
      this.setState({
        loopingSound: null,
        tests: {...this.state.tests, ['mp3 in bundle (looped)']: 'win'},
        // count: {...this.state.count, +1},
      });
    };

    this.clickSound = () => {
      this.setState({
        count: this.state.count + 1,
      });
    };

    this.state = {
      loopingSound: undefined,
      tests: {},
      count: 0,
    };
  }

  //   const [count, setCount] = useState(0);

  render() {
    let nickname = '짤리';
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

    // const [playSound, setPlaySound] = useState(false);
    // console.log(playSound);
    // const changeSound = () => {
    //   console.log(playSound);
    //   setPlaySound((playSound: boolean) => !playSound);
    // };

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.textFontBold}>{nickname}님의 기록</Text>
          <View style={styles.textBox}>
            <Text style={styles.textFont}>{text}</Text>
          </View>
          <View style={styles.imageBox}>
            <Image
              style={{width: '100%', height: 200}}
              source={{
                uri: image,
              }}
            />
          </View>
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
          <View style={styles.audioBox}>
            <TouchableOpacity
              onPress={() => {
                this.clickSound;
                return playSound(audio, this);
              }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  margin: 15,
                }}
                source={require('../assets/icons/mic.png')}
              />
            </TouchableOpacity>
            <Image
              style={{
                width: 30,
                height: 30,
                margin: 15,
                alignItems: 'flex-end',
              }}
              source={require('../assets/icons/downloadbrown.png')}
            />
          </View>
          {/* <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}>
            {audioTests.map(testInfo => {
              return (
                <Feature
                  status={this.state.tests[testInfo.title]}
                  key={testInfo.title}
                  title={testInfo.title}
                  onPress={() => {
                    return playSound(testInfo.url, this);
                  }}
                />
              );
            })}
            <Feature
              title="mp3 in bundle (looped)"
              buttonLabel={'STOP'}
              onPress={this.stopSoundLooped}
            />
          </ScrollView> */}
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
    height: 60,
    marginTop: '5%',
    marginBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollContainer: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
    padding: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(240,240,240,1)',
  },
  button: {
    fontSize: 20,
    backgroundColor: 'rgba(220,220,220,1)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    padding: 7,
  },
  header: {
    textAlign: 'left',
  },
  feature: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgb(180,180,180)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,230,230)',
  },
});

export default SeedDetail;
