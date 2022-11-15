import React from 'react';
import {SafeAreaView, View, StyleSheet, ScrollView} from 'react-native';
import {Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {UseStomp, DisconnectIfConnected} from '../stomp';
import SelectDropdown from 'react-native-select-dropdown';
import {getCloseAppleList, getOpenAppleList} from '../api/AppleAPI';
import {useEffect, useState} from 'react';

const Apple = ({navigation, data}) => {
  const [appleSortList, setAppleSortList] = useState();
  // setAppleList(data.list);
  const appleList = data.list;
  const tabName = data.name;
  // console.log('현재 탭:', name);

  // const [sort, setSort] = useState(0);
  const size = 1000;

  var randomgroupImages = [
    require('../assets/pictures/listgroup1.png'),
    require('../assets/pictures/listgroup2.png'),
  ];
  var randomhitgroupImages = [
    require('../assets/pictures/readyhitgroup1.png'),
    require('../assets/pictures/readyhitgroup2.png'),
  ];

  const getSortList = async sort => {
    if (tabName === 'open') {
      console.log('dld');
      getOpenAppleList(sort, 0, size)
        .then(response => {
          // console.log(response.data);
          setAppleSortList(response.data.body.content);
        })
        .catch(error => {
          console.log('error', error);
        });
    } else {
      getCloseAppleList(sort, 0, size)
        .then(response => {
          setAppleSortList(response.data.body.content);
        })
        .catch(error => {
          console.log('error', error);
        });
    }
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
        <Image source={url} style={styles.appleImg} />
        <Text style={styles.titleFont}>
          {title.length > 11 ? title.substr(0, 10).trim() + '...' : title}
        </Text>
      </TouchableOpacity>
    );
  };

  function DropdownSelect() {
    let countries = [];
    if (tabName === 'open') {
      countries = ['오래된 순', '최신순'];
    } else {
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
        defaultValueByIndex={0}
        // defaultValue={routeSort2}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          // setSort(countries[index]);
          getSortList(countries[index]);
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

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.dropDownSelect}>
          <DropdownSelect />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {appleList.map((item, index) => {
            return (
              <View style={styles.appleView} key={index}>
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
          {appleList.length === 1 && <View style={styles.appleView}></View>}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF8F6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  card: {
    height: hp('25%'),
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appleImg: {
    resizeMode: 'contain',
    width: wp('33%'),
    height: hp('20%'),
  },
  appleView: {
    width: wp('48%'),
    flexDirection: 'row',
  },
  titleFont: {
    fontSize: wp('3%'),
    fontFamily: 'UhBee Se_hyun',
    color: '#4C4036',
  },
  dropDownSelect: {
    height: hp('8%'),
    alignItems: 'center',
  },
  dropdown2BtnStyle: {
    width: wp('40%'),
    height: hp('6%'),
    backgroundColor: '#ECE5E0',
    borderRadius: 8,
    top: hp('2%'),
    position: 'absolute',
  },
  dropdown2BtnTxtStyle: {
    color: '#4C4036',
    textAlign: 'center',
    fontSize: wp('3%'),
    fontFamily: 'UhBee Se_hyun',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#ECE5E0',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: {
    backgroundColor: '#ECE5E0',
    borderBottomColor: '#716357',
  },
  dropdown2RowTxtStyle: {
    color: '#4C4036',
    textAlign: 'center',
    fontSize: wp('3%'),
    fontFamily: 'UhBee Se_hyun',
  },
});

export default Apple;
