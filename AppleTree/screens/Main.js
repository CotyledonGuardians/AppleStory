import React, {useState} from 'react';
import {
  Image,
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';
import {SmallButton} from '../components/Button';
const Main = () => {
  // 모달 state
  const [modalVisible, setModalVisible] = useState(false);
  return (
    // 모달 view
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('모달 닫힘.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>사과를 아직 열 수 없어요!</Text>
            <Image source={require('../assets/pictures/aegomkey.png')} />
            <Text style={styles.timeText}>334일 2시 32분</Text>
            <View style={{flexDirection: 'row'}}>
              <SmallButton
                onPress={() => setModalVisible(!modalVisible)}
                text="닫기"></SmallButton>
              <SmallButton
                onPress={() => setModalVisible(!modalVisible)}
                text="자세히 보기"></SmallButton>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>안익은 사과</Text>
      </Pressable>
    </View>
    // 모달 view end
  );
};

const styles = StyleSheet.create({
  //모달 스타일 start
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  buttonView: {
    flexDirection: 'row',
  },
  modalView: {
    fontFamily: 'UhBee Se_hyun Bold',
    margin: 20,
    backgroundColor: '#ECE5E0',
    borderRadius: 20,
    padding: 35,
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
  //나중에 삭제
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'red',
  },
  //나중에 삭제 end
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'UhBee Se_hyun Bold',
    fontSize: 15,
    color: '#373043',
    marginBottom: 15,
    textAlign: 'center',
    flexDirection: 'column',
  },
  timeText: {
    fontFamily: 'UhBee Se_hyun Bold',
    fontSize: 30,
    color: '#4c4036',
    textAlign: 'center',
  },
  //모달 스타일 end
});

export default Main;
