/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-14 15:07:20
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-17 09:12:52
 */
import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import {RootStackNavigation} from '../navigator';

interface IProps {
  navigation: RootStackNavigation;
}

class Found extends Component<IProps> {
  _onPressButton = () => {
    const {navigation} = this.props;
    navigation.navigate('Detail', {
      id: 123,
    });
  };
  render() {
    return (
      <View>
        <Text>Found</Text>
        <Button title="跳转到详情页" onPress={this._onPressButton} />
      </View>
    );
  }
}

export default Found;
