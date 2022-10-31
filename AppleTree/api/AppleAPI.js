import api from './index';

const getOpenAppleList = async (sort, page, size) => {
  const url = '/apple/open' + `?sort=${sort}&page=${page}&size=${size}`;
  return await api('get', url);
};

const getCloseAppleList = async (sort, page, size) => {
  const url = '/apple/close' + `?sort=${sort}&page=${page}&size=${size}`;
  return await api('get', url);
};

const getMyAppleCount = async () => {
  return await api('get', '/apple/count');
};

//방만들기
const makeRoomAPI = async appleDTO => {
  return api('post', '/ws-front/lock-apple-room', appleDTO);
};

export {getOpenAppleList, getCloseAppleList, getMyAppleCount, makeRoomAPI};
