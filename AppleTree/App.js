import * as React from 'react';
import {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SplashScreen from 'react-native-splash-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Main from './screens/Main';
import AppleList from './screens/AppleList';
import MyPage from './screens/auth/MyPage';
import Map from './screens/Map';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import {IntroFirst, IntroSecond} from './screens/Intro';
import MakeRoomForm from './screens/MakeRoomForm';
import GroupCreate from './sessions/GroupCreate';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import GroupSession from './sessions/GroupSession';
import AppleDetail from './screens/AppleDetail';
import AppleLockGIF from './screens/lock/AppleLockGIF';
import RecordVoice from './screens/RecordVoice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {setGestureState} from 'react-native-reanimated/lib/reanimated2/NativeMethods';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const CreateStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ListStack = createStackNavigator();

const styles = StyleSheet.create({
  navIcon: {
    width: heightPercentageToDP('3.5%'),
    height: heightPercentageToDP('3.5%'),
  },
});

export default function App() {
  const [token, setToken] = useState(null);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(false);

  auth().onAuthStateChanged(user => {
    if (user) {
      setUser(true);
    } else {
      setUser(false);
    }
  });
  function MyStacks() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {/* 인트로 3개 */}
        <Stack.Screen name="IntroFirst" component={IntroFirst} />
        <Stack.Screen name="IntroSecond" component={IntroSecond} />
        {/* 로그인 페이지 */}
        <Stack.Screen name="Login" component={Login} />
        {/* 회원가입 페이지 */}
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    );
  }

  function MyTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: hp('9%'),
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarInactiveBackgroundColor: '#ECE5E0',
          tabBarActiveBackgroundColor: '#c3b8ae',
        }}>
        <Tab.Screen
          name="Home"
          // component={Main}
          options={{
            tabBarIcon: () => (
              <Image
                source={require('./assets/icons/home.png')}
                style={{width: 20, height: 20}}
              />
            ),
          }}>
          {() => (
            <HomeStack.Navigator
              screenOptions={{
                headerShown: false,
                tabBarStyle: {display: 'none'},
              }}>
              <HomeStack.Screen name="Main" component={Main} />
            </HomeStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Map"
          component={Map}
          options={{
            tabBarIcon: () => (
              <Image
                source={require('./assets/icons/map.png')}
                style={{width: 20, height: 20}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="MakeRoom"
          options={{
            tabBarIcon: () => (
              <Image
                source={require('./assets/icons/create.png')}
                style={{width: 20, height: 20}}
              />
            ),
          }}>
          {() => (
            <CreateStack.Navigator screenOptions={{headerShown: false}}>
              <CreateStack.Screen
                name="MakeRoomForm"
                component={MakeRoomForm}
              />
              <CreateStack.Screen name="GroupCreate" component={GroupCreate} />
              <CreateStack.Screen
                name="GroupSession"
                component={GroupSession}
              />
              <CreateStack.Screen name="RecordVoice" component={RecordVoice} />
              <CreateStack.Screen
                options={{headerShown: false}}
                name="AppleLockGIF"
                component={AppleLockGIF}
              />
            </CreateStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="AppleList"
          // component={AppleList}
          options={{
            tabBarIcon: () => (
              <Image
                source={require('./assets/icons/list.png')}
                style={styles.navIcon}
              />
            ),
          }}>
          {() => (
            <ListStack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <ListStack.Screen name="AppleList" component={AppleList} />
              <ListStack.Screen name="AppleDetail" component={AppleDetail} />
            </ListStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="MyPage"
          component={MyPage}
          options={{
            tabBarIcon: () => (
              <Image
                source={require('./assets/icons/mypage.png')}
                style={{width: 20, height: 20}}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  // AsyncStorage의 idToken 가져오기
  const getToken = async () => {
    try {
      const savedToken = await AsyncStorage.getItem('idToken');
      setToken(savedToken);
      // const currentToken = savedToken;
      // console.log('currentToken:', currentToken);
    } catch (error) {
      console.log('getToken error' + error);
    }
  };

  //componentDidMount할때 해줘야되는거
  GoogleSignin.configure({});
  //구글 로그인 연동 환경세팅
  const googleSigninConfigure = () => {
    GoogleSignin.configure({
      webClientId:
        '103053283303-sob35ej0b5bqottv2rsv4ic0jdidcn0e.apps.googleusercontent.com',
    });
  };
  useEffect(() => {
    getToken();
    console.log('token잇냐?', token);
  });
  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 500); /** 스플래시 시간 조절 (0.5초) **/
      googleSigninConfigure();
    } catch (e) {
      console.warn('에러발생');
      console.warn(e);
    }
  }, []);
  return (
    <NavigationContainer>
      {user ? <MyTabs /> : <MyStacks />}
    </NavigationContainer>
  );
}
