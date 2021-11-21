/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-21 17:58:02
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-21 18:05:04
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class More extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>正在加载中。。。</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginVertical: 30,
    alignItems: 'center',
  },
  text: {
    // color: '#333',
    color: '#f00',
  },
});

export default More;
