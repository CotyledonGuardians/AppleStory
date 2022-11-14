import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  Platform,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Pressable,
  Text,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from '../components/Button';
import RecordVoice from '../screens/RecordVoice';
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import {SendIfSubscribed} from '../stomp';
import {DisconnectIfConnected} from '../stomp';
import Loading from '../screens/LoadingDefault';
// define enum for asset type
const AssetType = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
};
Object.freeze(AssetType);

const GroupCreate = ({navigation, route}) => {
  // 녹음기 모달//
  const [modalVisible, setModalVisible] = useState(false);

  const [nickname, setNickName] = useState(null);
  const [nickNameValid, setNickNameValid] = useState(false);
  const [content, setContent] = useState(null);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [imagePathOnDevice, setImagePathOnDevice] = useState(null);
  const [videoPathOnDevice, setVideoPathOnDevice] = useState(null);
  const [audioPathOnDevice, setAudioPathOnDevice] = useState(null);
  const [recordedTime, setRecordedTime] = useState('00:00');
  const [imageIsPicked, setImageIsPicked] = useState(false);
  const [videoIsPicked, setVideoIsPicked] = useState(false);
  const [audioIsPicked, setAudioIsPicked] = useState(false);
  const [loading, setLoading] = useState(false);

  let imagePathOnStorage = null;
  let videoPathOnStorage = null;
  let audioPathOnStorage = null;

  // GroupCreate에서 넘겨준 room id
  const {roomId} = route.params;
  // GroupCreate에서 넘겨준 isHost
  const {isHost} = route.params;
  // GroupCreate에서 넘겨준 appleId
  const {appleId} = route.params;
  console.log(appleId);

  //닉네임 입력됬는지
  const nickNameChangeHandler = text => {
    if (text.trim().length === 0) {
      setNickNameValid(false);
    } else {
      setNickNameValid(true);
    }
    setNickName(text);
  };
  const actAdded = () => {
    console.log('actAdded');
    SendIfSubscribed(`/lock-apple-room.${roomId}.added`, {
      nickname: nickname,
      content: {
        text: [
          {
            author: nickname,
            content: content,
          },
        ],
        photo: [
          {
            author: nickname,
            content: imagePathOnStorage,
          },
        ],
        audio: [
          {
            author: nickname,
            content: audioPathOnStorage,
          },
        ],
        video: [
          {
            author: nickname,
            content: videoPathOnStorage,
          },
        ],
      },
    });
  };
  const getPathForFirebaseStorage = async uri => {
    if (Platform.OS === 'ios') {
      return uri;
    }

    if (!uri.includes('content://com.google')) {
      return uri;
    }

    const stat = await RNFetchBlob.fs.stat(uri);
    return 'file://' + stat.path;
  };

  const getPermission = async () => {
    //권한 설정
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }

      return true;
    }
  };

  const addAsset = async type => {
    const permission = await getPermission();

    if (!permission) {
      return;
    }

    await pickAssetFromLibrary(type).catch(err => {
      console.log('Error in pickAssetFromLibrary: ', err.message);
    });
  };

  const removeAsset = async type => {
    if (type === AssetType.IMAGE) {
      setImage(null);
      setImagePathOnDevice(null);
      setImageIsPicked(false);
    } else if (type === AssetType.VIDEO) {
      setVideo(null);
      setVideoPathOnDevice(null);
      setVideoIsPicked(false);
    } else if (type === AssetType.AUDIO) {
      await RNFS.unlink(audioPathOnDevice)
        .then(() => {
          console.log(`Delete ${audioPathOnDevice}`);
          setAudioPathOnDevice(null);
          setAudioIsPicked(false);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };

  const pickAssetFromLibrary = async type => {
    // Asset type check
    if (!type || (type !== AssetType.IMAGE && type !== AssetType.VIDEO)) {
      console.log('type is invalid.');
      return;
    }

    // Set image picker option according to asset type
    let option = null;
    if (type === AssetType.IMAGE) {
      option = {
        mediaType: 'photo',
        selectionLimit: 1,
        includeBase64: Platform.OS === 'android',
      };
    } else if (type === AssetType.VIDEO) {
      option = {
        mediaType: 'video',
        selectionLimit: 1,
      };
    }

    // pick asset from library and set the asset into state
    await launchImageLibrary(option, response => {
      if (!response) return;
      if (response.didCancel) {
        console.log('User cancelled asset picking');
        return;
      } else if (response.error) {
        console.log('assetPicker Error: ', response.error);
        return;
      } else if (response.customButton) {
        console.log('User click customButton: ', response.error);
        return;
      } else {
        const asset = response.assets[0];
        if (type === AssetType.IMAGE) {
          setImage(asset);
          setImagePathOnDevice(asset.uri);
          setImageIsPicked(true);
        } else if (type === AssetType.VIDEO) {
          setVideo(asset);
          setVideoPathOnDevice(asset.uri);
          setVideoIsPicked(true);
        }
      }
    }).catch(err => {
      console.log('Error in launchImageLibrary: ', err);
    });
  };

  const imageUpload = async asset => {
    const currentUid = auth().currentUser['uid'];

    if (asset && currentUid) {
      const reference = storage().ref(`/${appleId}/images/${currentUid}`);

      if (Platform.OS === 'android') {
        const result = await reference
          .putString(asset.base64, 'base64', {
            contentType: asset.type,
          })
          .catch(err => {
            throw err;
          });
        return result;
      } else if (Platform.OS === 'ios') {
        return await reference.putFile(asset.uri).catch(err => {
          throw err;
        });
      }
    }
  };

  const videoUpload = async asset => {
    const currentUid = auth().currentUser['uid'];

    if (asset && currentUid) {
      const reference = storage().ref(`/${appleId}/videos/${currentUid}`);
      const staticUrl = await getPathForFirebaseStorage(asset.uri).catch(
        err => {
          throw err;
        },
      );
      return reference
        .putFile(staticUrl, {
          contentType: asset.type,
        })
        .catch(err => {
          throw err;
        });
    }
  };

  const audioUpload = async audioPathOnDevice => {
    const currentUid = auth().currentUser['uid'];

    if (audioPathOnDevice && currentUid) {
      const reference = storage().ref(`/${appleId}/audios/${currentUid}`);
      return reference
        .putFile(audioPathOnDevice, {
          contentType: 'audio/mp4',
        })
        .catch(err => {
          throw err;
        });
    }
  };

  const setUploadContent = results => {
    let audioFlag = false;
    let imageFlag = false;
    let videoFlag = false;
    results.forEach(result => {
      // console.log(result);
      if (!result) {
        return;
      }
      const contentType = new String(result['metadata'].contentType);
      const indexOfSlash = contentType.indexOf('/');
      const assetType = contentType.slice(0, indexOfSlash).trim();
      console.log(`.${assetType}.`);
      if (assetType === AssetType.AUDIO) {
        audioPathOnStorage = result['metadata'].fullPath;
        audioFlag = true;
        console.log('Audio: ', audioPathOnStorage);
      } else if (assetType === AssetType.IMAGE) {
        imagePathOnStorage = result['metadata'].fullPath;
        imageFlag = true;
        console.log('Image: ', imagePathOnStorage);
      } else if (assetType === AssetType.VIDEO) {
        videoPathOnStorage = result['metadata'].fullPath;
        videoFlag = true;
        console.log('Video: ', videoPathOnStorage);
      }
    });
    if (!audioFlag) {
      audioPathOnStorage = null;
    }
    if (!imageFlag) {
      imagePathOnStorage = null;
    }
    if (!videoFlag) {
      videoPathOnStorage = null;
    }
  };

  const onSubmit = () => {
    console.log(videoPathOnDevice);
    setLoading(true);
    Promise.all([
      imageUpload(image),
      videoUpload(video, videoPathOnDevice),
      audioUpload(audioPathOnDevice),
    ])
      .then(res => {
        setUploadContent(res);
      })
      .then(() => {
        actAdded();
      })
      .then(() => {
        // console.log('isHost?', isHost);
        if (isHost) {
          Alert.alert('추억담기 완료!', '다시 세션으로 돌아갑니다.');
          navigation.pop();
        } else {
          Alert.alert(
            '추억담기 완료!',
            '방장이 사과를 매달때까지 기다려주세요.',
          );
          disconnect();
          navigation.navigate('Home', {screen: 'Main'});
        }
      })
      .catch(err => {
        deleteAllUploaded().catch(err => {
          console.log(err);
        });
      });
  };

  const deleteAllUploaded = async () => {
    const uri = [
      `test/audios/${auth().currentUser.uid}`,
      `test/images/${auth().currentUser.uid}`,
      `test/videos/${auth().currentUser.uid}`,
    ];
    uri.forEach(contentUri => {
      const reference = storage().ref(contentUri);
      reference.delete().catch(err => {
        switch (err.code) {
          case 'storage/object-no-found':
            break;
          default:
            throw err;
        }
      });
    });
  };
  const disconnect = () => {
    DisconnectIfConnected(() => {
      navigation.navigate('Home', {screen: 'Main'});
    });
  };
  return !loading ? (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../assets/pictures/listpersonal1.png')}
          style={{
            width: 180,
            height: 170,
            marginTop: 30,
            marginBottom: 10,
          }}
        />
        <Text style={styles.txt}>닉네임</Text>
        <TextInput
          value={nickname}
          style={styles.inputNick}
          placeholder="자기만의 닉네임을 입력해주세요"
          placeholderTextColor={'#AAA19B'}
          maxLength={20}
          onChangeText={text => nickNameChangeHandler(text)}
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
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          {videoIsPicked ? (
            <View>
              <Pressable style={styles.add}>
                <ImageBackground
                  source={{
                    uri: videoPathOnDevice,
                  }}
                  style={styles.preview}
                  imageStyle={{borderRadius: 10}}
                />
              </Pressable>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => {
                  removeAsset(AssetType.VIDEO).catch(err => {
                    console.log('Error in removeAsset: ', err.message);
                  });
                }}>
                <Text style={styles.removeText}>삭제</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Pressable
              style={styles.add}
              onPress={() => {
                // addAsset(AssetType.VIDEO).catch(err => {
                //   console.log('Error in addAsset: ', err.message);
                // });
                Alert.alert('추후 추가될 기능이에요.');
              }}>
              <Image
                source={require('AppleTree/assets/icons/videoadd.png')}
                style={styles.icon}
              />
              <Text style={styles.button}>추가하기</Text>
            </Pressable>
          )}
          {imageIsPicked ? (
            <View>
              <Pressable style={styles.add}>
                <ImageBackground
                  source={{
                    uri: imagePathOnDevice,
                  }}
                  imageStyle={{borderRadius: 10}}
                  style={styles.preview}
                />
              </Pressable>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => {
                  removeAsset(AssetType.IMAGE).catch(err => {
                    console.log('Error in removeAsset: ', err.message);
                  });
                }}>
                <Text style={styles.removeText}>삭제</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Pressable
              style={styles.add}
              onPress={() => {
                addAsset(AssetType.IMAGE).catch(err => {
                  console.log('Error in addAsset: ', err.message);
                });
              }}>
              <Image
                source={require('AppleTree/assets/icons/imgadd.png')}
                style={styles.icon}
              />
              <Text style={styles.button}>추가하기</Text>
            </Pressable>
          )}
          {audioIsPicked ? (
            <View>
              <View style={styles.add}>
                <Image
                  source={require('AppleTree/assets/icons/mic.png')}
                  style={styles.icon}
                />
                <Text style={styles.button}>{recordedTime}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => {
                  removeAsset(AssetType.AUDIO).catch(err => {
                    console.log('Error in removeAsset: ', err.message);
                  });
                }}>
                <Text style={styles.removeText}>삭제</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Pressable
              style={styles.add}
              onPress={
                // () => setModalVisible(true)
                () => Alert.alert('추후 추가될 기능이에요.')
              }>
              <Image
                source={require('AppleTree/assets/icons/mic.png')}
                style={styles.icon}
              />
              <Text style={styles.button}>녹음하기</Text>
            </Pressable>
          )}
        </View>
        <Button onPress={onSubmit} disabled={!nickNameValid} text="완료" />
        {/* 녹음기 모달 start */}
        <View style={styles.centeredView}>
          <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <View
              style={
                modalVisible
                  ? styles.modalOpenCenteredView
                  : styles.centeredView
              }>
              <View style={styles.modalView}>
                <RecordVoice
                  setModalVisible={setModalVisible}
                  setAudioPathOnDevice={setAudioPathOnDevice}
                  setAudioIsPicked={setAudioIsPicked}
                  setRecordedTime={setRecordedTime}
                />
              </View>
            </View>
          </Modal>
        </View>
        {/* 녹음기 모달 end */}
      </SafeAreaView>
    </ScrollView>
  ) : (
    <Loading />
  );
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
    flexGrow: 1,
    justifyContent: 'center',
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
  preview: {
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
    opacity: 0.9,
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
  iconOnImage: {
    padding: 5,
    width: 26,
    height: 26,
  },
  removeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 100,
    height: 20,
  },
  removeText: {
    textAlign: 'center',
    color: '#4C4036',
    fontSize: 14,
    fontFamily: 'UhBee Se_hyun',
  },
  //모달 스타일 start
  centeredView: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: '30%'
  },
  modalOpenCenteredView: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
  },
  modalView: {
    fontFamily: 'UhBee Se_hyun Bold',
    margin: 20,
    backgroundColor: '#ECE5E0',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default GroupCreate;
