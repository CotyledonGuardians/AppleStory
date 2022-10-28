import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Sound from 'react-native-sound';

const AudioVideoExample = () => {
  let sound1, sound2, sound3, sound4, sound5, sound6;

  useEffect(() => {
    Sound.setCategory('Playback', true); // true = mixWithOthers
    return () => {
      if (sound1) sound1.release();
      if (sound2) sound2.release();
      if (sound3) sound3.release();
      if (sound4) sound4.release();
      if (sound5) sound5.release();
      if (sound6) sound6.release();
    };
  }, []);

  // List of the dummy sound track
  const audioList = [
    {
      title: 'Play mp3 sound from remote URL',
      url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3',
    },
    {
      title: 'Play mp3 sound from Local',
      isRequire: true,
      url: require('./vancouver.mp3'),
    },
  ];

  const playSound = (item, index) => {
    if (index == 0) {
      sound1 = new Sound(item.url, (error, _sound) => {
        if (error) {
          alert('error' + error.message);
          return;
        }
        sound1.play(() => {
          sound1.release();
        });
      });
    } else if (index == 1) {
      sound2 = new Sound(item.url, '', (error, _sound) => {
        if (error) {
          alert('error' + error.message);
          return;
        }
        sound2.play(() => {
          sound2.release();
        });
      });
    }
  };

  const stopSound = (_item, index) => {
    if (index == 0 && sound1) {
      sound1.stop(() => {
        console.log('Stop');
      });
    } else if (index == 1 && sound2) {
      sound2.stop(() => {
        console.log('Stop');
      });
    }
  };

  const ItemView = (item, index) => {
    return (
      <View style={styles.feature} key={index}>
        <Text style={styles.textStyle}>{item.title}</Text>
        <TouchableOpacity onPress={() => playSound(item, index)}>
          <Text style={styles.buttonPlay}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => stopSound(item, index)}>
          <Text style={styles.buttonStop}>Stop</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Play Music / Sound in React Native App for Android and iOS
        </Text>
        <ScrollView style={{flex: 1}}>{audioList.map(ItemView)}</ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AudioVideoExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    flex: 1,
    padding: 5,
  },
  buttonPlay: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(00,80,00,1)',
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  buttonStop: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(80,00,00,1)',
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  feature: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 7,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgb(180,180,180)',
  },
});
