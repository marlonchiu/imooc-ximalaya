/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-19 10:50:02
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-20 17:49:54
 */
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home/index';

const Tab = createMaterialTopTabNavigator();

class HomeTabs extends React.Component {
  render() {
    return (
      <Tab.Navigator
        lazy
        tabBarOptions={{
          scrollEnabled: true,
          tabStyle: {
            width: 80,
          },
          indicatorStyle: {
            height: 4,
            width: 20,
            marginLeft: 30,
            borderRadius: 2,
            backgroundColor: '#f86442',
          },
          activeTintColor: '#f86442',
          inactiveTintColor: '#333',
        }}>
        <Tab.Screen
          name="home1"
          component={Home}
          options={{tabBarLabel: '推荐'}}
        />
      </Tab.Navigator>
    );
  }
}

export default HomeTabs;
