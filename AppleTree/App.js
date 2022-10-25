import * as React from 'react';
import {Text, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './screens/Main';
import AppleList from './screens/AppleList';
import MyPage from './screens/auth/MyPage';
import Map from './screens/Map';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import {IntroFirst, IntroSecond} from './screens/Intro';
import MakeRoomForm from './screens/MakeRoomForm';
import GroupCreate from './sessions/GroupCreate';
import GroupSession from './sessions/GroupSession';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const CreateStack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveBackgroundColor: '#ECE5E0',
        tabBarActiveBackgroundColor: '#c3b8ae',
      }}>
      <Tab.Screen
        name="Home"
        component={Main}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('./assets/icons/home.png')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
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
          <CreateStack.Navigator>
            <CreateStack.Screen name="MakeRoomForm" component={MakeRoomForm} />
            <CreateStack.Screen name="GroupCreate" component={GroupCreate} />
            <CreateStack.Screen name="GroupSession" component={GroupSession} />
          </CreateStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="AppleList"
        component={AppleList}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('./assets/icons/list.png')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
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

function MyStack() {
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

const isLogin = true;

export default function App() {
  return (
    <NavigationContainer>
      {/* <MyTabs /> */}
      {isLogin ? <MyTabs /> : <MyStack />}
    </NavigationContainer>
  );
}
