/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-17 18:38:25
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-18 17:39:43
 */
import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';

export interface HomeState {
  num: number;
}

// const action = {
//   type: 'add'
// }

interface HomeModel extends Model {
  namespace: 'home';
  state: {
    num: number;
  };
  reducers: {
    add: Reducer<HomeState>;
  };
  effects: {
    asyncAdd: Effect;
  };
}

const initState = {
  num: 0,
};

function delay(timeout: number) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const homeModel: HomeModel = {
  namespace: 'home',
  state: initState,
  reducers: {
    add(state = initState, {payload}) {
      return {
        ...state,
        num: state.num + payload.num,
      };
    },
  },
  effects: {
    *asyncAdd({payload}, {call, put}) {
      yield call(delay, 3000);
      yield put({
        type: 'add',
        payload,
      });
    },
  },
};

export default homeModel;
