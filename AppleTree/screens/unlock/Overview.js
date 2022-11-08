import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import {getAppleDetail} from '../../api/AppleAPI';
import {getAddress} from '../../api/GeocodingAPI';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import Loading from '../LoadingDefault';

var randomImages = [
  require('../../assets/pictures/aegom1.png'),
  require('../../assets/pictures/aegom2.png'),
  require('../../assets/pictures/aegom4.png'),
  require('../../assets/pictures/aegom5.png'),
  require('../../assets/pictures/aegom6.png'),
  require('../../assets/pictures/aegom7.png'),
  require('../../assets/pictures/aegom8.png'),
];

const Overview = ({navigation, route}) => {
  const [appleDetail, setAppleDetail] = useState();
  const [address, setAddress] = useState();
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');
  const [photoURLs, setPhotoURLs] = useState([]);

  const onSeek = seek => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = newPlayerState => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(newPlayerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = data => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = data => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = data => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  // const onError = () => alert('Oh! ', error);

  // const exitFullScreen = () => {
  //   alert('Exit full screen');
  // };

  // const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType === 'content') {
      setScreenType('cover');
    } else {
      setScreenType('content');
    }
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = newCurrentTime => setCurrentTime(newCurrentTime);

  useEffect(() => {
    getAppleDetail(route.params.id)
      .then(async response => {
        setAppleDetail(response.data.body);
        if (response.data.body.location != null) {
          getAddressLatLng(response.data.body.location);
        }
        await auth().currentUser.getIdTokenResult(true);
        return response.data.body.content.photo;
      })
      .then(photo =>
        photo.map((photo, idx) =>
          storage().ref(photo.content).getDownloadURL(),
        ),
      )
      .then(promises => {
        promises.forEach(promise => {
          promise
            .then(url => {
              setPhotoURLs(oldPhotoURLs => {
                const newPhotoURLs = [...oldPhotoURLs];

                newPhotoURLs.push(url);

                return newPhotoURLs;
              });
            })
            .catch(err => {
              console.log('err on url promises foreach:::', err);
            });
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [route.params.id]);

  const seedDetail = (nickname, uid) => {
    navigation.navigate('UnlockAppleDetail', {
      screen: 'UnlockAppleDetail',
      nickname: nickname,
      uid: uid,
      data: appleDetail,
    });
  };

  const getAddressLatLng = location => {
    getAddress(location.lat, location.lng).then(response => {
      if (response.data.status === 'OK') {
        setAddress(response.data.results[0].formatted_address);
      } else {
        setAddress(response.data.plus_code.compound_code);
      }
    });
  };

  function Header() {
    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={
              randomImages[Math.floor(Math.random() * randomImages.length)]
            }
            style={styles.headerImg}
          />
        </View>
        <View style={styles.headerRight}>
          <View style={styles.detailBox}>
            <View style={styles.oneBox}>
              <Text style={[styles.textFont, styles.defaultText]}>
                {appleDetail.title}
              </Text>
            </View>
            <View style={styles.nameBox}>
              <Text style={[styles.textFont, styles.defaultText]}>
                {appleDetail.creator.teamName}
              </Text>
              <View style={styles.countBox}>
                <Image
                  style={styles.countIcon}
                  source={require('../../assets/icons/usercount.png')}
                />
                <Text>{appleDetail.creator.member.length}</Text>
              </View>
            </View>
            {address && (
              <View style={styles.nameBox}>
                <Text style={[styles.textFont, styles.smallText]}>
                  {address}
                </Text>
              </View>
            )}
            <View style={styles.contentBox}>
              <Text style={[styles.textFont, styles.smallText]}>
                이 사과에 기록된 데이터
              </Text>
              <View style={styles.iconBox}>
                {appleDetail.content.text != null &&
                  appleDetail.content.text.length !== 0 && (
                    <Image
                      style={styles.contentIcon}
                      source={require('../../assets/icons/text.png')}
                    />
                  )}
                {appleDetail.content.photo != null &&
                  appleDetail.content.photo.length !== 0 && (
                    <Image
                      style={styles.contentIcon}
                      source={require('../../assets/icons/photo.png')}
                    />
                  )}
                {appleDetail.content.audio != null &&
                  appleDetail.content.audio.length !== 0 && (
                    <Image
                      style={styles.contentIcon}
                      source={require('../../assets/icons/mic.png')}
                    />
                  )}
                {appleDetail.content.video != null &&
                  appleDetail.content.video.length !== 0 && (
                    <Image
                      style={styles.contentIcon}
                      source={require('../../assets/icons/video.png')}
                    />
                  )}
                {appleDetail.location != null && (
                  <Image
                    style={styles.contentIcon}
                    source={require('../../assets/icons/gps.png')}
                  />
                )}
              </View>
              <Text style={[styles.textFont, styles.smallText]}>
                숙성기간 : {appleDetail.createAt.split('T')[0]} ~{' '}
                {appleDetail.unlockAt.split('T')[0]}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  const Card = ({nickname, index, uid}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          seedDetail(nickname, uid);
        }}>
        <Image
          source={require('../../assets/pictures/seed.png')}
          style={{width: 80, height: 80}}
          resizeMode="contain"
        />
        <Text style={styles.seedDetail}>{nickname}님의 씨앗</Text>
      </TouchableOpacity>
    );
  };

  function ContentSeed() {
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10}}>
        {appleDetail.creator.member.map((item, index) => {
          return (
            <View
              style={{
                width: '33.3%',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
              key={index}>
              <Card key="{index}" nickname={item.nickname} uid={item.uid} />
            </View>
          );
        })}
      </View>
    );
  }

  function Photo() {
    return (
      <View style={{padding: 20}}>
        <Text style={styles.textFontBold}>기록된 사진</Text>
        <View style={{height: 230, width: '100%'}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {photoURLs.map((item, index) => {
              console.log(item);
              return (
                <Image
                  key={index}
                  style={styles.photoImg}
                  source={{
                    uri: item,
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }

  // 현재 사용하지 않는 함수
  function VideoRecord() {
    return (
      <View style={{padding: 20}}>
        <Text style={styles.textFontBold}>기록된 영상</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {appleDetail.content.video.map((item, index) => {
            return (
              <View style={{width: 200, height: 150, margin: 5}}>
                <Video
                  onEnd={onEnd}
                  onLoad={onLoad}
                  onLoadStart={onLoadStart}
                  onProgress={onProgress}
                  paused={paused}
                  ref={videoPlayer}
                  resizeMode={screenType}
                  onFullScreen={isFullScreen}
                  source={{
                    uri: 'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4',
                  }}
                  style={styles.mediaPlayer}
                  volume={10}
                />
                <MediaControls
                  duration={duration}
                  isLoading={isLoading}
                  mainColor="#333"
                  onFullScreen={onFullScreen}
                  onPaused={onPaused}
                  onReplay={onReplay}
                  onSeek={onSeek}
                  onSeeking={onSeeking}
                  playerState={playerState}
                  progress={currentTime}
                  toolbar={renderToolbar()}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {appleDetail && address ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header />
          <ContentSeed />
          {appleDetail.content.photo != null &&
            appleDetail.content.photo.length !== 0 && <Photo />}
          {/* {appleDetail.content.video != null &&
            appleDetail.content.video.length != 0 && <VideoRecord />} */}
        </ScrollView>
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  card: {
    height: 110,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FBF8F6',
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
    justifyContent: 'center',
  },
  header: {
    // width: '100%',
    height: 200,
    // margin: 10,
    // top: 30,
    flexDirection: 'row',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flex: 1.3,
  },
  detailBox: {
    top: 20,
    height: 400,
    // alignItems: 'center',
  },
  oneBox: {
    flex: 1,
    // justifyContent: 'center',
  },
  textFont: {
    fontFamily: 'UhBee Se_hyun',
  },
  textFontBold: {
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#4C4036',
    fontSize: 17,
  },
  defaultText: {
    fontSize: 17,
    color: '#4C4036',
  },
  timeText: {
    fontSize: 30,
    // justifyContent: 'center',
  },
  smallText: {
    fontSize: 10,
    color: '#AAA19B',
  },
  contentBox: {
    flex: 10,
  },
  iconBox: {
    marginTop: 5,
    marginBottom: 10,
    flexDirection: 'row',
  },
  nameBox: {
    flex: 1,
    flexDirection: 'row',
  },
  countBox: {
    height: '60%',
    backgroundColor: 'rgba(0, 0, 0, 0.17)',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 6,
    paddingRight: 10,
    paddingLeft: 10,
    marginLeft: 7,
  },
  countIcon: {
    width: 12,
    height: 12,
  },
  contentIcon: {
    width: 20,
    height: 20,
    marginRight: 3,
    marginLeft: 3,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  seedDetail: {
    fontFamily: 'UhBee Se_hyun',
    color: '#4C4036',
    fontSize: 12,
  },
  headerImg: {
    marginLeft: 20,
    marginTop: 10,
    width: '80%',
    height: '90%',
  },
  photoImg: {
    margin: 3,
    height: '100%',
    aspectRatio: 1.6,
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
});

export default Overview;
