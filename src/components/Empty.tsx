/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-21 18:06:01
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-21 18:10:19
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Empty extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>暂无数据！</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: 'center',
  },
  text: {
    color: '#666',
  },
});

export default Empty;
