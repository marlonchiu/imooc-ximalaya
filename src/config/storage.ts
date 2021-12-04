/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-12-04 14:54:07
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-12-04 15:00:38
 */

import Storage, {LoadParams} from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storage = new Storage({
  // maximum capacity, default 1000
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  // 数据过期时间，默认7天（1000 * 3600 * 24 * 7 毫秒），设为null则永不过期
  defaultExpires: 1000 * 3600 * 24 * 7,

  // cache data in the memory. default is true.
  // 读写时在内存中缓存数据。默认启用
  // 你可以在构造函数这里就写好sync的方法 // 或是在任何时候，直接对storage.sync进行赋值修改 // 或是写到另一个文件里，这里require引入
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  sync: {
    // we'll talk about the details later.
  },
});

// 读取
const storageLoad = (params: LoadParams) => {
  return new Promise((resolve, reject) => {
    storage
      .load(params)
      .then(ret => {
        // 如果找到数据，则在then方法中返回
        // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
        // 你只能在then这个方法内继续处理ret数据
        // 而不能在then以外处理
        // 也没有办法“变成”同步返回
        // 你也可以使用“看似”同步的async/await语法
        resolve(ret);
      })
      .catch(err => {
        // 如果没有找到数据且没有sync方法，
        // 或者有其他异常，则在catch中返回
        console.log(err);
        reject(err);
      });
  });
};

export {storageLoad};

export default storage;
