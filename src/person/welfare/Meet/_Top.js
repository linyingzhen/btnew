/**
 * const prefixCls = 'style-683853';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-07 10:45:44
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-07 11:00:27
 * @Path bt_mb_new \src\person\welfare\Meet\_Top.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '@styles';
import { observer } from '@';

const prefixCls = 'style-683853';

const _Top = props => {
  const { className } = props;
  return (
    <div className={classNames(prefixCls, className)}>
      <p className="t-26 l-36 t-sub t-c">与您的一次美好邂逅</p>
      <div className="t-sub box">
        <p className="t-24 l-34">
          1.
          第一次注册会员的用户，可在有礼专区任意挑选一次对应会员级别的礼品一份。
        </p>
        <p className="t-24 l-34">2. 单笔消费满39元时，随订单一起发送。</p>
        <p className="t-24 l-34 t-gold">特别声明：每个新用户仅一次领取机会。</p>
      </div>

      <style jsx>{`
        .style-683853 {
          background: ${Styles.color_main};
        }
        .box {
          padding: 0.56rem 1rem 1rem;
        }
      `}</style>
    </div>
  );
};

_Top.contextTypes = {
  $: PropTypes.object
};

export default observer(_Top);
