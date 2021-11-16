/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-14 15:07:20
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-16 16:08:29
 */
import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import {RootStackNavigation} from '../navigator';

interface IProps {
  navigation: RootStackNavigation;
}

class Account extends Component<IProps> {
  _onPressButton = () => {
    const {navigation} = this.props;
    navigation.navigate('Detail', {
      id: 123,
    });
  };
  render() {
    return (
      <View>
        <Text>Account</Text>
        <Button title="跳转到详情页" onPress={this._onPressButton}></Button>
      </View>
    );
  }
}

export default Account;
