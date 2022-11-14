import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useEffect, useState, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SelectDropdown from 'react-native-select-dropdown';
import {getCloseAppleList, getOpenAppleList} from '../api/AppleAPI';
import {UseStomp, DisconnectIfConnected} from '../stomp';
import Loading from './LoadingDefault';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const AppleList = ({navigation}) => {
  const [route, setRoute] = useState('열린 사과');
  const [routeSort, setRouteSort] = useState('오래된 순');
  const [routeSort2, setRouteSort2] = useState('오래된 순');

  // const [sort, setSort] = useState(0);
  // const [sort2, setSort2] = useState(0);

  const [closeList, setCloseList] = useState(0);
  const [openList, setOpenList] = useState(0);
  const scrollViewRef = useRef();
  const size = 1000;
  const getInitData = async sort => {
    getOpenAppleList(0, 0, size)
      .then(response => {
        // console.log(response.data);
        setOpenList(response.data.body.content);
      })
      .catch(error => {
        console.log('error', error);
      });

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
    getInitData();
  }, []);

  var randomgroupImages = [
    require('../assets/pictures/listgroup1.png'),
    require('../assets/pictures/listgroup2.png'),
  ];
  var randomhitgroupImages = [
    require('../assets/pictures/readyhitgroup1.png'),
    require('../assets/pictures/readyhitgroup2.png'),
  ];

  const appleDetail = id => {
    navigation.navigate('Overview', {screen: 'Overview', id: id});
  };

  const hitApple = () => {
    navigation.navigate('HitApple');
  };

  const Card = ({type, title, unlockAt, isOpen, index, id, isCatch}: any) => {
    let lockDate = new Date(unlockAt);
    let today = new Date();
    var url = '';

    if (!isOpen && today >= lockDate) {
      url =
        randomhitgroupImages[
          Math.floor(Math.random() * randomhitgroupImages.length)
        ];
    } else {
      if (type) {
        url = require('../assets/pictures/listpersonal1.png');
      } else {
        url =
          randomgroupImages[
            Math.floor(Math.random() * randomgroupImages.length)
          ];
      }
    }

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          if (today >= lockDate) {
            // 현재 시간보다 시간이 지나있는 경우
            if (isCatch) {
              navigation.navigate('Overview', {
                screen: 'Overview',
                id: id,
              });
            } else {
              const connect = () => {
                UseStomp(
                  () => {
                    console.log('make room succeed', id);
                    navigation.navigate('HitApple', {
                      id: id,
                    });
                  },
                  () => {
                    console.log('make room failed', id);
                  },
                );
              };
              DisconnectIfConnected(connect, {}, connect);
            }
          } else {
            navigation.navigate('LockAppleDetail', {
              id: id,
            });
          }
        }}>
        <Image
          source={url}
          style={{width: '70%', height: '70%'}}
          resizeMode="contain"
        />
        <Text style={{fontFamily: 'UhBee Se_hyun', color: '#4C4036'}}>
          {title.length > 11 ? title.substr(0, 10).trim() + '...' : title}
        </Text>
      </TouchableOpacity>
    );
  };

  function OpenDropdownSelect() {
    let countries = ['오래된 순', '최신순'];
    return (
      <SelectDropdown
        data={countries}
        // defaultValueByIndex={1}
        defaultValue={routeSort}
        onSelect={(selectedItem, index) => {
          // console.log('열린 사과', index, countries[index]);
          setRouteSort(countries[index]);
          // setSort(index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={styles.dropdown2BtnStyle}
        buttonTextStyle={styles.dropdown2BtnTxtStyle}
        dropdownStyle={styles.dropdown2DropdownStyle}
        rowStyle={styles.dropdown2RowStyle}
        rowTextStyle={styles.dropdown2RowTxtStyle}
      />
    );
  }

  function CloseDropdownSelect() {
    let countries = [
      '오래된 순',
      '최신순',
      '적게 남은 시간 순',
      '많이 남은 시간 순',
    ];

    return (
      <SelectDropdown
        data={countries}
        // defaultValueByIndex={1}
        defaultValue={routeSort2}
        onSelect={(selectedItem, index) => {
          // console.log('잠긴 사과');
          setRouteSort2(countries[index]);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={styles.dropdown2BtnStyle}
        buttonTextStyle={styles.dropdown2BtnTxtStyle}
        dropdownStyle={styles.dropdown2DropdownStyle}
        rowStyle={styles.dropdown2RowStyle}
        rowTextStyle={styles.dropdown2RowTxtStyle}
      />
    );
  }

  // 잠긴사과
  function CloseScreen() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FBF8F6',
        }}>
        {/* <View style={{height: 100, alignItems: 'center'}}>
          <CloseDropdownSelect />
        </View> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {closeList.map((item, index) => {
            return (
              <View style={{width: '50%', flexDirection: 'row'}} key={index}>
                <Card
                  key="{index}"
                  title={item.title}
                  type={item.type}
                  unlockAt={item.unlockAt}
                  isOpen={item.isOpen}
                  id={item.id}
                  isCatch={item.isCatch}
                />
              </View>
            );
          })}
          {closeList.length === 1 && (
            <View style={{width: '50%', flexDirection: 'row'}}></View>
          )}
        </ScrollView>
      </View>
    );
  }

  // 열린사과
  function OpenScreen() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FBF8F6',
        }}>
        {/* <View style={{height: 90, alignItems: 'center'}}>
          <OpenDropdownSelect />
        </View> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {openList.map((item, index) => {
            return (
              <View style={{width: '50%', flexDirection: 'row'}} key={index}>
                <Card
                  key={index}
                  title={item.title}
                  type={item.type}
                  unlockAt={item.unlockAt}
                  isOpen={item.isOpen}
                  id={item.id}
                  isCatch={item.isCatch}
                />
              </View>
            );
          })}
          {openList.length === 1 && (
            <View style={{width: '50%', flexDirection: 'row'}}></View>
          )}
        </ScrollView>
      </View>
    );
  }

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
            component={OpenScreen}
            listeners={{
              tabPress: e => {
                setRoute('열린 사과');
              },
            }}
          />
          <Tab.Screen
            name="잠긴 사과"
            component={CloseScreen}
            listeners={{
              tabPress: e => {
                setRoute('잠긴 사과');
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    ) : (
      <Loading />
    );
  }
  return <MyTabsTwo />;
};

const styles = StyleSheet.create({
  card: {
    height: 200,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown2BtnStyle: {
    width: '50%',
    height: 50,
    backgroundColor: '#ECE5E0',
    borderRadius: 8,
    top: 20,
    position: 'absolute',
  },
  dropdown2BtnTxtStyle: {
    color: '#4C4036',
    textAlign: 'center',
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: 'UhBee Se_hyun',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#ECE5E0',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: {backgroundColor: '#ECE5E0', borderBottomColor: '#716357'},
  dropdown2RowTxtStyle: {
    color: '#4C4036',
    textAlign: 'center',
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: 'UhBee Se_hyun',
  },
  boxContainer: {
    width: '100%',
    height: '70%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default AppleList;
