import React from 'react';
import {SafeAreaView, View, StyleSheet, ScrollView} from 'react-native';
import {Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {UseStomp, DisconnectIfConnected} from '../stomp';

const Apple = ({navigation, data}) => {
  const appleList = data.list;
  const name = data.name;
  // console.log('현재 탭:', name);

  var randomgroupImages = [
    require('../assets/pictures/listgroup1.png'),
    require('../assets/pictures/listgroup2.png'),
  ];
  var randomhitgroupImages = [
    require('../assets/pictures/readyhitgroup1.png'),
    require('../assets/pictures/readyhitgroup2.png'),
  ];

  const Card = ({type, title, unlockAt, isOpen, index, id, isCatch}: any) => {
    let lockDate = new Date(unlockAt);
    let today = new Date();
    var url = '';

    if (!isOpen && today >= lockDate) {
      url =
        randomhitgroupImages[
          Math.floor(Math.random() * randomhitgroupImages.length)
        ];
    } else {
      if (type) {
        url = require('../assets/pictures/listpersonal1.png');
      } else {
        url =
          randomgroupImages[
            Math.floor(Math.random() * randomgroupImages.length)
          ];
      }
    }

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          if (today >= lockDate) {
            // 현재 시간보다 시간이 지나있는 경우
            if (isCatch) {
              navigation.navigate('Overview', {
                screen: 'Overview',
                id: id,
              });
            } else {
              const connect = () => {
                UseStomp(
                  () => {
                    console.log('make room succeed', id);
                    navigation.navigate('HitApple', {
                      id: id,
                    });
                  },
                  () => {
                    console.log('make room failed', id);
                  },
                );
              };
              DisconnectIfConnected(connect, {}, connect);
            }
          } else {
            navigation.navigate('LockAppleDetail', {
              id: id,
            });
          }
        }}>
        <Image source={url} style={styles.appleImg} resizeMode="contain" />
        <Text style={styles.titleFont}>
          {title.length > 11 ? title.substr(0, 10).trim() + '...' : title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {appleList.map((item, index) => {
            return (
              <View style={styles.appleView} key={index}>
                <Card
                  key="{index}"
                  title={item.title}
                  type={item.type}
                  unlockAt={item.unlockAt}
                  isOpen={item.isOpen}
                  id={item.id}
                  isCatch={item.isCatch}
                />
              </View>
            );
          })}
          {appleList.length === 1 && <View style={styles.appleView}></View>}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF8F6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  card: {
    height: hp('25%'),
    // width: wp('20%'),
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appleImg: {
    width: wp('33%'),
    height: hp('20%'),
  },
  appleView: {
    width: wp('47%'),
    flexDirection: 'row',
  },
  titleFont: {
    fontSize: wp('3%'),
    fontFamily: 'UhBee Se_hyun',
    color: '#4C4036',
  },
});

export default Apple;
