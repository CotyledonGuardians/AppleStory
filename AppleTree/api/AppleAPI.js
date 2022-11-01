import api from './index';

const getOpenAppleList = async (sort, page, size) => {
  return await api('get', `/apple/open?sort=${sort}&page=${page}&size=${size}`);
};

const getCloseAppleList = async (sort, page, size) => {
  return await api(
    'get',
    `/apple/close?sort=${sort}&page=${page}&size=${size}`,
  );
};

const getMyAppleCount = async () => {
  return await api('get', '/apple/count');
};

const getAppleDetail = async id => {
  return await api('get', `/apple/${id}`);
};

const getLockAppleDetail = async id => {
  return await api('get', `/apple/${id}`);
};

//방만들기
const makeRoomAPI = async appleDTO => {
  return api('post', '/ws-front/lock-apple-room', appleDTO);
};

export {
  getOpenAppleList,
  getCloseAppleList,
  getMyAppleCount,
  getLockAppleDetail,
  makeRoomAPI,
  getAppleDetail,
};
