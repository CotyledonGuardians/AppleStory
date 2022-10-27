import api from './index';

const getOpenAppleList = async body => {
  return await api('get', '/apple/open', body);
};

const getCloseAppleList = async body => {
  // const result = await jwtAxios.get('/apple/close', body);
  // return result.data;
  return await api('get', '/apple/close', body);
};

export {getOpenAppleList, getCloseAppleList};
