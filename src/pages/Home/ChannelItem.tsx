/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-21 16:30:12
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-21 17:04:48
 */
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from '@/assets/iconfont/index';
import Touchable from '@/components/Touchable';
import {IChannel} from '@/models/home';

interface IProps {
  item: IChannel;
  onPress: (item: IChannel) => void;
}

class ChannelItem extends React.PureComponent<IProps> {
  onPress = () => {
    const {item, onPress} = this.props;
    if (typeof onPress === 'function') {
      onPress(item);
    }
  };

  render() {
    const {item} = this.props;
    return (
      <Touchable onPress={this.onPress} style={styles.container}>
        <View style={styles.itemContainer}>
          <Image source={{uri: item.image}} style={styles.image} />
          <View style={styles.rightContainer}>
            <View style={styles.topView}>
              <Text style={styles.titleText} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.remarkText} numberOfLines={2}>
                {item.remark}
              </Text>
            </View>

            <View style={styles.bottomView}>
              <View style={styles.playedView}>
                <Icon name="icon-V" size={14} color="#f86442" />
                <Text style={styles.played}>{item.played}</Text>
              </View>
              <View style={styles.playingView}>
                <Icon name="icon-shengyin" size={14} color="#f86442" />
                <Text style={styles.playing}>{item.playing}</Text>
              </View>
            </View>
          </View>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    // 安卓投影效果设置
    elevation: 80,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#dedede',
  },
  rightContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    marginBottom: 10,
  },
  remarkText: {
    backgroundColor: '#f8f8f9',
    padding: 5,
    // marginBottom: 5,
  },
  topView: {
    flex: 1,
  },
  bottomView: {
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  playedView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  played: {
    marginLeft: 5,
  },
  playingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playing: {
    marginLeft: 5,
  },
});

export default ChannelItem;
