/**
 * const prefixCls = 'style-130379';
 * const images = '/static/images';
 * @Author: czy0729
 * @Date: 2018-06-22 11:04:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 03:28:49
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
    // #todo 补充注释, 关键代码
    server.use(
      express.static(`${__dirname}/static/out`, {
        maxage: dev ? '0' : '1d'
      })
    );

    // #todo 补充注释, 关键代码
    if (!dev) {
      server.use(
        express.static(`${__dirname}/out`, {
          maxage: dev ? '0' : '1d'
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
