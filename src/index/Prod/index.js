/**
 * const prefixCls = 'style-324999';
 * const images = '/static/images/src/index/Prod';
 * @Author: czy0729
 * @Date: 2018-10-28 18:56:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 19:09:20
 * @Path bt_mb_new /src/index/Prod/index.js
 */
import React from 'react';
import { Grid } from 'antd-mobile';
import { Layout } from '@_';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import {
  API,
  NEW_API,
  IMG_API,
  WSS,
  WEB_BT,
  WEB_NIDO,
  rootDS,
  eventDS
} from './ds';

export default class Prod extends React.Component {
  componentDidMount() {
    Const.__API__ = API;
    Const.__NEW_API__ = NEW_API;
    Const.__IMG_API__ = IMG_API;
    Const.__WSS__ = WSS;
    Const.__WEB_BT__ = WEB_BT;
    Const.__WEB_NIDO__ = WEB_NIDO;
    Api.initApis();

    if (Const.__CLIENT__) {
      delete window.Stores['/'];
    }
  }

  render() {
    return (
      <Layout title="正式环境数据" hideBack>
        <Grid
          className="mt-d"
          data={rootDS}
          onClick={el => {
            if (el.href) {
              Utils.router.push(el.href, el.as);
            }
          }}
        />
        <Grid
          className="mt-d"
          data={eventDS}
          onClick={el => {
            if (el.href) {
              Utils.router.push(el.href, el.as);
            }
          }}
        />
      </Layout>
    );
  }
}
