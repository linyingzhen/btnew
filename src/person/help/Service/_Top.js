/**
 * const prefixCls = 'style-612481';
 * const images = '/static/images';
 * @Author: Jun
 * @Date: 2018-08-10 15:07:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 14:21:43
 * @Path m.benting.com.cn \src\person\help\Service\_Top.js
 */
import React from 'react';
import { Link } from '@components';
import Styles from '@styles';
import { images } from './ds';

const prefixCls = 'style-612481';

const _Top = () => (
  <div className={prefixCls}>
    <div className="wrap-qr t-c">
      <img className="img-qr" src={`${images}/qr.png`} alt="" />
      <p className="t-28 l-40 t-void mt-40">
        长按二维码关注【本汀钓鱼服务号】微信公众号
      </p>
    </div>
    <div className="wrap-tel">
      <span className="t-34 l-48 t-sub">本汀客服联系电话</span>
      <Link className="t-34 l-48 pull-right" href="tel:020-31001105">
        020-31001105
      </Link>
    </div>

    <style jsx>{`
      .style-612481 {
      }
      .wrap-qr {
        padding: 0.64rem 0;
        background: ${Styles.color_main};
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
