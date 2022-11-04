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
import {UseStomp} from '../stomp';

const AppleList = ({navigation}) => {
  const [route, setRoute] = useState('열린 사과');
  const [routeSort, setRouteSort] = useState('오래된 순');

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(1);
  const [sort, setSort] = useState(0);
  const [sort2, setSort2] = useState(0);

  const [closeList, setCloseList] = useState([]);
  const [openList, setOpenList] = useState([]);

  const getInitData = async sort => {
    getOpenAppleList(sort, 0, 6)
      .then(response => {
        setOpenList(response.data.body.content);
      })
      .catch(error => {
        console.log('error', error);
      });

    getCloseAppleList(sort, 0, 6)
      .then(response => {
        setCloseList(response.data.body.content);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  // 컴포넌트가 마운트되면 해당 함수를 호출해 초기 데이터 설정
  useEffect(() => {
    getInitData(sort);
  }, [sort]);

  const updateList = async type => {
    if (type === 'close') {
      // API로부터 받아온 페이징 데이터를 이용해 다음 데이터를 로드
      getCloseAppleList(sort, page, 6)
        .then(response => {
          const fetchedData = response.data.body.content; // 피드 데이터 부분

          if (fetchedData.length === 0) {
            setLoading(true);
            return;
          }
          // 기존 데이터 배열과 새로 받아온 데이터 배열을 합쳐 새 배열을 만들고 state에 저장한다.
          const mergedData = closeList.concat(fetchedData);
          if (fetchedData.length <= 6) {
            setLoading(true);
          }

          setCloseList(mergedData);
          setPage(page + 1);
          setRoute('잠긴 사과');
        })
        .catch(error => {
          console.log('error', error);
        });
    } else if (type === 'open') {
      // API로부터 받아온 페이징 데이터를 이용해 다음 데이터를 로드
      getOpenAppleList(sort, page2, 6)
        .then(response => {
          const fetchedData = response.data.body.content; // 피드 데이터 부분

          if (fetchedData.length === 0) {
            setLoading2(true);
            console.log('데이터 없음');
            return;
          }
          // 기존 데이터 배열과 새로 받아온 데이터 배열을 합쳐 새 배열을 만들고 state에 저장한다.
          const mergedData = openList.concat(fetchedData);
          if (fetchedData.length <= 6) {
            setLoading2(true);
          }

          setOpenList(mergedData);
          setPage2(page2 + 1);
          setRoute('열린 사과');
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  };

  var randomgroupImages = [
    require('../assets/pictures/listgroup1.png'),
    require('../assets/pictures/listgroup2.png'),
  ];
  var randomhitgroupImages = [
    require('../assets/pictures/readyhitgroup1.png'),
    require('../assets/pictures/readyhitgroup2.png'),
  ];

  const appleDetail = id => {
    navigation.navigate('AppleDetail', {screen: 'AppleDetail', id: id});
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
              navigation.navigate('AppleDetail', {
                screen: 'AppleDetail',
                id: id,
              });
            } else {
              UseStomp(
                () => {
                  console.log('make room succeed', id);
                  navigation.navigate('HitApple', {
                    id: id,
                  });
                },
                () => {
                  console.log('make room failed', id);
                  // alert('make room failed', id);
                },
              );
              // navigation.navigate('HitApple', {
              //   id: id,
              // });
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
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  function DropdownSelect() {
    let countries = [];

    if (route === '열린 사과') {
      countries = ['오래된 순', '최신순'];
    } else if (route === '잠긴 사과') {
      countries = [
        '오래된 순',
        '최신순',
        '적게 남은 시간 순',
        '많이 남은 시간 순',
      ];
    }

    return (
      <SelectDropdown
        data={countries}
        // defaultValueByIndex={1}
        defaultValue={routeSort}
        onSelect={(selectedItem, index) => {
          setPage(1);
          setSort(index);
          setLoading(false);
          setPage2(1);
          setSort2(index);
          setLoading2(false);
          // console.log(selectedItem, index);
          setRouteSort(countries[index]);
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

  function HomeScreen() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FBF8F6',
        }}>
        <View style={{height: 100, alignItems: 'center'}}>
          <DropdownSelect />
        </View>
        <ScrollView
          onScroll={e => {
            // 현재 스크롤 값
            const updateScroll = e.nativeEvent.contentOffset.y;
            if (updateScroll === 0) {
              return;
            }
            // 전체 문서의 높이
            const documentHeight = e.nativeEvent.contentSize.height;
            // 현재 보여지는 화면 높이
            const screenHeight = e.nativeEvent.layoutMeasurement.height;
            // 원하는 로직을 시작하는 시점
            const endPoint = 10;

            if (screenHeight + updateScroll + endPoint >= documentHeight) {
              if (!loading) {
                updateList('close');
              }
            }
          }}
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

  function SettingsScreen() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FBF8F6',
        }}>
        <View style={{height: 90, alignItems: 'center'}}>
          <DropdownSelect />
        </View>
        <ScrollView
          onScroll={e => {
            // 현재 스크롤 값
            const updateScroll = e.nativeEvent.contentOffset.y;
            if (updateScroll === 0) {
              return;
            }
            // 전체 문서의 높이
            const documentHeight = e.nativeEvent.contentSize.height;
            // 현재 보여지는 화면 높이
            const screenHeight = e.nativeEvent.layoutMeasurement.height;
            // 원하는 로직을 시작하는 시점
            const endPoint = 10;

            if (screenHeight + updateScroll + endPoint >= documentHeight) {
              if (!loading2) {
                updateList('open');
              }
            }
          }}
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
    return (
      <NavigationContainer independent={true}>
        <Tab.Navigator
          initialRouteName={route}
          screenOptions={{
            tabBarLabelStyle: {fontSize: 18, fontFamily: 'UhBee Se_hyun Bold'},
            tabBarStyle: {
              backgroundColor: '#ECE5E0',
              // height: 60,
            },
            tabBarIndicatorStyle: {
              backgroundColor: '#AAA19B',
              height: 5,
            },
          }}>
          <Tab.Screen
            name="열린 사과"
            component={SettingsScreen}
            listeners={{
              tabPress: e => {
                setRoute('열린 사과');
              },
            }}
          />
          <Tab.Screen
            name="잠긴 사과"
            component={HomeScreen}
            listeners={{
              tabPress: e => {
                setRoute('잠긴 사과');
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
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

// const data = [
//   {
//     type: false,
//     title: '테스트임1!',
//     creator: {
//       teamName: '테스트팀',
//       hostUid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//       member: [
//         {
//           nickname: '테스트닉네임',
//           uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//         },
//       ],
//     },
//     createAt: '2022-10-15T00:00:00.000+00:00',
//     unlockAt: '2024-10-14T00:00:00.000+00:00',
//     createScene: 'https://www.google.com',
//     content: null,
//     location: null,
//     useSpace: false,
//     uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//     isShow: false,
//     isOpen: false,
//   },
//   {
//     type: true,
//     title: '테스트임1!',
//     creator: {
//       teamName: '테스트팀',
//       hostUid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//       member: [
//         {
//           nickname: '테스트닉네임',
//           uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//         },
//       ],
//     },
//     createAt: '2022-10-15T00:00:00.000+00:00',
//     unlockAt: '2022-10-16T00:00:00.000+00:00',
//     createScene: 'https://www.google.com',
//     content: null,
//     location: null,
//     useSpace: false,
//     uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//     isShow: false,
//     isOpen: false,
//   },
//   {
//     type: false,
//     title: '테스트임1!',
//     creator: {
//       teamName: '테스트팀',
//       hostUid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//       member: [
//         {
//           nickname: '테스트닉네임',
//           uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//         },
//       ],
//     },
//     createAt: '2022-10-15T00:00:00.000+00:00',
//     unlockAt: '2024-10-14T00:00:00.000+00:00',
//     createScene: 'https://www.google.com',
//     content: null,
//     location: null,
//     useSpace: false,
//     uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//     isShow: false,
//     isOpen: false,
//   },
//   {
//     type: false,
//     title: '테스트임1!',
//     creator: {
//       teamName: '테스트팀',
//       hostUid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//       member: [
//         {
//           nickname: '테스트닉네임',
//           uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//         },
//       ],
//     },
//     createAt: '2022-10-15T00:00:00.000+00:00',
//     unlockAt: '2024-10-14T00:00:00.000+00:00',
//     createScene: 'https://www.google.com',
//     content: null,
//     location: null,
//     useSpace: false,
//     uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//     isShow: false,
//     isOpen: false,
//   },
//   {
//     type: false,
//     title: '테스트임1!',
//     creator: {
//       teamName: '테스트팀',
//       hostUid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//       member: [
//         {
//           nickname: '테스트닉네임',
//           uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//         },
//       ],
//     },
//     createAt: '2022-10-15T00:00:00.000+00:00',
//     unlockAt: '2022-10-14T00:00:00.000+00:00',
//     createScene: 'https://www.google.com',
//     content: null,
//     location: null,
//     useSpace: false,
//     uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//     isShow: false,
//     isOpen: false,
//   },
//   {
//     type: false,
//     title: '테스트임1!',
//     creator: {
//       teamName: '테스트팀',
//       hostUid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//       member: [
//         {
//           nickname: '테스트닉네임',
//           uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//         },
//       ],
//     },
//     createAt: '2022-10-15T00:00:00.000+00:00',
//     unlockAt: '2022-10-14T00:00:00.000+00:00',
//     createScene: 'https://www.google.com',
//     content: null,
//     location: null,
//     useSpace: false,
//     uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//     isShow: false,
//     isOpen: false,
//   },
//   {
//     type: true,
//     title: '테스트임1!',
//     creator: {
//       teamName: '테스트팀',
//       hostUid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//       member: [
//         {
//           nickname: '테스트닉네임',
//           uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//         },
//       ],
//     },
//     createAt: '2022-10-15T00:00:00.000+00:00',
//     unlockAt: '2024-10-22T00:00:00.000+00:00',
//     createScene: 'https://www.google.com',
//     content: null,
//     location: null,
//     useSpace: false,
//     uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
//     isShow: false,
//     isOpen: true,
//   },
// ];
