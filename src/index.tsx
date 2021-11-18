/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-13 23:42:53
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-17 09:13:44
 */
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import Navigator from '@/navigator/index';
import store from '@/config/dva';

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
};
