import React, {useState} from 'react';
import {StyleSheet, Image} from 'react-native';

const ImageFullScreen = ({route}) => {
  const url = route.params.url;

  return (
    <Image
      style={styles.image}
      source={{
        uri: url,
      }}
    />
  );
};

export default ImageFullScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF8F6',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
});
