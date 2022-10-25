import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

// 1. button 생성
const Button = ({onPress, text}) => {
  return (
    <Pressable onPress={onPress} style={styles.buttonShape}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const SmallButton = ({onPress, text}) => {
  return (
    <Pressable onPress={onPress} style={styles.smallButtonShape}>
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
    width: 300,
    height: 50,
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

export {Button, SmallButton, SmallWhiteButton};
