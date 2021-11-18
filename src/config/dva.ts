/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-17 18:38:13
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-17 19:00:49
 */
import {create} from 'dva-core-ts';
import models from '@/models/index';

// 1.创建实例
const app = create();
// 2.加载model对象
models.forEach(model => {
  app.model(model);
});
// 3.启动dva
app.start();
// 4. 导出dva 资源
export default app._store;
