import React, {useState} from 'react';
import {
  SafeAreaView,
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';

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
            <View Style={styles.buttonView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>닫기</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>자세히 보기</Text>
              </Pressable>
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  modalView: {
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'red',
  },
  buttonClose: {
    backgroundColor: '#373043',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: '#373043',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    flexDirection: 'column',
  },
  //모달 스타일 end
});

export default Main;
