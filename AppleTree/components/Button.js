import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

// 1. button 생성
const Button = ({onPress, text}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonShape}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
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
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'UhBee Se_hyun Bold',
  },
});

export default Button;
