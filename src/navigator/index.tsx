/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-14 15:11:07
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-12-04 22:29:05
 */
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import Category from '@/pages/Category';
import Detail from '@/pages/Detail';
import {Platform, StatusBar, StyleSheet} from 'react-native';

export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Category: undefined;
  Detail: {
    id: number;
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

class Navigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          headerMode="float"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            // 跳转动画从左往右
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            // 开启手势
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            ...Platform.select({
              android: {
                headerStatusBarHeight: StatusBar.currentHeight,
              },
            }),
            headerBackTitleVisible: false,
            headerTintColor: '#333',
            // 标题栏的样式
            headerStyle: {
              ...Platform.select({
                android: {
                  elevation: 0,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                },
              }),
            },
          }}>
          <Stack.Screen
            name="BottomTabs"
            options={{
              headerTitleAlign: 'center',
              headerTitle: '首页',
            }}
            component={BottomTabs}
          />
          <Stack.Screen
            name="Category"
            options={{
              // headerTitleAlign: 'center',
              headerTitle: '分类',
            }}
            component={Category}
          />
          <Stack.Screen
            name="Detail"
            options={{headerTitle: '详情'}}
            component={Detail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;
