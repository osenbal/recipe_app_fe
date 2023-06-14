import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_API_URL} from '@env';

const instance = axios.create({
  baseURL: `${REACT_APP_API_URL}`,
});

// instance.interceptors.request.use(

instance.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('@accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  response => {
    return response;
  },

  async error => {
    if (error.response.status === 401) {
      // get token from refresh token
      const refreshToken = await AsyncStorage.getItem('@refreshToken');

      if (!refreshToken) {
        return Promise.reject(error);
      }

      const newAccessToken = await instance.get('/auth/refresh-token', {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      // store new token to storage
      await AsyncStorage.setItem(
        '@accessToken',
        newAccessToken.data.body.token.accessToken,
      );

      error.config.headers.Authorization = `Bearer ${newAccessToken.data.body.token.accessToken}`;

      // recall request
      return instance(error.config);
    }
    return Promise.reject(error);
  },
);

export default instance;
