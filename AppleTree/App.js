import * as React from 'react';
import {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
// import AppleDetail from './screens/AppleDetail';
import Overview from './screens/unlock/Overview';
import AppleLockGIF from './screens/lock/AppleLockGIF';
import RecordVoice from './screens/RecordVoice';
// import SeedDetail from './screens/SeedDetail';
import UnlockAppleDetail from './screens/unlock/UnlockAppleDetail';
import HitApple from './sessions/AppleHitSession';
import LockAppleDetail from './screens/lock/LockAppleDetail';
import auth from '@react-native-firebase/auth';
import JoinSession from './screens/test/JoinSession';
import AppleUnlockGIF from './screens/unlock/AppleUnlockGIF';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const CreateStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const MapStack = createNativeStackNavigator();
const ListStack = createNativeStackNavigator();

const styles = StyleSheet.create({
  navIcon: {
    width: heightPercentageToDP('3.5%'),
    height: heightPercentageToDP('3.5%'),
  },
});

export default function App() {
  const [login, setLogin] = useState(false);

  auth().onAuthStateChanged(user => {
    const idToken = AsyncStorage.getItem('idToken');
    if (user && idToken) {
      setLogin(true);
    } else {
      setLogin(false);
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
        {/* 회원가입 페이지 */}
        <Stack.Screen name="Register" component={Register} />
        {/* 로그인 페이지 */}
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  }

  function MyTabs() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route);
            if (
              routeName === 'AppleUnlockGIF' ||
              routeName === 'AppleLockGIF'
            ) {
              return {display: 'none', height: hp('9%')};
            }
            return {height: hp('9%')};
          })(route),
          headerShown: false,
          tabBarShowLabel: false,
          tabBarInactiveBackgroundColor: '#ECE5E0',
          tabBarActiveBackgroundColor: '#c3b8ae',
        })}>
        <Tab.Screen
          name="Home"
          // component={Main}
          options={{
            tabBarIcon: () => (
              <Image
                source={require('./assets/icons/home.png')}
                style={styles.navIcon}
              />
            ),
            unmountOnBlur: true,
          }}>
          {() => (
            <HomeStack.Navigator
              screenOptions={{
                headerShown: false,
                tabBarStyle: {display: 'none'},
              }}>
              <HomeStack.Screen name="Main" component={Main} />
              <HomeStack.Screen name="HitApple" component={HitApple} />
              <HomeStack.Screen
                name="LockAppleDetail"
                component={LockAppleDetail}
              />
              <HomeStack.Screen name="Overview" component={Overview} />
              <HomeStack.Screen
                name="UnlockAppleDetail"
                component={UnlockAppleDetail}
              />
            </HomeStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="MapNavi"
          options={{
            tabBarIcon: () => (
              <Image
                source={require('./assets/icons/map.png')}
                style={styles.navIcon}
              />
            ),
            unmountOnBlur: true,
          }}>
          {() => (
            <MapStack.Navigator
              screenOptions={{
                headerShown: false,
                tabBarStyle: {display: 'none'},
              }}>
              <MapStack.Screen name="Map" component={Map} />
              <MapStack.Screen name="Overview" component={Overview} />
              <MapStack.Screen
                name="UnlockAppleDetail"
                component={UnlockAppleDetail}
              />
              <MapStack.Screen name="HitApple" component={HitApple} />
              <MapStack.Screen
                name="LockAppleDetail"
                component={LockAppleDetail}
              />
            </MapStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="MakeRoom"
          options={{
            tabBarIcon: () => (
              <Image
                source={require('./assets/icons/create.png')}
                style={styles.navIcon}
              />
            ),
            unmountOnBlur: true,
          }}>
          {() => (
            <CreateStack.Navigator screenOptions={{headerShown: false}}>
              <CreateStack.Screen
                name="MakeRoomForm"
                component={MakeRoomForm}
              />
              <CreateStack.Screen name="JoinSession" component={JoinSession} />
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
          name="List"
          options={{
            tabBarIcon: () => (
              <Image
                source={require('./assets/icons/list.png')}
                style={styles.navIcon}
              />
            ),
            unmountOnBlur: true,
          }}>
          {() => (
            <ListStack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <ListStack.Screen name="AppleList" component={AppleList} />
              <ListStack.Screen name="Overview" component={Overview} />
              <ListStack.Screen
                name="UnlockAppleDetail"
                component={UnlockAppleDetail}
              />
              <ListStack.Screen name="HitApple" component={HitApple} />
              <ListStack.Screen
                name="LockAppleDetail"
                component={LockAppleDetail}
              />
              <ListStack.Screen
                options={{headerShown: false}}
                name="AppleUnlockGIF"
                component={AppleUnlockGIF}
              />
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
                style={styles.navIcon}
              />
            ),
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    );
  }

  // AsyncStorage의 idToken 가져오기
  // const getToken = async () => {
  //   try {
  //     const savedToken = await AsyncStorage.getItem('idToken');
  //     setToken(savedToken);
  //     // const currentToken = savedToken;
  //     // console.log('currentToken:', currentToken);
  //   } catch (error) {
  //     console.log('getToken error' + error);
  //   }
  // };
  useEffect(() => {
    //componentDidMount할때 해줘야되는거
    GoogleSignin.configure({});
    //구글 로그인 연동 환경세팅
    const googleSigninConfigure = () => {
      GoogleSignin.configure({
        webClientId:
          '103053283303-sob35ej0b5bqottv2rsv4ic0jdidcn0e.apps.googleusercontent.com',
      });
    };
    try {
      googleSigninConfigure();
      setTimeout(() => {
        SplashScreen.hide();
      }, 500); /** 스플래시 시간 조절 (0.5초) **/
    } catch (e) {
      // console.warn('에러발생');
      console.warn(e);
    }
  });

  return (
    <NavigationContainer>
      {login ? <MyTabs /> : <MyStacks />}
    </NavigationContainer>
  );
}
