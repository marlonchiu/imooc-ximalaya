/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-17 18:55:28
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-20 20:54:21
 */
import {DvaLoadingState} from 'dva-loading-ts';
import home from './home';
import category from './category';

const models = [home, category];

export type RootState = {
  home: typeof home.state;
  category: typeof category.state;
  loading: DvaLoadingState;
};

export default models;
