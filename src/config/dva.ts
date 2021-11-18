/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-17 18:38:13
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-18 17:52:19
 */
import {create} from 'dva-core-ts';
import createLoading from 'dva-loading-ts';
import models from '@/models/index';

// 1.创建实例
const app = create();
// 2.加载model对象
models.forEach(model => {
  app.model(model);
});
app.use(createLoading());
// 3.启动dva
app.start();
// 4. 导出dva 资源
export default app._store;
