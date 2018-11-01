/**
 * const prefixCls = 'style-530072';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-01 18:06:03
 * @Last Modified by:   lyz0720
 * @Last Modified time: 2018-11-01 18:06:03
 * @Path bt_mb_new \src\person\help\Nido\_Top.js.git
 */
import React from 'react';
import { Link } from '@components';
import Styles from '@styles';
import { images } from './ds';

const prefixCls = 'style-530072';

const _Top = () => (
  <div className={prefixCls}>
    <div className="wrap-qr t-c">
      <img className="img-qr" src={`${images}/qr.jpg`} alt="" />
      <p className="t-28 l-40 mt-40">长按二维码关注【灵动小区】微信公众号</p>
    </div>
    <div className="wrap-tel">
      <span className="t-34 l-48 t-sub">灵动客服联系电话</span>
      <Link className="t-34 l-48 pull-right" href="tel:020-39186539">
        020-39186539
      </Link>
    </div>

    <style jsx>{`
      .style-530072 {
      }
      .wrap-qr {
        margin-top: -1rem;
        padding: 1.64rem 0 0.64rem;
        background: ${Styles.color_main} url(${images}/top.png);
      }
      .img-qr {
        width: 4rem;
        height: 4rem;
        border-radius: 0.04rem;
      }
      .wrap-tel {
        padding: 0.16rem ${Styles.wind};
        background: ${Styles.color_theme};
      }
    `}</style>
  </div>
);

export default _Top;
