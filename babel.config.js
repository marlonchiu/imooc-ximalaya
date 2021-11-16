/*
 * @Description:
 * @version:
 * @Author: jdzhao@iflytek.com
 * @Date: 2021-11-13 22:33:24
 * @LastEditors: jdzhao@iflytek.com
 * @LastEditTime: 2021-11-13 23:43:55
 */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/assets': './src/assets',
          '@/components': './src/components',
          '@/config': './src/config',
          '@/models': './src/models',
          '@/navigator': './src/navigator',
          '@/pages': './src/pages',
          '@/utils': './src/utils',
        },
      },
    ],
  ],
};
