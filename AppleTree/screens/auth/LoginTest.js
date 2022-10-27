import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Button, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginTest = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [idToken, setIdToken] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  
  const signIn = () => {
    if(!checkLoginInput()) return;
    auth().signInWithEmailAndPassword(id, password)
    .then((data) => {
      console.log(data.user.getIdToken());
      return data.user.getIdToken();
    })
    .then((idToken) => {
      setIdToken(idToken);
    })
    .catch((error) => {
      switch(error.code) {
        case "auth/invalid-email":
          setErrMsg("Invalid email");
          break;
        case "auth/user-not-found":
          setErrMsg("No account with that email was found");
          break;
        case "auth/wrong-password":
          setErrMsg("Incorrect password");
          break;
        default:
          setErrMsg("exception");
          break;
      }
      Alert.alert(errMsg);
    })
  }

  const checkLoginInput = () => {
    if(!id.trim()) {
      Alert.alert('Please enter ID!');
      return false;
    }
    if(!password.trim()) {
      Alert.alert('Please enter password!')
      return false;
    }
    return true;
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setId}
        value={id}
        placeholder="이메일"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="비밀번호"
        secureTextEntry={true}
      />
      <Button
        title="로그인"
        onPress={signIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

export default LoginTest;
