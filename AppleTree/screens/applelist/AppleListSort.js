import SelectDropdown from 'react-native-select-dropdown';
import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {getCloseAppleList, getOpenAppleList} from '../../api/AppleAPI';
import {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Apple from './AppleCard';
const DropdownSelect = ({navigation, data}) => {
  const [appleSortList, setAppleSortList] = useState();
  const tabName = data.name;
  let appleList = data.list;
  const size = 1000;
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
  const getSortList = async sort => {
    if (tabName === 'open') {
      getOpenAppleList(sort, 0, size)
        .then(response => {
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
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.dropDownSelect}>
          <SelectDropdown
            data={countries}
            defaultValueByIndex={0}
            onSelect={(selectedItem, index) => {
              getSortList(index);
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
        </View>
        <Apple
          navigation={navigation}
          data={appleSortList === undefined ? appleList : appleSortList}
        />
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
  dropDownSelect: {
    // marginTop: hp('5%'),
    backgroundColor: '#FBF8F6',
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
  scroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
export default DropdownSelect;