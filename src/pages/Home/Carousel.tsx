/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-20 17:53:35
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-20 18:50:02
 */
import React from 'react';
import SnapCarousel, {
  AdditionalParallaxProps,
} from 'react-native-snap-carousel';
import {viewportWidth, viewportHeight, wp, hp} from '@/utils/index';
import {StyleSheet, Image} from 'react-native';

// 屏幕宽度
const sliderWidth = viewportWidth;
// 图片宽度
const sideWidth = wp(90);
const sideHeight = hp(26);
// 轮播图每个item 宽度
const itemWidth = sideWidth + wp(2) * 2;

const data = [
  'https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF',
  'https://tenfei03.cfp.cn/creative/vcg/800/new/VCG41N1209433139.jpg',
  'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG41N1208988499.jpg',
  'https://alifei04.cfp.cn/creative/vcg/800/new/VCG41N1222716030.jpg',
  'https://alifei02.cfp.cn/creative/vcg/800/new/VCG41N1146433745.jpg',
  'https://tenfei02.cfp.cn/creative/vcg/800/new/VCG41N1208988499.jpg',
];

class Carousel extends React.Component {
  renderItem = (
    {item}: {item: string},
  ) => {
    return <Image source={{uri: item}} style={styles.image} />;
  };

  render() {
    return (
      <SnapCarousel
        data={data}
        renderItem={this.renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: itemWidth,
    height: sideHeight,
  },
});

export default Carousel;
