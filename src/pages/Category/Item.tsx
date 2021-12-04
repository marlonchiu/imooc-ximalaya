/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-12-04 21:04:43
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-12-04 21:11:19
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ICategory} from '@/models/category';
import {viewportWidth} from '@/utils/index';

const parentWidth = viewportWidth - 10;
const childrenWidth = parentWidth / 4;

interface IProps {
  data: ICategory;
}

class Item extends React.Component<IProps> {
  render() {
    const {data} = this.props;
    return (
      <View key={data.id} style={styles.itemWrap}>
        <View style={styles.item}>
          <Text>{data.name}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemWrap: {
    width: childrenWidth,
    height: 48,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    margin: 4,
  },
});

export default Item;
