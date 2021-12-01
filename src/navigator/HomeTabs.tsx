/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-19 10:50:02
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-12-01 09:41:20
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home/index';
import TopTabBarWrapper from '@/pages/views/TopTabBarWrapper';

const Tab = createMaterialTopTabNavigator();

class HomeTabs extends React.Component {
  renderTabBar = (props: MaterialTopTabBarProps) => {
    return <TopTabBarWrapper {...props} />;
  };

  render() {
    return (
      <Tab.Navigator
        lazy
        tabBar={this.renderTabBar}
        sceneContainerStyle={styles.sceneContainer}
        tabBarOptions={{
          scrollEnabled: true,
          tabStyle: {
            width: 80,
            padding: 0,
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
          name="Home"
          component={Home}
          options={{tabBarLabel: '推荐'}}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: 'transparent',
  },
});

export default HomeTabs;
