/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-21 17:57:26
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-21 18:05:07
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class End extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>--我是有底线的--</Text>
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
    // color: '#eee',
    color: '#f00',
  },
});

export default End;
