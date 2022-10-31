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
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AppleList = ({navigation}) => {
  const data = [
    {
      id: 1,
      type: false,
      title: '테스트임1!',
      creator: {
        teamName: '테스트팀',
        hostUid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
        member: [
          {
            nickname: '테스트닉네임',
            uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
          },
        ],
      },
      createAt: '2022-10-15T00:00:00.000+00:00',
      unlockAt: '2024-10-14T00:00:00.000+00:00',
      createScene: 'https://www.google.com',
      content: null,
      location: null,
      useSpace: false,
      uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
      isShow: false,
      isOpen: false,
    },
    {
      id: 8,
      type: true,
      title: '테스트임1!',
      creator: {
        teamName: '테스트팀',
        hostUid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
        member: [
          {
            nickname: '테스트닉네임',
            uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
          },
        ],
      },
      createAt: '2022-10-15T00:00:00.000+00:00',
      unlockAt: '2022-10-16T00:00:00.000+00:00',
      createScene: 'https://www.google.com',
      content: null,
      location: null,
      useSpace: false,
      uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
      isShow: false,
      isOpen: false,
    },
    {
      id: 8,
      type: false,
      title: '테스트임1!',
      creator: {
        teamName: '테스트팀',
        hostUid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
        member: [
          {
            nickname: '테스트닉네임',
            uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
          },
        ],
      },
      createAt: '2022-10-15T00:00:00.000+00:00',
      unlockAt: '2024-10-14T00:00:00.000+00:00',
      createScene: 'https://www.google.com',
      content: null,
      location: null,
      useSpace: false,
      uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
      isShow: false,
      isOpen: false,
    },
    {
      id: 9,
      type: false,
      title: '테스트임1!',
      creator: {
        teamName: '테스트팀',
        hostUid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
        member: [
          {
            nickname: '테스트닉네임',
            uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
          },
        ],
      },
      createAt: '2022-10-15T00:00:00.000+00:00',
      unlockAt: '2024-10-14T00:00:00.000+00:00',
      createScene: 'https://www.google.com',
      content: null,
      location: null,
      useSpace: false,
      uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
      isShow: false,
      isOpen: false,
    },
    {
      id: 7,
      type: false,
      title: '테스트임1!',
      creator: {
        teamName: '테스트팀',
        hostUid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
        member: [
          {
            nickname: '테스트닉네임',
            uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
          },
        ],
      },
      createAt: '2022-10-15T00:00:00.000+00:00',
      unlockAt: '2022-10-14T00:00:00.000+00:00',
      createScene: 'https://www.google.com',
      content: null,
      location: null,
      useSpace: false,
      uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
      isShow: false,
      isOpen: false,
    },
    {
      id: 8,
      type: false,
      title: '테스트임1!',
      creator: {
        teamName: '테스트팀',
        hostUid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
        member: [
          {
            nickname: '테스트닉네임',
            uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
          },
        ],
      },
      createAt: '2022-10-15T00:00:00.000+00:00',
      unlockAt: '2022-10-14T00:00:00.000+00:00',
      createScene: 'https://www.google.com',
      content: null,
      location: null,
      useSpace: false,
      uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
      isShow: false,
      isOpen: false,
    },
    {
      id: 8,
      type: true,
      title: '테스트임1!',
      creator: {
        teamName: '테스트팀',
        hostUid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
        member: [
          {
            nickname: '테스트닉네임',
            uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
          },
        ],
      },
      createAt: '2022-10-15T00:00:00.000+00:00',
      unlockAt: '2024-10-22T00:00:00.000+00:00',
      createScene: 'https://www.google.com',
      content: null,
      location: null,
      useSpace: false,
      uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
      isShow: false,
      isOpen: true,
    },
  ];

  var randomgroupImages = [
    require('../assets/pictures/listgroup1.png'),
    require('../assets/pictures/listgroup2.png'),
  ];
  var randomhitgroupImages = [
    require('../assets/pictures/readyhitgroup1.png'),
    require('../assets/pictures/readyhitgroup2.png'),
  ];

  const appleDetail = id => {
    console.log('id', id);
    navigation.navigate('AppleDetail', {screen: 'AppleDetail', id: id});
  };

  const Card = ({type, title, unlockAt, isOpen, index, id}: any) => {
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
          // Alert.alert('상세보기로 넘어가렴~');
          appleDetail(id);
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
    const countries = [
      '최신순',
      '오래된 순',
      '적게 남은 시간 순',
      '많이 남은 시간 순',
    ];

    return (
      <SelectDropdown
        data={countries}
        defaultValueByIndex={1}
        defaultValue={'최신순'}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {data.map((item, index) => {
            //   console.log(index);
            return (
              <View style={{width: '50%', flexDirection: 'row'}} key={index}>
                <Card
                  key="{index}"
                  title={item.title}
                  type={item.type}
                  unlockAt={item.unlockAt}
                  isOpen={item.isOpen}
                  id={item.id}
                />
              </View>
            );
          })}
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {data.map((item, index) => {
            //   console.log(index);
            return (
              <View style={{width: '50%', flexDirection: 'row'}} key={index}>
                <Card
                  key={index}
                  title={item.title}
                  type={item.type}
                  unlockAt={item.unlockAt}
                  isOpen={item.isOpen}
                  id={item.id}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  const Tab = createMaterialTopTabNavigator();

  function MyTabsTwo() {
    return (
      <NavigationContainer independent={true}>
        <Tab.Navigator
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
          <Tab.Screen name="열린 사과" component={SettingsScreen} />
          <Tab.Screen name="잠긴 사과" component={HomeScreen} />
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
