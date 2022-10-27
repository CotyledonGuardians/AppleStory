import * as React from 'react';
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
        author: '제영',
        content: 'fefefefef',
      },
      {
        author: '낙현',
        content: 'fefefefef',
      },
    ],
    photo: [
      {
        author: '제영',
        content:
          'https://item.kakaocdn.net/do/c620e34ce78db64b44ff1e422a35e2787154249a3890514a43687a85e6b6cc82',
      },
      {
        author: '낙현',
        content:
          'https://image.tving.com/upload/cms/caip/CAIP0400/P000388342.jpg/dims/resize/1280',
      },
      {
        author: '선아',
        content:
          'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201706/23/b71449f8-e830-45a0-bb4d-7b1a328e19f2.jpg',
      },
      {
        author: '예은',
        content:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw7NBmuS7MRpit86BM2UdjvossRlpKvjU2yw&usqp=CAU',
      },
      {
        author: '다연',
        content: 'https://i.ytimg.com/vi/1rc2OJCPZ-c/sddefault.jpg',
      },
      {
        author: '송희',
        content: 'https://i.ytimg.com/vi/vGAb_gmZ6RI/mqdefault.jpg',
      },
    ],
    audio: [
      {
        author: '짤리',
        content: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
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

const AppleDetail = ({navigation}) => {
  let time = '0일 0시간 0분';
  let createTime = '2022/10/17';
  let title = '자율 프로젝트를 기념하며';
  let name = '떡잎방범대';
  let people = 6;

  const seedDetail = () => {
    navigation.navigate('SeedDetail', {screen: 'SeedDetail'});
  };

  function Header() {
    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../assets/pictures/aegom7.png')}
            style={{marginLeft: 20, marginTop: 15, width: 140, height: 170}}
          />
        </View>
        <View style={styles.headerRight}>
          <View style={styles.detailBox}>
            <View style={styles.oneBox}>
              <Text style={[styles.textFont, styles.defaultText]}>{title}</Text>
            </View>
            <View style={styles.nameBox}>
              <Text style={[styles.textFont, styles.defaultText]}>{name}</Text>
              <View style={styles.countBox}>
                <Image
                  style={styles.countIcon}
                  source={require('../assets/icons/usercount.png')}
                />
                <Text>{people}</Text>
              </View>
            </View>
            <View style={styles.nameBox}>
              <Text style={[styles.textFont, styles.smallText]}>
                위치: 대전광역시 유성구 덕명동 29-10
              </Text>
            </View>
            <View style={styles.contentBox}>
              <Text style={[styles.textFont, styles.smallText]}>
                이 사과에 기록된 데이터
              </Text>
              <View style={styles.iconBox}>
                <Image
                  style={styles.contentIcon}
                  source={require('../assets/icons/text.png')}
                />
                <Image
                  style={styles.contentIcon}
                  source={require('../assets/icons/mic.png')}
                />
                <Image
                  style={styles.contentIcon}
                  source={require('../assets/icons/photo.png')}
                />
                <Image
                  style={styles.contentIcon}
                  source={require('../assets/icons/video.png')}
                />
                <Image
                  style={styles.contentIcon}
                  source={require('../assets/icons/gps.png')}
                />
              </View>
              <Text style={[styles.textFont, styles.smallText]}>
                숙성기간 : {createTime} ~ {createTime}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  const Card = ({nickname, index}: any) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          // Alert.alert('상세보기로 넘어가렴~');
          seedDetail();
        }}>
        <Image
          source={require('../assets/pictures/seed.png')}
          style={{width: 80, height: 80}}
          resizeMode="contain"
        />
        <Text style={{fontFamily: 'UhBee Se_hyun', color: '#4C4036'}}>
          {nickname}님의 씨앗
        </Text>
      </TouchableOpacity>
    );
  };

  function ContentSeed() {
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10}}>
        {data.creator.member.map((item, index) => {
          return (
            <View
              style={{
                width: '33.3%',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
              key={index}>
              <Card key="{index}" nickname={item.nickname} />
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
          {/* <Image
            style={{width: 50, height: 50}}
            source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
          /> */}

          {data.content.photo.map((item, index) => {
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
          {data.content.video.map((item, index) => {
            return (
              <Video
                key={index}
                source={{
                  uri: item.content,
                }}
                style={{width: 200, height: 150, margin: 5}}
                paused={true} // 재생/중지 여부
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <ContentSeed />
        <Photo />
        <VideoRecord />
      </ScrollView>
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
});

export default AppleDetail;
