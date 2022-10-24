import React from 'react';
import {SafeAreaView, StyleSheet, ImageBackground, Image} from 'react-native';
// import {useQuery} from 'react-query';
// import {width, height} from '../config/globalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getOpenAppleList, getCloseAppleList} from '../api/AppleAPI';

const Apple = ({index, apple}) => {
  const appleStyle = [
    styles.apple1,
    styles.apple2,
    styles.apple3,
    styles.apple4,
    styles.apple5,
    styles.apple6,
  ];

  // 남은 시간에 따라 사과 사진 변경
  let imgUrl = [
    require('../assets/pictures/apple1.png'),
    require('../assets/pictures/apple2.png'),
    require('../assets/pictures/apple3.png'),
    require('../assets/pictures/apple4.png'),
  ];

  return <Image style={appleStyle[index]} source={imgUrl[3]} />;
};

const Main = () => {
  // const {data: appleList} = useQuery('getCloseAppleList', () =>
  //   getCloseAppleList({sort: 1, page: 0, size: 6}),
  // );
  // const {data: openApples} = useQuery('getOpenAppleList', () =>
  //   getOpenAppleList({sort: 1, page: 0, size: 1}),
  // );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.backgroundImg}
        source={require('../assets/pictures/main.png')}>
        <Image
          style={styles.hanging}
          source={require('../assets/gifs/hanging.gif')}
        />
        {/* {appleList.length > 0 ? (
          <Apple index={0} apple={appleList[0]} />
        ) : (
          <></>
        )}
        {appleList.length > 1 ? (
          <Apple index={1} apple={appleList[1]} />
        ) : (
          <></>
        )}
        {appleList.length > 2 ? (
          <Apple index={2} apple={appleList[2]} />
        ) : (
          <></>
        )}
        {appleList.length > 3 ? (
          <Apple index={3} apple={appleList[3]} />
        ) : (
          <></>
        )}
        {appleList.length > 4 ? (
          <Apple index={4} apple={appleList[4]} />
        ) : (
          <></>
        )}
        {appleList.length > 5 ? (
          <Apple index={5} apple={appleList[5]} />
        ) : (
          <></>
        )}
        {openApples.length > 0 ? (
          <Image
            style={styles.basket}
            source={require('../assets/pictures/basketfull.png')}
          />
        ) : (
          <Image
            style={styles.basket}
            source={require('../assets/pictures/basket.png')}
          />
        )} */}

        <Apple index={0} />
        <Apple index={1} />
        <Apple index={2} />
        <Apple index={3} />
        <Apple index={4} />
        <Apple index={5} />
        <Image
          style={styles.basket}
          source={require('../assets/pictures/basketfull.png')}
        />
        <Image
          style={styles.bear}
          source={require('../assets/gifs/eatingApple.gif')}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    width: '100%',
    height: '100%',
  },
  hanging: {
    width: wp('20%'),
    height: hp('30%'),
    top: 0,
    left: wp('90%'),
  },
  apple1: {
    width: wp('17%'),
    height: hp('10%'),
    position: 'absolute',
    top: hp('15%'),
    left: wp('37%'),
  },
  apple2: {
    width: wp('17%'),
    height: hp('10%'),
    position: 'absolute',
    top: hp('25%'),
    left: wp('17%'),
  },
  apple3: {
    width: wp('17%'),
    height: hp('10%'),
    position: 'absolute',
    top: hp('20%'),
    left: wp('62%'),
  },
  apple4: {
    width: wp('17%'),
    height: hp('10%'),
    position: 'absolute',
    top: hp('32%'),
    left: wp('42%'),
  },
  apple5: {
    width: wp('17%'),
    height: hp('10%'),
    position: 'absolute',
    top: hp('38%'),
    left: wp('67%'),
  },
  apple6: {
    width: wp('17%'),
    height: hp('10%'),
    position: 'absolute',
    top: hp('40%'),
    left: wp('12%'),
  },
  bear: {
    width: wp('65%'),
    height: hp('40%'),
    position: 'absolute',
    top: hp('50%'),
    left: wp('50%'),
  },
  basket: {
    width: wp('28%'),
    height: wp('29%'),
    position: 'absolute',
    top: hp('65%'),
    left: wp('10%'),
  },
});

export default Main;
