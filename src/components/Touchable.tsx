/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-21 15:15:11
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-21 15:17:13
 */
import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';

const Touchable: React.FC<TouchableOpacityProps> = React.memo(props => {
  const {style, disabled, ...rest} = props;
  const disabledStyle = disabled && styles.disabled;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[style, disabledStyle]}
      activeOpacity={0.8}
      {...rest}
    />
  );
});

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});

export default Touchable;
