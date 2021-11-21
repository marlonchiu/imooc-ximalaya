/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-17 18:38:25
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-21 14:15:21
 */
import axios from 'axios';
import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';

const CAROUSEL_URL = '/mock/11/bear/carousel';

export interface ICarousel {
  id: number;
  image: string;
  colors: [string, string];
}

export interface HomeModelState {
  carousels: ICarousel[];
}

interface HomeModelType extends Model {
  namespace: string;
  state: HomeModelState;
  reducers: {
    setState: Reducer<HomeModelState>;
  };
  effects: {
    fetchCarousels: Effect;
  };
}

const initialState: HomeModelState = {
  carousels: [],
};

// 首页模块的model
const HomeModel: HomeModelType = {
  namespace: 'home',
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
    // 获取轮播图数据列表
    *fetchCarousels(_, {call, put}) {
      const {data} = yield call(axios.get, CAROUSEL_URL);
      yield put({
        type: 'setState',
        payload: {
          carousels: data,
        },
      });
    },
  },
};

export default HomeModel;
