/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-14 15:07:20
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-21 14:17:40
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {RootStackNavigation} from '../../navigator';
import Carousel from './Carousel';

const mapStateToProps = ({home, loading}: RootState) => ({
  carousels: home.carousels,
  loading: loading.effects['home/fetchCarousels'],
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
}

class Home extends Component<IProps> {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchCarousels',
    });
  }

  render() {
    const {carousels} = this.props;
    return (
      <View>
        <Carousel data={carousels} />
      </View>
    );
  }
}

export default connector(Home);
