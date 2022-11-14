import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// 1. button 생성
const Button = ({onPress, text, disabled}) => {
  return (
    <Pressable onPress={onPress} style={styles.buttonShape} disabled={disabled}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const SmallButton = ({onPress, text, disabled}) => {
  return (
    <Pressable
      onPress={onPress}
      style={styles.smallButtonShape}
      disabled={disabled}>
      <Text style={styles.smallButtonText}>{text}</Text>
    </Pressable>
  );
};

const HangButton = ({onPress, text, disabled}) => {
  return (
    <Pressable
      onPress={onPress}
      style={styles.hangButtonShape}
      disabled={disabled}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const SmallWhiteButton = ({onPress, text}) => {
  return (
    <Pressable onPress={onPress} style={styles.smallWhiteButtonShape}>
      <Text style={styles.whilteButtonText}>{text}</Text>
    </Pressable>
  );
};
// 2. style 적용
const styles = StyleSheet.create({
  buttonShape: {
    width: wp('72%'),
    height: hp('7%'),
    borderRadius: 100,
    backgroundColor: '#373043',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButtonShape: {
    width: 135,
    height: 60,
    borderRadius: 25,
    paddingHorizontal: 10,
    margin: 5,
    elevation: 2,
    backgroundColor: '#373043',
    flex: 0.4,
    justifyContent: 'center',
  },
  hangButtonShape: {
    width: 135,
    height: 60,
    borderRadius: 25,
    paddingHorizontal: 10,
    margin: 5,
    elevation: 2,
    backgroundColor: '#A6B0D5',
    color: 'black',
    flex: 0.4,
    justifyContent: 'center',
  },
  smallWhiteButtonShape: {
    width: 135,
    height: 60,
    borderColor: 'black',
    borderRadius: 25,
    paddingHorizontal: 10,
    margin: 5,
    elevation: 2,
    backgroundColor: '#FBF8F6',
    flex: 0.4,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: wp('4%'),
    fontFamily: 'UhBee Se_hyun Bold',
  },
  smallButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: wp('2%'),
    fontFamily: 'UhBee Se_hyun Bold',
  },
  hangButtonText: {
    textAlign: 'center',
    color: '#373043',
    fontSize: 15,
    fontFamily: 'UhBee Se_hyun Bold',
  },
  whilteButtonText: {
    textAlign: 'center',
    color: '#373043',
    fontSize: 15,
    fontFamily: 'UhBee Se_hyun Bold',
  },
});

export {Button, SmallButton, SmallWhiteButton, HangButton};
