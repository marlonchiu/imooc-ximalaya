/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-12-04 15:39:10
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-12-04 21:15:43
 */
import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import _ from 'lodash';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {ICategory} from '@/models/category';
import Item from './Item';

const mapStateToProps = ({category}: RootState) => ({
  myCategoryList: category.myCategoryList,
  categoryList: category.categoryList,
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

interface IState {
  myCategoryList: ICategory[];
}

class Category extends React.Component<IProps, IState> {
  state = {
    myCategoryList: this.props.myCategoryList,
  };

  renderItem = (item: ICategory, index: number) => {
    return <Item data={item} />;
  };
  render() {
    const {myCategoryList} = this.state;
    const {categoryList} = this.props;
    const classifyGroup = _.groupBy(
      categoryList,
      (item: ICategory) => item.classify,
    );

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.classifyName}>
          我的分类
          <Text style={styles.tips}>长按可拖动顺序</Text>
        </Text>
        <View style={styles.classifyWrap}>
          {myCategoryList.map(this.renderItem)}
        </View>
        <View>
          {Object.keys(classifyGroup).map(classify => {
            return (
              <View key={classify}>
                <Text style={styles.classifyName}>{classify}</Text>
                <View style={styles.classifyWrap}>
                  {classifyGroup[classify].map(this.renderItem)}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f6f6',
  },
  contentContainer: {
    padding: 15,
  },
  classifyName: {
    fontSize: 16,
    marginTop: 14,
    marginBottom: 8,
    marginLeft: 10,
  },
  tips: {
    color: '#999999',
    fontSize: 16,
    paddingLeft: 12,
  },
  classifyWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    // marginHorizontal: -4,
  },
});

export default connector(Category);
