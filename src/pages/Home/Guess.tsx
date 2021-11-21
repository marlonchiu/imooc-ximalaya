/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-21 14:46:38
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-21 15:53:13
 */

import React from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {IGuess} from '@/models/home';
import Touchable from '@/components/Touchable';
import Icon from '@/assets/iconfont/index';

const mapStateToProps = ({home, loading}: RootState) => ({
  guessList: home.guessList,
  loading: loading.effects['home/fetchGuessList'],
});

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

class Guess extends React.Component<ModelState> {
  componentDidMount = () => {
    this.fetch();
  };

  changeBatch = () => {
    this.fetch();
  };

  fetch = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchGuessList',
    });
  };

  renderItem = ({item}: {item: IGuess}) => {
    return (
      <Touchable
        style={styles.itemContainer}
        onPress={() => {
          alert('点击');
        }}>
        <Image source={{uri: item.image}} style={styles.thumbnail} />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </Touchable>
    );
  };

  render() {
    const {guessList} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Icon name="icon-qunfengcainixihuanxian" />
            <Text style={styles.likeTitle}>猜你喜欢</Text>
          </View>
          <View style={styles.headerLeft}>
            <Text style={styles.moreTitle}>更多</Text>
            <Icon name="icon-more" />
          </View>
        </View>
        <FlatList
          numColumns={3}
          data={guessList}
          renderItem={this.renderItem}
          style={styles.list}
        />
        <Touchable onPress={this.changeBatch} style={styles.changeBatch}>
          <Text>
            <Icon name="icon-huanyipi" size={14} color="red" /> 换一批
          </Text>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    // padding: 2,
    margin: 16,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowColor: '#ccc',
    // 注意：这一句是可以让安卓拥有灰色阴影
    elevation: 4,
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#efefef',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerLeft: {
    flexDirection: 'row',
  },
  likeTitle: {
    marginLeft: 5,
    color: '#333333',
  },
  moreTitle: {
    color: '#6f6f6f',
  },
  list: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  itemContainer: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 5,
  },
  title: {
    // textAlign: "center"
  },
  thumbnail: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#dedede',
  },

  changeBatch: {
    padding: 10,
    alignItems: 'center',
  },
});

export default connector(Guess);
