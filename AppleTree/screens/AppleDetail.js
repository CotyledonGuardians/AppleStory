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
} from 'react-native';
import {DataTable} from 'react-native-paper';
import Video from 'react-native-video';
import {get} from 'react-native/Libraries/Utilities/PixelRatio';
import {getAppleDetail} from '../api/AppleAPI';

var randomImages = [
  require('../assets/pictures/aegom1.png'),
  require('../assets/pictures/aegom2.png'),
  require('../assets/pictures/aegom4.png'),
  require('../assets/pictures/aegom5.png'),
  require('../assets/pictures/aegom6.png'),
  require('../assets/pictures/aegom7.png'),
  require('../assets/pictures/aegom8.png'),
];

const AppleDetail = ({navigation, route}) => {
  const [appleDetail, setAppleDetail] = useState();
  useEffect(() => {
    getAppleDetail(route.params.id)
      .then(response => {
        setAppleDetail(response.data.body);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  const seedDetail = (nickname, uid) => {
    navigation.navigate('SeedDetail', {
      screen: 'SeedDetail',
      nickname: nickname,
      uid: uid,
      data: appleDetail,
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
            style={{marginLeft: 20, marginTop: 15, width: 140, height: 170}}
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
                  source={require('../assets/icons/usercount.png')}
                />
                <Text>{appleDetail.creator.member.length}</Text>
              </View>
            </View>
            <View style={styles.nameBox}>
              <Text style={[styles.textFont, styles.smallText]}>
                {/* 위치 받아서 변경필요 */}
                위치: 대전광역시 유성구 덕명동 29-10
              </Text>
            </View>
            <View style={styles.contentBox}>
              <Text style={[styles.textFont, styles.smallText]}>
                이 사과에 기록된 데이터
              </Text>
              <View style={styles.iconBox}>
                {appleDetail.content.text.length != 0 && (
                  <Image
                    style={styles.contentIcon}
                    source={require('../assets/icons/text.png')}
                  />
                )}
                {appleDetail.content.photo.length != 0 && (
                  <Image
                    style={styles.contentIcon}
                    source={require('../assets/icons/photo.png')}
                  />
                )}
                {appleDetail.content.audio.length != 0 && (
                  <Image
                    style={styles.contentIcon}
                    source={require('../assets/icons/mic.png')}
                  />
                )}
                {appleDetail.content.video.length != 0 && (
                  <Image
                    style={styles.contentIcon}
                    source={require('../assets/icons/video.png')}
                  />
                )}
                {appleDetail.location != null && (
                  <Image
                    style={styles.contentIcon}
                    source={require('../assets/icons/gps.png')}
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

  const Card = ({nickname, index, uid}: any) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          // Alert.alert('상세보기로 넘어가렴~');
          seedDetail(nickname, uid);
        }}>
        <Image
          source={require('../assets/pictures/seed.png')}
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
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {appleDetail.content.photo.map((item, index) => {
            return (
              <Image
                key={index}
                style={{width: 200, height: 150, margin: 5}}
                source={{
                  uri: item.content,
                }}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }

  function VideoRecord() {
    return (
      <View style={{padding: 20}}>
        <Text style={styles.textFontBold}>기록된 영상</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {appleDetail.content.video.map((item, index) => {
            return (
              <Video
                key={index}
                source={{
                  uri: item.content,
                }}
                style={{width: 200, height: 150, margin: 5}}
                paused={false} // 재생/중지 여부
                resizeMode={'cover'} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
                onLoad={e => console.log(e)} // 미디어가 로드되고 재생할 준비가 되면 호출되는 콜백 함수입니다.
                repeat={true} // video가 끝나면 다시 재생할 지 여부
                onAnimatedValueUpdate={() => {}}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {appleDetail && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header />
          <ContentSeed />
          {appleDetail.content.photo.length != 0 && <Photo />}
          {appleDetail.content.video.length != 0 && <VideoRecord />}
        </ScrollView>
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
});

export default AppleDetail;
