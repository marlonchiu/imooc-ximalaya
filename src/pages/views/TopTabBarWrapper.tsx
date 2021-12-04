/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-30 17:14:05
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-12-04 14:24:08
 */
import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Touchable from '@/components/Touchable';
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
// import LinearGradient from 'react-native-linear-gradient';
import LinearAnimatedGradientTransition from 'react-native-linear-animated-gradient-transition';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import slideHeight from '@/pages/Home/Carousel';
import {viewportHeight} from '@/utils/index';

const mapStateToProps = ({home}: RootState) => {
  let carouselList = home.carousels;
  let activeIndex = home.activeSlide;
  return {
    activeColors:
      carouselList && carouselList.length > 0
        ? carouselList[activeIndex].colors
        : undefined,
    scrollValue: home.scrollValue,
  };
};
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

type IProps = MaterialTopTabBarProps & ModelState;

class TopTabBarWrapper extends React.Component<IProps> {
  state = {
    showLinears: true, // 是否显示渐变色组件颜色
  };

  listenerId: string = '';

  componentDidMount() {
    const {scrollValue} = this.props;
    if (scrollValue) {
      this.listenerId = scrollValue.addListener(this.animatedListener);
    }
  }

  animatedListener = ({value}: {value: number}) => {
    const {showLinears} = this.state;
    let newShowLinears = true;
    if (value > viewportHeight * 0.26) {
      newShowLinears = false;
    }
    if (showLinears !== newShowLinears) {
      this.setState({
        showLinears: newShowLinears,
      });
    }
  };

  componentDidUpdate(prevProps: IProps) {
    const {scrollValue} = this.props;
    if (scrollValue && prevProps.scrollValue !== scrollValue) {
      scrollValue.removeListener && scrollValue.removeListener(this.listenerId);
      this.listenerId = scrollValue.addListener(this.animatedListener);
    }
  }

  goSortPage = () => {
    const {navigation} = this.props;
    navigation.navigate('Category');
  };

  goHistory = () => {
    const {navigation} = this.props;
    navigation.navigate('History');
  };

  get gradient() {
    const {showLinears} = this.state;
    let {activeColors = ['#ccc', '#e2e2e2']} = this.props;
    if (showLinears) {
      return (
        <LinearAnimatedGradientTransition
          colors={activeColors}
          style={[styles.gradient]}
        />
      );
    } else {
      return null;
    }
  }

  render() {
    const {showLinears} = this.state;
    let {activeTintColor, inactiveTintColor, indicatorStyle} = this.props;
    let textStyle = styles.text;
    if (!showLinears) {
      activeTintColor = '#000';
      inactiveTintColor = '#333';
      if (indicatorStyle) {
        indicatorStyle = StyleSheet.compose(
          indicatorStyle,
          styles.blackBgColor,
        );
      }
    } else {
      indicatorStyle = StyleSheet.compose(indicatorStyle, styles.whiteBgColor);
    }

    return (
      <View style={styles.container}>
        {this.gradient}
        <View style={styles.topTabBarView}>
          <View style={styles.tabBar}>
            <MaterialTopTabBar
              {...this.props}
              indicatorStyle={indicatorStyle}
              activeTintColor={activeTintColor}
              inactiveTintColor={inactiveTintColor}
              style={{backgroundColor: 'transparent'}}
            />
          </View>
          <Touchable style={styles.sortBtn} onPress={this.goSortPage}>
            <Text style={textStyle}>分类</Text>
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
  whiteText: {
    color: '#fff',
  },
  blackText: {
    color: '#333',
  },
  whiteBgColor: {
    backgroundColor: '#fff',
  },
  blackBgColor: {
    backgroundColor: '#333',
  },
});

export default connector(TopTabBarWrapper);
