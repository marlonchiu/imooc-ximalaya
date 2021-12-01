/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-30 17:14:05
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-12-01 09:50:27
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Touchable from '@/components/Touchable';
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import LinearGradient from 'react-native-linear-gradient';

interface IProps extends MaterialTopTabBarProps {}

class TopTabBarWrapper extends React.Component<IProps> {
  goSortPage = () => {
    const {navigation} = this.props;
    navigation.navigate('Category');
  };

  goHistory = () => {
    const {navigation} = this.props;
    navigation.navigate('History');
  };

  render() {
    let textStyle = styles.text;

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#4c669f', '#192f6a']}
          style={styles.gradient}
        />
        <View style={styles.topTabBarView}>
          <View style={styles.tabBar}>
            <MaterialTopTabBar
              {...this.props}
              style={{backgroundColor: 'transparent'}}
            />
          </View>
          <Touchable style={styles.sortBtn} onPress={this.goSortPage}>
            <Text>分类</Text>
          </Touchable>
        </View>

        <View style={styles.searchBar}>
          <Touchable style={styles.search}>
            <Text style={textStyle}>搜索按钮</Text>
          </Touchable>
          <Touchable style={styles.history} onPress={this.goHistory}>
            <Text style={textStyle}>历史记录</Text>
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: 560,
    paddingTop: getStatusBarHeight(),
  },
  topTabBarView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: getStatusBarHeight(),
  },
  tabBar: {
    flex: 1,
    overflow: 'hidden',
    // elevation: 0,
    // backgroundColor: 'transparent',
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
  search: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 12,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  history: {
    marginLeft: 24,
  },
  sortBtn: {
    paddingHorizontal: 8,
    borderLeftColor: '#eee',
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  text: {
    color: '#fff',
  },
  blackText: {
    color: '#333',
  },
});

export default TopTabBarWrapper;
