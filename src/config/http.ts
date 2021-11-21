/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-20 20:19:48
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-20 20:59:57
 */
import axios from 'axios';
import Config from 'react-native-config';

axios.defaults.baseURL = Config.API_URL;

axios.interceptors.request.use(
  function (config) {
    // console.log('--config', config);
    return config;
  },
  function (error) {
    console.log('--error', error);
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response) {
    console.log('------response', response);
    return response.data;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  },
);
