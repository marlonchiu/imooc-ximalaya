/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-20 17:53:35
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-12-01 14:30:06
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import SnapCarousel, {
  Pagination,
  ParallaxImage,
  AdditionalParallaxProps,
} from 'react-native-snap-carousel';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {ICarousel} from '@/models/home';
import {viewportWidth, wp, hp} from '@/utils/index';

// 屏幕宽度
const sliderWidth = viewportWidth;
// 图片宽度
const slideWidth = wp(90);
export const slideHeight = hp(26);
const itemHorizontalMargin = wp(2);
// 轮播图每个item 宽度
const itemWidth = slideWidth + itemHorizontalMargin * 2;

// const data = [
//   'https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF',
//   'https://tenfei03.cfp.cn/creative/vcg/800/new/VCG41N1209433139.jpg',
//   'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG41N1208988499.jpg',
//   'https://alifei04.cfp.cn/creative/vcg/800/new/VCG41N1222716030.jpg',
//   'https://alifei02.cfp.cn/creative/vcg/800/new/VCG41N1146433745.jpg',
//   'https://tenfei02.cfp.cn/creative/vcg/800/new/VCG41N1208988499.jpg',
// ];

const mapStateToProps = ({home}: RootState) => ({
  carousels: home.carousels,
  activeSlide: home.activeSlide,
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class Carousel extends React.Component<IProps> {
  state = {
    activeSlide: 0,
  };

  onSnapToItem = (index: number) => {
    const {dispatch} = this.props;
    if (typeof index !== 'number') {
      return;
    }

    dispatch({
      type: 'home/setState',
      payload: {
        activeSlide: index,
      },
    });
  };

  renderItem = (
    {item}: {item: ICarousel},
    parallaxProps?: AdditionalParallaxProps,
  ) => {
    return (
      <ParallaxImage
        source={{uri: item.image}}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor="rgba(0, 0, 0, 0.25)"
        {...parallaxProps}
      />
    );
  };

  get pagination() {
    const {carousels, activeSlide} = this.props;
    return (
      <View style={styles.paginationWrapper}>
        <Pagination
          dotsLength={carousels.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotContainerStyle={styles.dotContainer}
          dotStyle={styles.dot}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          inactiveDotScale={0.7}
          inactiveDotOpacity={0.4}
        />
      </View>
    );
  }

  render() {
    const {carousels} = this.props;
    return (
      <View>
        <SnapCarousel
          data={carousels}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages
          onSnapToItem={this.onSnapToItem}
          loop
          autoplay
        />
        {this.pagination}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    width: itemWidth,
    height: slideHeight,
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  paginationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    top: -30,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dotContainer: {
    marginHorizontal: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
});

export default connector(Carousel);
