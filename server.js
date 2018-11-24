/**
 * const prefixCls = 'style-130379';
 * const images = '/static/images';
 * @Author: czy0729
 * @Date: 2018-06-22 11:04:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-16 14:50:12
 * @Path m.benting.com.cn /server.js
 */
const express = require('express');
const next = require('next');
const mobxReact = require('mobx-react');
const appEnv = require('./env');
const paths = require('./paths');

mobxReact.useStaticRendering(true);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    /* ==================== static ==================== */
    // 使/static/out映射为项目根目录下的目录，存放例如robot.txt, icon, sw.js之类的文件
    server.use(
      express.static(`${__dirname}/static/out`, {
        maxage: dev ? '0' : '30d'
      })
    );

    // 开发环境不能暴露out，会另Next.js默认使用out里面的静态导出页面，导致不识别开发页面的代码
    if (!dev) {
      server.use(
        express.static(`${__dirname}/out`, {
          maxage: '30d'
        })
      );
    }

    /* ==================== router ==================== */
    paths.forEach(item => {
      server.get(item[0], (req, res) => {
        app.render(req, res, item[1], req.params);
      });
    });

    /* ==================== * ==================== */
    server.get('*', (req, res) => handle(req, res));

    server.listen(appEnv.__PORT__, err => {
      if (err) {
        throw err;
      }
      console.info(`> Ready on localhost:${appEnv.__PORT__}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

exports = paths;
