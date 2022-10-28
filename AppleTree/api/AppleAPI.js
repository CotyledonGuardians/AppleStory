import api from './index';

const getOpenAppleList = async (sort, page, size) => {
  const url = '/apple/open' + `?sort=${sort}&page=${page}&size=${size}`;
  return await api('get', url);
};

const getCloseAppleList = async (sort, page, size) => {
  const url = '/apple/close' + `?sort=${sort}&page=${page}&size=${size}`;
  return await api('get', url);
};

export {getOpenAppleList, getCloseAppleList};
