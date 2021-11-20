/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-13 23:42:53
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-20 17:29:40
 */
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Navigator from '@/navigator/index';
import store from '@/config/dva';
import {StatusBar} from 'react-native';

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
      </Provider>
    );
  }
}
