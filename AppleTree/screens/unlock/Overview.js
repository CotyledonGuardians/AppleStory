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
import {getAppleDetail} from '../../api/AppleAPI';
import {getAddress} from '../../api/GeocodingAPI';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import Loading from '../LoadingDefault';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createThumbnail} from 'react-native-create-thumbnail';

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
  const [photoURLs, setPhotoURLs] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);
  const [videoURLs, setVideoURLs] = useState([]);

  useEffect(() => {
    getAppleDetail(route.params.id)
      .then(async response => {
        console.log(response.data.body);
        setAppleDetail(response.data.body);
        if (response.data.body.location != null) {
          getAddressLatLng(response.data.body.location);
        }
        await auth().currentUser.getIdTokenResult(true);
        return {
          photo: response.data.body.content.photo,
          video: response.data.body.content.video,
        };
      })
      .then(contents => {
        return {
          photo: contents.photo.map((photo, idx) =>
            storage().ref(photo.content).getDownloadURL(),
          ),
          video: contents.video.map((video, idx) =>
            storage().ref(video.content).getDownloadURL(),
          ),
        };
      })
      .then(promises => {
        promises.photo.forEach(promise => {
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
        promises.video.forEach(promise => {
          promise
            .then(url => {
              createThumbnail({
                url: url,
              })
                .then(response => {
                  setThumbnail(oldThumbnail => {
                    const newThumbnail = [...oldThumbnail];
                    newThumbnail.push({url: response.path, video: url});
                    return newThumbnail;
                  });
                })
                .catch(err => console.log({err}));

              setVideoURLs(oldVideoURLs => {
                const newVideoURLs = [...oldVideoURLs];

                newVideoURLs.push(url);

                return newVideoURLs;
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
        if (response.data.plus_code.compound_code) {
          setAddress(response.data.plus_code.compound_code);
        } else {
          setAddress(' ');
        }
      }
    });
  };

  function Header() {
    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={
              randomImages[route.params.id % 7]
              // randomImages[Math.floor(Math.random() * randomImages.length)]
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
                <Text style={{fontSize: wp('3%')}}>
                  {appleDetail.creator.member.length}
                </Text>
              </View>
            </View>
            {address && address != ' ' && (
              <View style={styles.nameBox}>
                <Text style={[styles.textFont, styles.smallText]}>
                  {address.length > 21
                    ? address.substr(0, 20).trim() + '...'
                    : address}
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
          style={styles.seedImg}
          resizeMode="contain"
        />
        <Text style={styles.seedDetail}>
          {nickname.length > 6
            ? nickname.substr(0, 5).trim() + '...'
            : nickname}
          님의 씨앗
        </Text>
      </TouchableOpacity>
    );
  };

  function ContentSeed() {
    return (
      <View style={styles.seedRow}>
        {appleDetail.creator.member.map((item, index) => {
          return (
            <View style={styles.seedOne} key={index}>
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

  function Thumbnail() {
    console.log('thundfefwe', thumbnail);
    return (
      <View style={{padding: 20}}>
        <Text style={styles.textFontBold}>기록된 영상</Text>
        <View style={{height: 230, width: '100%'}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {thumbnail.map((item, index) => {
              console.log('item!!!: ', item);
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate('VideoStreaming', {
                      url: item.video,
                    });
                  }}>
                  <Image
                    key={index}
                    style={styles.photoImg}
                    source={{
                      uri: item.url,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {appleDetail &&
      photoURLs &&
      (appleDetail.location === null || (appleDetail.location && address)) ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header />
          <ContentSeed />
          {appleDetail.content.photo != null &&
            appleDetail.content.photo.length !== 0 && <Photo />}
          {thumbnail.length != 0 && <Thumbnail />}
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
    height: hp('20%'),
    // margin: 30,
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
    height: hp('22%'),
    margin: wp('5%'),
    // top: 30,
    flexDirection: 'row',
  },
  headerLeft: {
    flex: 1,
    marginRight: wp('10%'),
  },
  headerRight: {
    flex: 1.5,
  },
  detailBox: {
    top: hp('2%'),
    height: hp('50%'),
    // margin: wp('5%'),
    // alignItems: 'center',
  },
  oneBox: {
    flex: 1,
    borderBottomColor: '#AAA19B',
    borderStyle: 'solid',
    borderBottomWidth: wp('0.8%'),
    alignSelf: 'flex-start',
    marginBottom: wp('1%'),
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),

    // justifyContent: 'center',
  },
  textFont: {
    fontFamily: 'UhBee Se_hyun',
  },
  textFontBold: {
    fontFamily: 'UhBee Se_hyun Bold',
    color: '#4C4036',
    fontSize: wp('3.5%'),
  },
  defaultText: {
    fontSize: wp('4%'),
    color: '#4C4036',
  },
  titleText: {
    textDecorationLine: 'underline',
  },
  timeText: {
    fontSize: 30,
    // justifyContent: 'center',
  },
  smallText: {
    fontSize: wp('3%'),
    color: '#AAA19B',
  },
  contentBox: {
    flex: 10,
  },
  iconBox: {
    marginTop: wp('1%'),
    marginBottom: wp('1%'),
    flexDirection: 'row',
  },
  nameBox: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: wp('1.5%'),
  },
  countBox: {
    height: hp('3%'),
    backgroundColor: 'rgba(0, 0, 0, 0.17)',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 15,
    marginTop: wp('1%'),
    paddingRight: wp('3%'),
    paddingLeft: wp('3%'),
    marginLeft: wp('2%'),
  },
  countIcon: {
    resizeMode: 'contain',
    width: wp('3%'),
    height: hp('3%'),
    marginRight: wp('1%'),
  },
  contentIcon: {
    resizeMode: 'contain',
    width: wp('5%'),
    height: hp('4%'),
    marginRight: wp('1%'),
    marginLeft: wp('1%'),
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
    fontSize: wp('3%'),
    // margin: wp('5%'),
  },
  headerImg: {
    marginLeft: wp('5%'),
    marginTop: hp('3%'),
    resizeMode: 'contain',
    width: wp('28%'),
    height: hp('22%'),
  },
  photoImg: {
    resizeMode: 'contain',
    margin: wp('2%'),
    height: hp('20%'),
    // width: wp('10%'),
    aspectRatio: 1.5,
    flex: 1,
  },
  seedImg: {
    resizeMode: 'contain',
    width: wp('16%'),
    height: hp('12%'),
  },
  seedOne: {
    // marginLeft: wp('5%'),
    width: wp('30%'),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  seedRow: {
    marginLeft: wp('5%'),
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: hp('2%'),
  },
});

export default Overview;
