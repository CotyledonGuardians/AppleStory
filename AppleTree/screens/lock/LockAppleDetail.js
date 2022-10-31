import React, {useEffect, useState} from 'react';
import {SafeAreaView, Image, Text, View, StyleSheet} from 'react-native';
import {getLockAppleDetail} from '../../api/AppleAPI';
import useInterval from '../../config/useInterval';
import {Button} from '../../components/Button';

const LockAppleDetail = ({route, navigation}) => {
  const {id} = route.params;
  const [apple, setApple] = useState();
  const [time, setTime] = useState('0일 0시간 0분');
  const [openFlag, setOpenFlag] = useState(false);

  useEffect(() => {
    const initTimeSet = unlockTime => {
      const unlockDay = unlockTime.split('T')[0].split('-');
      const openTime = new Date(
        Number(unlockDay[0]),
        Number(unlockDay[1]) - 1,
        Number(unlockDay[2]),
      ); // month는 1 적은 값
      const todayTime = new Date();
      const diff = openTime - todayTime;
      const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
      const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const diffMin = Math.ceil((diff / (1000 * 60)) % 60);
      setTime(diffDay + '일 ' + diffHour + '시간 ' + diffMin + '분');
    };

    getLockAppleDetail(id)
      .then(response => {
        console.log('lock apple detail', response.data);
        setApple(response.data.body);
        initTimeSet(response.data.body.unlockAt);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const timeCheck = () => {
    const unlockDay = apple.unlockAt.split('T')[0].split('-');
    const openTime = new Date(
      Number(unlockDay[0]),
      Number(unlockDay[1]) - 1,
      Number(unlockDay[2]),
    ); // month는 1 적은 값
    const todayTime = new Date();
    const diff = openTime - todayTime;
    if (!openFlag) {
      diff > 0 ? setTimeOut(diff) : setOpenFlag(true);
    }
  };

  const setTimeOut = diff => {
    const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const diffMin = Math.ceil((diff / (1000 * 60)) % 60);
    setTime(diffDay + '일 ' + diffHour + '시간 ' + diffMin + '분');
  };

  useInterval(() => {
    timeCheck();
  }, 1000);

  return (
    <SafeAreaView style={styles.screen}>
      {apple && time ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.aegomBox}>
            <Image
              style={styles.aegom}
              source={require('../../assets/pictures/aegomkeydetail.png')}
            />
          </View>
          {openFlag ? (
            <View style={styles.detailBox}>
              <Text style={[styles.textFont, styles.defaultText]}>
                애곰이가 사과를 준대요!
              </Text>
              <Button
                onPress={() => {
                  navigation.navigate('HitApple');
                }}
                text="사과 때리러 가기"
              />
            </View>
          ) : (
            <View style={styles.detailBox}>
              <Text style={[styles.textFont, styles.defaultText]}>
                애곰이는 아직 사과를 줄 생각이 없어요
              </Text>
              <Text style={[styles.textFont, styles.timeText]}>{time}</Text>
            </View>
          )}

          <View style={styles.appleDetailBox}>
            <View style={styles.oneBox}>
              <Text style={[styles.textFont, styles.nameText]}>
                {apple.title}
              </Text>
            </View>
            <View style={styles.nameBox}>
              <Text style={[styles.textFont, styles.nameText]}>
                {apple.teamName}
              </Text>
              <View style={styles.countBox}>
                <Image
                  style={styles.countIcon}
                  source={require('../../assets/icons/usercount.png')}
                />
                <Text>{apple.number}</Text>
              </View>
            </View>
            <View style={styles.contentBox}>
              <Text style={[styles.textFont, styles.smallText]}>
                이 사과에 기록된 데이터
              </Text>
              <View style={styles.iconBox}>
                {apple.content.includes('text') ? (
                  <Image
                    style={styles.contentIcon}
                    source={require('../../assets/icons/text.png')}
                  />
                ) : (
                  <></>
                )}
                {apple.content.includes('audio') ? (
                  <Image
                    style={styles.contentIcon}
                    source={require('../../assets/icons/mic.png')}
                  />
                ) : (
                  <></>
                )}
                {apple.content.includes('photo') ? (
                  <Image
                    style={styles.contentIcon}
                    source={require('../../assets/icons/photo.png')}
                  />
                ) : (
                  <></>
                )}
                {apple.content.includes('video') ? (
                  <Image
                    style={styles.contentIcon}
                    source={require('../../assets/icons/video.png')}
                  />
                ) : (
                  <></>
                )}
                {apple.content.includes('space') ? (
                  <Image
                    style={styles.contentIcon}
                    source={require('../../assets/icons/gps.png')}
                  />
                ) : (
                  <></>
                )}
              </View>
              <Text style={[styles.textFont, styles.secondText]}>
                생성일 : {apple.createAt.split('T')[0]}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <Text>Loading</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 16,
    backgroundColor: '#FBF8F6',
  },
  aegomBox: {
    flex: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: '2%',
  },
  aegom: {
    width: '60%',
    height: '90%',
  },
  detailBox: {
    flex: 2,
    alignItems: 'center',
  },
  oneBox: {
    flex: 1,
    justifyContent: 'center',
  },
  appleDetailBox: {
    flex: 5,
    alignItems: 'center',
    padding: '2%',
  },
  textFont: {
    fontFamily: 'UhBee Se_hyun',
  },
  defaultText: {
    fontSize: 20,
    color: '#4C4036',
  },
  nameText: {
    fontSize: 18,
    color: '#4C4036',
  },
  secondText: {
    fontSize: 15,
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
    fontSize: 12,
    color: '#AAA19B',
  },
  contentBox: {
    flex: 2,
    alignItems: 'center',
  },
  iconBox: {
    marginTop: 5,
    marginBottom: 15,
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
    width: 28,
    height: 28,
    marginRight: 3,
    marginLeft: 3,
  },
});

export default LockAppleDetail;
