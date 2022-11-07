import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';

const Loading = () => {
  return (
    <SafeAreaView style={styles.backView}>
      <View style={styles.imgView}>
        <Image
          style={styles.aegom}
          source={require('../assets/pictures/aegom2.png')}
        />
        <Text style={styles.text}>로딩중..</Text>
      </View>
      <View style={styles.spinnerView}>
        <ActivityIndicator size="large" color={'#4c4036'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FBF8F6',
  },
  imgView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'UhBee Se_hyun Bold',
    fontSize: 30,
    color: '#373043',
  },
  aegom: {
    height: 200,
    width: 150,
  },
  spinnerView: {
    flex: 0.5,
    justifyContent: 'flex-start',
  },
});

export default Loading;
