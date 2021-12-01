/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-30 17:14:05
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-12-01 10:52:35
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
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';

const mapStateToProps = ({home}: RootState) => {
  let carouselList = home.carousels;
  let activeIndex = home.activeSlide;
  return {
    activeColors:
      carouselList && carouselList.length > 0
        ? carouselList[activeIndex].colors
        : undefined,
  };
};
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

type IProps = MaterialTopTabBarProps & ModelState;

class TopTabBarWrapper extends React.Component<IProps> {
  goSortPage = () => {
    const {navigation} = this.props;
    navigation.navigate('Category');
  };

  goHistory = () => {
    const {navigation} = this.props;
    navigation.navigate('History');
  };

  get gradient() {
    let {activeColors = ['#ccc', '#e2e2e2']} = this.props;

    return <LinearGradient colors={activeColors} style={[styles.gradient]} />;
  }

  render() {
    let textStyle = styles.text;

    return (
      <View style={styles.container}>
        {this.gradient}
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
    height: 260,
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

export default connector(TopTabBarWrapper);
