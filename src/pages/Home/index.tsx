/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-14 15:07:20
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-21 17:09:24
 */
import React, {Component} from 'react';
import {View, FlatList, ListRenderItemInfo} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {RootStackNavigation} from '../../navigator';
import Carousel from './Carousel';
import Guess from './Guess';
import ChannelItem from './ChannelItem';
import {IChannel} from '@/models/home';

const mapStateToProps = ({home, loading}: RootState) => ({
  carousels: home.carousels,
  channelList: home.channelList,
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
    dispatch({
      type: 'home/fetchChannelList',
    });
  }

  onPress = (item: IChannel) => {
    console.log(item);
    // const {navigation} = this.props;
    // navigation.navigate('Album', {item});
  };
  keyExtractor = (item: IChannel) => {
    return item.id;
  };

  get ListHeaderComponent() {
    const {carousels} = this.props;
    return (
      <View>
        <Carousel data={carousels} />
        <Guess />
      </View>
    );
  }

  renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return <ChannelItem item={item} onPress={this.onPress} />;
  };

  render() {
    const {channelList} = this.props;
    return (
      <FlatList
        data={channelList}
        renderItem={this.renderItem}
        ListHeaderComponent={this.ListHeaderComponent}
        keyExtractor={item => `item-${item.id}`}
      />
    );
  }
}

export default connector(Home);
