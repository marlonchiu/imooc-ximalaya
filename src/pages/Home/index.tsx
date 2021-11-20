/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-14 15:07:20
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-20 17:47:01
 */
import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {RootStackNavigation} from '../../navigator';
import Carousel from './Carousel';

const mapStateToProps = ({home, loading}: RootState) => ({
  num: home.num,
  loading: loading.effects['home/asyncAdd'],
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
}

class Home extends Component<IProps> {
  _onPressButton = () => {
    const {navigation} = this.props;
    navigation.navigate('Detail', {
      id: 123,
    });
  };
  _handleAdd = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/add',
      payload: {
        num: 10,
      },
    });
  };
  _handleAsyncAdd = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/asyncAdd',
      payload: {
        num: 5,
      },
    });
  };
  render() {
    const {num, loading} = this.props;
    return (
      <View>
        <Text>Home{num}</Text>
        <Text>{loading ? '异步计算中...' : ''}</Text>
        <Button title="同步添加" onPress={this._handleAdd} />
        <Button title="异步添加" onPress={this._handleAsyncAdd} />
        <Button title="跳转到详情页" onPress={this._onPressButton} />
        <Carousel />
      </View>
    );
  }
}

export default connector(Home);
