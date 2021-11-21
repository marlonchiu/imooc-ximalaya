/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-17 18:38:25
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-21 15:07:45
 */
import axios from 'axios';
import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';

// 轮播图
const CAROUSEL_URL = '/mock/11/bear/carousel';
// 猜你喜欢
const GUESS_URL = '/mock/11/bear/guess';

export interface ICarousel {
  id: number;
  image: string;
  colors: [string, string];
}

export interface IGuess {
  id: number;
  title: string;
  image: string;
}

export interface HomeModelState {
  carousels: ICarousel[];
  guessList: IGuess[];
}

interface HomeModelType extends Model {
  namespace: string;
  state: HomeModelState;
  reducers: {
    setState: Reducer<HomeModelState>;
  };
  effects: {
    fetchCarousels: Effect;
    fetchGuessList: Effect;
  };
}

const initialState: HomeModelState = {
  carousels: [],
  guessList: [],
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
    // 获取猜你喜欢数据列表
    *fetchGuessList(_, {call, put}) {
      const {data} = yield call(axios.get, GUESS_URL);
      yield put({
        type: 'setState',
        payload: {
          guessList: data,
        },
      });
    },
  },
};

export default HomeModel;
