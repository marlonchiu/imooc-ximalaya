/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-14 15:10:18
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-16 18:49:16
 */
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '@/navigator/index';

interface IProps {
  route: RouteProp<RootStackParamList, 'Detail'>;
}

class Detail extends Component<IProps> {
  render() {
    const {route} = this.props;
    return (
      <View>
        <Text>Detail</Text>
        <Text>{route.params.id}</Text>
      </View>
    );
  }
}

export default Detail;
