/**
 * const prefixCls = 'style-185256';
 * const images = '/static/images';
 * @Author: czy0729
 * @Date: 2018-10-26 16:34:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 19:45:30
 * @Path bt_mb_new /next.config.js
 */
const appEnv = require('./env');
const paths = require('./paths');

const filterMap = {};
paths.forEach(item => {
  if (item[0].indexOf(':id?') === -1 && item[0].indexOf(':id') !== -1) {
    filterMap[item[1]] = true;
  }
});

const config = {
  // assetPrefix: isProd ? '//localhost:8000/' : '',
  exportPathMap(defaultPathMap) {
    const pathMap = {};

    Object.entries(defaultPathMap).forEach(([key, value]) => {
      if (!filterMap[key]) {
        pathMap[key] = value;
      }
    });

    return pathMap;
  }

  // webpack: (config, { dev }) => {
  //   if (dev) {
  //     config.module.rules.push({
  //       test: /\.js$/,
  //       enforce: 'pre',
  //       exclude: /node_modules/,
  //       loader: 'eslint-loader',
  //       options: {
  //         emitWarning: dev
  //       }
  //     });
  //   }

  //   return config;
  // }
};

const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
  config.distDir = 'build';
}

console.info(`========== env: ${appEnv.__RELEASE_ENV__} ==========`);

module.exports = config;
