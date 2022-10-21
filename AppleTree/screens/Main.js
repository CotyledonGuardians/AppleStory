import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const Apple = ({index}) => {
  const appleStyle = [
    styles.apple1,
    styles.apple2,
    styles.apple3,
    styles.apple4,
    styles.apple5,
    styles.apple6,
  ];

  let imgUrl = [
    require('../assets/pictures/apple1.png'),
    require('../assets/pictures/apple2.png'),
    require('../assets/pictures/apple3.png'),
    require('../assets/pictures/apple4.png'),
  ];

  return <Image style={appleStyle[index]} source={imgUrl[3]} />;
};

const Main = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.backgroundImg}
        source={require('../assets/pictures/main.png')}>
        <Image
          style={styles.hanging}
          source={require('../assets/gifs/hanging.gif')}
        />
        <Apple index={0} />
        <Apple index={1} />
        <Apple index={2} />
        <Apple index={3} />
        <Apple index={4} />
        <Apple index={5} />
        <Image
          style={styles.basket}
          source={require('../assets/pictures/basket.png')}
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
    width: '20%',
    height: '30%',
    top: 0,
    left: '90%',
  },
  apple1: {
    width: '16%',
    height: '10%',
    position: 'absolute',
    top: '17%',
    left: '37%',
  },
  apple2: {
    width: '16%',
    height: '10%',
    position: 'absolute',
    top: '28%',
    left: '17%',
  },
  apple3: {
    width: '16%',
    height: '10%',
    position: 'absolute',
    top: '25%',
    left: '62%',
  },
  apple4: {
    width: '16%',
    height: '10%',
    position: 'absolute',
    top: '35%',
    left: '42%',
  },
  apple5: {
    width: '16%',
    height: '10%',
    position: 'absolute',
    top: '43%',
    left: '67%',
  },
  apple6: {
    width: '16%',
    height: '10%',
    position: 'absolute',
    top: '45%',
    left: '12%',
  },
  bear: {
    width: '60%',
    height: '40%',
    position: 'absolute',
    top: '55%',
    left: '50%',
  },
  basket: {
    width: '30%',
    height: '20%',
    position: 'absolute',
    top: '70%',
    left: '17%',
  },
});

export default Main;
