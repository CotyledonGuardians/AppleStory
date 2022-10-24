import axios from 'axios';
import {AsyncStorage} from 'react-native';

const jwtAxios = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER_BASE_URL,
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${AsyncStorage.getItem('ACCESS_TOKEN')}`,
  },
});

const getOpenAppleList = async body => {
  const result = await jwtAxios.get('/apple/open', body);
  return result.data;
};

const getCloseAppleList = async body => {
  const result = await jwtAxios.get('/apple/close', body);
  return result.data;
};

export {getOpenAppleList, getCloseAppleList};
