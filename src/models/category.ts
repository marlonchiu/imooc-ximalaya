/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-12-04 15:01:42
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-12-04 21:37:43
 */
import axios from 'axios';
import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {storageLoad} from '@/config/storage';
import {RootState} from './index';

// 分类接口
const CATEGORY_URL = '/mock/11/bear/category';

export interface ICategory {
  id: string;
  name: string;
  classify?: string;
}

export interface CategoryModelState {
  isEdit: boolean; // 是否正在编辑
  myCategoryList: ICategory[];
  categoryList: ICategory[];
}

interface CategoryModelType extends Model {
  namespace: 'category';
  state: CategoryModelState;
  reducers: {
    setState: Reducer<CategoryModelState>;
  };
  effects: {
    loadDataForStorage: Effect;
    toggleEdit: Effect;
  };
  subscriptions: SubscriptionsMapObject;
}

const initialState: CategoryModelState = {
  isEdit: false,
  myCategoryList: [
    {
      id: 'home',
      name: '推荐',
    },
    {
      id: 'vip',
      name: 'Vip',
    },
  ],
  categoryList: [],
};

const categoryModel: CategoryModelType = {
  namespace: 'category',
  state: initialState,
  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *loadDataForStorage(_, {call, put}) {
      // 从 storage 中获取数据
      const myCategoryList: ICategory[] = yield call(storageLoad, {
        key: 'myCategoryList',
      });
      const categoryList: ICategory[] = yield call(storageLoad, {
        key: 'categoryList',
      });
      // 发起action,将数据保存到state
      // const {data} = yield call(axios.get, CATEGORY_URL);
      if (myCategoryList) {
        yield put({
          type: 'setState',
          payload: {
            myCategoryList,
            categoryList,
          },
        });
      } else {
        yield put({
          type: 'setState',
          payload: {
            categoryList,
          },
        });
      }
    },
    *toggleEdit(_, {put, select}) {
      const category: CategoryModelState = yield select(
        (state: RootState) => state.category,
      );
      yield put({
        type: 'setState',
        payload: {
          isEdit: !category.isEdit,
        },
      });
      // if (category.isEdit) {
      //   storage.save({
      //     key: 'categoryList',
      //     data: category.categoryList,
      //   });
      //   storage.save({
      //     key: 'myCategoryList',
      //     data: category.myCategoryList,
      //   });
      // }
    },
  },
  subscriptions: {
    setup({dispatch}) {
      dispatch({type: 'loadDataForStorage'});
    },
    asyncStorage() {
      storage.sync.myCategoryList = async () => {
        return null;
      };
      storage.sync.categoryList = async () => {
        const {data} = await axios.get(CATEGORY_URL);
        return data;
      };
    },
  },
};

export default categoryModel;
