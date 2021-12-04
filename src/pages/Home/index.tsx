/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-14 15:07:20
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-12-04 15:49:38
 */
import React, {Component} from 'react';
import {
  View,
  FlatList,
  ListRenderItemInfo,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  StyleSheet,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {RootStackNavigation} from '@/navigator/index';
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
  scrollValue: home.scrollValue,
  hasMore: home.pagination.hasMore,
  loading: loading.effects['home/fetchChannelList'],
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
}

interface IState {
  refreshing: boolean;
}

class Home extends Component<IProps, IState> {
  state = {
    refreshing: false,
  };

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

  onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {scrollValue} = this.props;
    console.log('scrollValue: ', scrollValue);
    Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            y: scrollValue,
          },
        },
      },
    ])(e);
  };

  onPress = (item: IChannel) => {
    console.log(item);
    // const {navigation} = this.props;
    // navigation.navigate('Album', {item});
  };

  keyExtractor = (item: IChannel) => {
    return item.id;
  };

  // 刷新
  onRefresh = () => {
    // 1.修改刷新状态为true
    this.setState({
      refreshing: true,
    });
    // 2.获取数据
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchChannelList',
      callback: () => {
        // 3.修改刷新状态为false
        this.setState({
          refreshing: false,
        });
      },
    });
  };

  get ListHeaderComponent() {
    return (
      <View>
        <Carousel />
        <View style={styles.guessBg}>
          <Guess />
        </View>
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
    const {channelList} = this.props;
    const {refreshing} = this.state;
    return (
      <FlatList
        data={channelList}
        renderItem={this.renderItem}
        ListHeaderComponent={this.ListHeaderComponent}
        keyExtractor={this.keyExtractor}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.2}
        refreshing={refreshing}
        onRefresh={this.onRefresh}
        ListFooterComponent={this.renderFooter}
        ListEmptyComponent={this.renderEmpty}
        onScroll={this.onScroll}
      />
    );
  }
}

const styles = StyleSheet.create({
  guessBg: {
    backgroundColor: '#fff',
  },
});
export default connector(Home);
