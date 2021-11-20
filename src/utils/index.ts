/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-20 18:18:01
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-20 18:21:20
 */
import {Dimensions} from 'react-native';

// 获取当前屏幕的宽高
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

// 根据百分比获取宽度
function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

// 根据百分比获取高度
function hp(percentage: number) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

export {viewportWidth, viewportHeight, wp, hp};
