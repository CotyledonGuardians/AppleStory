import * as React from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
      // renderDropdownIcon={isOpened => {
      //   return (
      //     <FontAwesome
      //       name={isOpened ? 'chevron-up' : 'chevron-down'}
      //       color={'#000'}
      //       size={30}
      //     />
      //   );
      // }}
      // dropdownIconPosition={'right'}
      dropdownStyle={styles.dropdown2DropdownStyle}
      rowStyle={styles.dropdown2RowStyle}
      rowTextStyle={styles.dropdown2RowTxtStyle}
    />
  );
}

function HomeScreen() {
  var myloop = [];
  var arr = [
    {
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
      type: false,
      title: '테스트임2!',
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
    },
    {
      type: false,
      title: '테스트임3!',
      creator: {
        teamName: '테스트팀',
        hostUid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
        member: [
          {
            nickname: '테스트닉네임',
            uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
          },
          {
            nickname: '테스트닉네임',
            uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
          },
        ],
      },
    },
    {
      type: false,
      title: '테스트임4!',
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
    },
    {
      type: false,
      title: '테스트임5!',
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
    },
    {
      type: false,
      title: '테스트임6!',
      creator: {
        teamName: '테스트팀',
        hostUid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
        member: [
          {
            nickname: '테스트닉네임',
            uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
          },
          {
            nickname: '테스트닉네임',
            uid: 'WQk7cwPRUYhcaW4iUT9ZWZz8nil2',
          },
        ],
      },
    },
  ];
  for (let i = 0; i < arr.length; i++) {
    // 사람 개수
    // console.log(arr[i].creator.member.length);
    // console.log(arr[i].title);

    //Math.random() * 10) + 1;
    var count = Math.random();
    var listPerson = '../assets/pictures/listpersona' + count + '.png';
    console.log(listPerson);
    myloop.push(
      <View style={styles.box}>
        <View style={styles.inner}>
          <Image
            source={
              arr[i].creator.member.length == 1
                ? require('../assets/pictures/listpersonal1.png')
                : require('../assets/pictures/listgroup1.png')
            }
            style={{width: '70%', height: '70%'}}
            resizeMode="contain"
          />
          <Text>{arr[i].title}</Text>
        </View>
      </View>,
    );
  }
  // for (let i = 0; i < 10; i++) {
  //   myloop.push(
  //     <View key={i}>
  //       <Text>{i}</Text>
  //     </View>,
  //   );
  // }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBF8F6',
      }}>
      <DropdownSelect />
      <View style={styles.boxContainer}>{myloop}</View>
      {/* <Text>잠긴 사과</Text> */}
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
      <DropdownSelect />
      <Text>열린 사과</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
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
        <Tab.Screen name="잠긴 사과" component={HomeScreen} />
        <Tab.Screen name="열린 사과" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const AppleList = () => {
  return <MyTabs />;
};

const styles = StyleSheet.create({
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
  boxContainer: {
    width: '100%',
    height: '70%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    width: '50%',
    height: '50%',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
  },
});

export default AppleList;
