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

const getLockAppleDetail = async id => {
  return await api('get', `/apple/${id}`);
};

export {
  getOpenAppleList,
  getCloseAppleList,
  getMyAppleCount,
  getLockAppleDetail,
};
