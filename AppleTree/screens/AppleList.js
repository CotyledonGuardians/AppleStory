import * as React from 'react';
import {StyleSheet} from 'react-native';
import {useEffect, useState, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getCloseAppleList, getOpenAppleList} from '../api/AppleAPI';
import Loading from './LoadingDefault';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Apple from './AppleListTab';

const AppleList = ({navigation}) => {
  const [route, setRoute] = useState('열린 사과');

  const [closeList, setCloseList] = useState(0);
  const [openList, setOpenList] = useState(0);
  const size = 1000;

  const getInitOpenData = async => {
    getOpenAppleList(0, 0, size)
      .then(response => {
        // console.log(response.data);
        setOpenList(response.data.body.content);
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  const getInitCloseData = async => {
    getCloseAppleList(0, 0, size)
      .then(response => {
        setCloseList(response.data.body.content);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  // 컴포넌트가 마운트되면 해당 함수를 호출해 초기 데이터 설정
  useEffect(() => {
    getInitOpenData();
    getInitCloseData();
  }, []);

  const Tab = createMaterialTopTabNavigator();

  function MyTabsTwo() {
    return openList !== 0 && closeList !== 0 ? (
      <NavigationContainer independent={true}>
        <Tab.Navigator
          initialRouteName={route}
          screenOptions={{
            tabBarLabelStyle: {
              paddingTop: hp('0.5%'),
              fontSize: hp('2.5%'),
              fontFamily: 'UhBee Se_hyun Bold',
            },
            tabBarStyle: {
              backgroundColor: '#ECE5E0',
              height: hp('9%'),
            },
            tabBarIndicatorStyle: {
              backgroundColor: '#AAA19B',
              height: hp('1%'),
            },
          }}>
          <Tab.Screen
            name="열린 사과"
            children={() => (
              <Apple
                data={{name: 'open', list: openList}}
                navigation={navigation}
              />
            )}
          />
          <Tab.Screen
            name="잠긴 사과"
            children={() => (
              <Apple
                data={{name: 'close', list: closeList}}
                navigation={navigation}
              />
            )}
          />
        </Tab.Navigator>
      </NavigationContainer>
    ) : (
      <Loading />
    );
  }
  return <MyTabsTwo />;
};

export default AppleList;
