import * as React from 'react';
import {Text, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Main from './screens/Main';
import AppleList from './screens/AppleList';
import MyPage from './screens/auth/MyPage';
import Map from './screens/Map';
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
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
        name="Create"
        component={Main}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('./assets/icons/create.png')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
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

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
