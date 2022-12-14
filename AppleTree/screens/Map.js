import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {getMapAppleList} from '../api/AppleAPI';
import {UseStomp, DisconnectIfConnected} from '../stomp';

// 남은 시간에 따라 사과 사진 변경
const imgUrl = [
  require('../assets/pictures/apple1.png'),
  require('../assets/pictures/apple2.png'),
  require('../assets/pictures/apple3.png'),
  require('../assets/pictures/apple4.png'),
];

const Map = ({navigation}) => {
  const [useLocation, setUseLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [appleList, setAppleList] = useState([]);
  const [appleImg, setAppleImg] = useState();
  useEffect(() => {
    getMapAppleList()
      .then(response => {
        setAppleList(response.data.body);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  const appleDetail = id => {
    navigation.navigate('Overview', {screen: 'Overview', id: id});
  };

  const imageUrl = unlockAt => {
    const today = new Date().getTime();
    const unlockDay = new Date(unlockAt.split('T')[0]).getTime();
    if (unlockDay - today - 32400 <= 0) {
      return imgUrl[3];
    } else {
      const diff = Math.ceil(
        (unlockDay - today - 32400) / (1000 * 60 * 60 * 24),
      );
      if (diff === 0) {
        return imgUrl[3];
      } else if (diff <= 3) {
        return imgUrl[2];
      } else if (diff <= 7) {
        return imgUrl[1];
      } else {
        return imgUrl[0];
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <MapView
          style={{width: '100%', height: '100%'}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 36.647,
            longitude: 127.897,
            latitudeDelta: 5,
            longitudeDelta: 1,
          }}>
          {appleList.map((item, index) => {
            url = imageUrl(item.unlockAt);
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: item.location.lat,
                  longitude: item.location.lng,
                }}
                onCalloutPress={() => {
                  let lockDate = new Date(item.unlockAt);
                  let today = new Date();
                  if (today >= lockDate) {
                    // 현재 시간보다 시간이 지나있는 경우
                    if (item.isCatch) {
                      navigation.navigate('Overview', {
                        screen: 'Overview',
                        id: item.id,
                      });
                    } else {
                      const connect = () => {
                        UseStomp(
                          () => {
                            console.log('make room succeed', item.id);
                            navigation.navigate('HitApple', {
                              id: item.id,
                            });
                          },
                          () => {
                            console.log('make room failed', item.id);
                          },
                        );
                      };
                      DisconnectIfConnected(connect, {}, connect);
                    }
                  } else {
                    navigation.navigate('LockAppleDetail', {
                      id: item.id,
                    });
                  }
                }}
                title={item.title}
                description={`숙성기간 ${item.createAt.split('T')[0]} ~  ${
                  item.unlockAt.split('T')[0]
                }`}>
                <Image
                  source={url}
                  style={{width: 26, height: 28}}
                  resizeMode="contain"
                />
              </Marker>
            );
          })}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
