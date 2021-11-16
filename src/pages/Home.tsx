/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-14 15:07:20
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-16 18:50:27
 */
import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import {RootStackNavigation} from '../navigator';

interface IProps {
  navigation: RootStackNavigation;
}

class Home extends Component<IProps> {
  _onPressButton = () => {
    const {navigation} = this.props;
    navigation.navigate('Detail', {
      id: 123,
    });
  };
  render() {
    return (
      <View>
        <Text>Home</Text>
        <Button title="跳转到详情页" onPress={this._onPressButton} />
      </View>
    );
  }
}

export default Home;
