/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-17 18:55:28
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-17 18:57:12
 */
import home from './home';
import {DvaLoadingState} from 'dva-loading-ts';
const models = [home];
export type RootState = {
  home: typeof home.state;
  loading: DvaLoadingState;
};

export default models;
