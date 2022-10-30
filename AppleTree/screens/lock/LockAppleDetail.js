import React, {useState, useEffect} from 'react';
import {SafeAreaView, Image, Text, View, StyleSheet} from 'react-native';
import {log} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import useInterval from '../../config/useInterval';

// 0시간 0분 0초가 되었을 때 바로 사과때리기로 이동할건가?

const LockAppleDetail = () => {
  const [time, setTime] = useState('0일 0시간 0분');

  const setTimeOut = () => {
    const openTime = new Date(2022, 9, 28); // month는 1 적은 값
    const todayTime = new Date();
    const diff = openTime - todayTime;
    const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const diffMin = Math.ceil((diff / (1000 * 60)) % 60);
    setTime(diffDay + '일 ' + diffHour + '시간 ' + diffMin + '분');
  };

  // useEffect(() => {
  //   setTimeOut();
  // });

  useInterval(() => {
    // 1초 마다 설정 해야할까? 시간 설정 고민!
    setTimeOut();
  }, 1000);

  let createTime = '2022/10/17';
  let title = '자율 프로젝트를 기념하며';
  let name = '떡잎방범대';
  let people = 6;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.aegomBox}>
        <Image
          style={styles.aegom}
          source={require('../../assets/pictures/aegomkeydetail.png')}
        />
      </View>
      <View style={styles.detailBox}>
        <View style={styles.OneBox}>
          <Text style={[styles.textFont, styles.defaultText]}>
            애곰이는 아직 사과를 줄 생각이 없어요
          </Text>
        </View>
        <View style={styles.timeBox}>
          <Text style={[styles.textFont, styles.timeText]}>{time}</Text>
        </View>
        <View style={styles.oneBox}>
          <Text style={[styles.textFont, styles.defaultText]}>{title}</Text>
        </View>
        <View style={styles.nameBox}>
          <Text style={[styles.textFont, styles.defaultText]}>{name}</Text>
          <View style={styles.countBox}>
            <Image
              style={styles.countIcon}
              source={require('../../assets/icons/usercount.png')}
            />
            <Text>{people}</Text>
          </View>
        </View>
        <View style={styles.contentBox}>
          <Text style={[styles.textFont, styles.smallText]}>
            이 사과에 기록된 데이터
          </Text>
          <View style={styles.iconBox}>
            <Image
              style={styles.contentIcon}
              source={require('../../assets/icons/text.png')}
            />
            <Image
              style={styles.contentIcon}
              source={require('../../assets/icons/mic.png')}
            />
            <Image
              style={styles.contentIcon}
              source={require('../../assets/icons/photo.png')}
            />
            <Image
              style={styles.contentIcon}
              source={require('../../assets/icons/video.png')}
            />
            <Image
              style={styles.contentIcon}
              source={require('../../assets/icons/gps.png')}
            />
          </View>
          <Text style={[styles.textFont, styles.smallText]}>
            생성일 : {createTime}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 16,
    backgroundColor: '#FBF8F6',
  },
  aegomBox: {
    flex: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  aegom: {
    width: '60%',
    height: '90%',
  },
  detailBox: {
    flex: 8,
    alignItems: 'center',
  },
  oneBox: {
    flex: 1,
    justifyContent: 'center',
  },
  textFont: {
    fontFamily: 'UhBee Se_hyun',
  },
  defaultText: {
    fontSize: 17,
    color: '#4C4036',
  },
  timeBox: {
    flex: 1.5,
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 30,
    justifyContent: 'center',
  },
  smallText: {
    fontSize: 10,
    color: '#AAA19B',
  },
  contentBox: {
    flex: 2.5,
    alignItems: 'center',
  },
  iconBox: {
    marginTop: 5,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nameBox: {
    flex: 1,
    flexDirection: 'row',
  },
  countBox: {
    height: '40%',
    backgroundColor: 'rgba(0, 0, 0, 0.17)',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 30,
    paddingRight: 8,
    marginTop: 7,
    paddingLeft: 8,
    marginLeft: 8,
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
});

export default LockAppleDetail;
