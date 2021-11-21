/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-14 15:07:20
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-21 18:11:20
 */
import React, {Component} from 'react';
import {View, FlatList, ListRenderItemInfo} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {RootStackNavigation} from '../../navigator';
import Carousel from './Carousel';
import Guess from './Guess';
import More from '@/components/More';
import End from '@/components/End';
import Empty from '@/components/Empty';
import ChannelItem from './ChannelItem';
import {IChannel} from '@/models/home';

const mapStateToProps = ({home, loading}: RootState) => ({
  carousels: home.carousels,
  channelList: home.channelList,
  hasMore: home.pagination.hasMore,
  loading: loading.effects['home/fetchChannelList'],
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

  // 加载更多
  onEndReached = () => {
    console.log('加载更多');
    const {dispatch, hasMore, loading} = this.props;
    if (!hasMore || loading) {
      return;
    }
    dispatch({
      type: 'home/fetchChannelList',
      payload: {
        loadMore: true,
      },
    });
  };

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

  get renderFooter() {
    const {channelList, loading, hasMore} = this.props;
    if (!hasMore) {
      return <End />;
    }

    if (loading && hasMore && channelList.length > 0) {
      return <More />;
    }

    return null;
  }

  get renderEmpty() {
    const {loading} = this.props;
    if (loading !== undefined) {
      return <Empty />;
    }
    return null;
  }

  render() {
    const {channelList, loading} = this.props;
    return (
      <FlatList
        data={channelList}
        renderItem={this.renderItem}
        ListHeaderComponent={this.ListHeaderComponent}
        keyExtractor={this.keyExtractor}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.2}
        refreshing={loading}
        ListFooterComponent={this.renderFooter}
        ListEmptyComponent={this.renderEmpty}
      />
    );
  }
}

export default connector(Home);
