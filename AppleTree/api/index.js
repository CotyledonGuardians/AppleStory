import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import Config from 'react-native-config';

/**
 * accessToken: string 을 받아서
 * 인터셉터가 설정된 Axios 인스턴스를 반환
 */
const GetAxios = accessToken => {
  const axiosPrivate = axios.create({
    baseURL: Config.API_APP_KEY,
  });

  axiosPrivate.interceptors.request.use(config => {
    if (accessToken && accessToken !== '') {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  });

  return axiosPrivate;
};

/**
 * 토큰을 재발급 받아서 (네트워크 IO),
 * async스토리지에 저장한 후,
 * useStored를 호출하여 반환된
 * Axios 인스턴스가 담길 프라미스를 반환
 */
const RefreshToken = async () => {
  console.log('토큰이 만료되어 재발급');

  return auth()
    .currentUser.getIdToken()
    .then(idToken => {
      AsyncStorage.setItem('idToken', idToken);
      return idToken;
    })
    .then(idToken => {
      return GetAxios(idToken);
    });
};

/**
 * parameters
 * method: string ("get" or "post" ...)
 * url: string (".../api"까지 생략)
 * body: Object (axios가 알아서 JSON으로 변환)
 *
 * return
 * Promise (Axios 요청 결과)
 */
const api = async (method, url, body) => {
  const accessToken = AsyncStorage.getItem('idToken');
  if (!accessToken || accessToken === '') {
    throw {no_access_token: true};
  }

  try {
    return await GetAxios(accessToken)[method](url, body);
  } catch (e) {
    return (await RefreshToken())[method](url, body);
  }
};

export default api;
