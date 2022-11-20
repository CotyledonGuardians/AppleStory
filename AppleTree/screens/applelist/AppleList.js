import * as React from 'react';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getCloseAppleList, getOpenAppleList} from '../../api/AppleAPI';
import Loading from '../LoadingDefault';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DropdownSelect from './AppleListSort';

const AppleList = ({navigation}) => {
  const [closeList, setCloseList] = useState(0);
  const [openList, setOpenList] = useState(0);
  const Tab = createMaterialTopTabNavigator();
  const size = 1000;

  const getInitOpenData = async => {
    getOpenAppleList(0, 0, size)
      .then(response => {
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

  function AppleListTab() {
    return openList !== 0 && closeList !== 0 ? (
      <NavigationContainer independent={true}>
        <Tab.Navigator
          initialRouteName={'열린 사과'}
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
              <DropdownSelect
                data={{name: 'open', list: openList}}
                navigation={navigation}
              />
            )}
          />
          <Tab.Screen
            name="잠긴 사과"
            children={() => (
              <DropdownSelect
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
  return <AppleListTab />;
};

export default AppleList;
