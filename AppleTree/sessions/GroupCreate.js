import React from 'react';
import {SafeAreaView, View, StyleSheet, ScrollView} from 'react-native';
import {Text, TextInput, Image} from 'react-native';
import {Pressable} from 'react-native';
import {Button} from '../components/Button';

const GroupCreate = ({navigation}) => {
  const [nickname, setNickName] = React.useState(null);
  const [content, setContent] = React.useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <Image
          source={require('../assets/pictures/listpersonal1.png')}
          style={styles.image}
        />
        <Text style={styles.txt}>닉네임</Text>
        <TextInput
          value={nickname}
          style={styles.inputNick}
          placeholder="자기만의 닉네임을 입력해주세요"
          placeholderTextColor={'#AAA19B'}
          maxLength={20}
          onChangeText={text => setNickName(text)}
        />
        <Text style={styles.txt}>사과에 담고 싶은 내용을 써주세요!</Text>
        <TextInput
          value={content}
          style={styles.inputContent}
          placeholder="내용을 입력해주세요"
          placeholderTextColor={'#AAA19B'}
          multiline={true}
          numberOfLines={7}
          blurOnSubmit={true}
          onChangeText={text => setContent(text)}
        />
        <Text style={styles.txt}>사과에 담고 싶은 파일을 넣어 보세요!</Text>
        <View style={styles.buttonWarp}>
          <Pressable style={styles.add}>
            <Image
              source={require('AppleTree/assets/icons/videoadd.png')}
              style={styles.icon}
            />
            <Text style={styles.button}>추가하기</Text>
          </Pressable>
          <Pressable style={styles.add}>
            <Image
              source={require('AppleTree/assets/icons/imgadd.png')}
              style={styles.icon}
            />
            <Text style={styles.button}>추가하기</Text>
          </Pressable>
          <Pressable
            style={styles.add}
            onPress={() =>
              navigation.navigate('RecordVoice', {screen: 'RecordVoice'})
            }>
            <Image
              source={require('AppleTree/assets/icons/mic.png')}
              style={styles.icon}
            />
            <Text style={styles.button}>녹음하기</Text>
          </Pressable>
        </View>
        <Button onPress={onSubmit} text="추억 만들기" />
      </ScrollView>
    </SafeAreaView>
  );
};

const onSubmit = () => {
  alert('여기에 추억 api 넣어주삼~');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF8F6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  wrapper: {
    backgroundColor: '#FBF8F6',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  txt: {
    color: '#4C4036',
    fontFamily: 'UhBee Se_hyun Bold',
    fontSize: 16,
    width: 300,
  },
  inputNick: {
    justifyContent: 'center',
    backgroundColor: '#ECE5E0',
    color: '#4C4036',
    fontSize: 14,
    fontFamily: 'UhBee Se_hyun',
    textAlign: 'center',
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
    width: 300,
    height: 55,
    borderRadius: 10,
  },
  inputContent: {
    // justifyContent: 'center',
    backgroundColor: '#ECE5E0',
    color: '#4C4036',
    fontSize: 14,
    fontFamily: 'UhBee Se_hyun',
    textAlign: 'center',
    textAlignVertical: 'top',
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  add: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECE5E0',
    color: '#4C4036',
    fontSize: 14,
    fontFamily: 'UhBee Se_hyun',
    textAlign: 'center',
    padding: 10,
    margin: 8,
    width: 90,
    height: 95,
    borderRadius: 10,
  },
  icon: {
    resizeMode: 'contain',
    width: 26,
    height: 26,
  },
  image: {
    resizeMode: 'contain',
    marginBottom: 20,
    width: '100%',
    height: 200,
  },
  button: {
    color: '#4C4036',
    fontFamily: 'UhBee Se_hyun',
  },
  buttonWarp: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});

export default GroupCreate;
