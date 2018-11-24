/**
 * const prefixCls = 'style-169117';
 * const images = '/static/images/src/person/btlevel/Index';
 * @Author: lyz0720
 * @Date: 2018-10-26 09:46:43
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-11-13 17:26:31
 * @Path bt_mb_new /src/person/btlevel/Index/_Top.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import Utils from '@utils';
import Styles from '@styles';
import { images } from './ds';

const prefixCls = 'style-169117';

const _Top = (props, { $ }) => {
  const { className } = props;
  const { btscore } = $.getState('userInfo');

  return (
    <div className={classNames(prefixCls, className)}>
      <div className="card">
        <p className="t-40 l-56 t-b t-c">
          {btscore ? Utils.formatNumber(btscore, 0) : '-'}
        </p>
        <p className="t-26 l-36 t-b t-c mt-16">本汀积分</p>
      </div>

      <style jsx>{`
        .style-169117 {
          position: relative;
          padding: ${Styles.sm} 0;
          background: ${Styles.color_main};
        }
        .${prefixCls}:before {
          content: '';
          display: block;
          position: absolute;
          bottom: 0.88rem;
          left: 50%;
          width: 110%;
          height: 1.08rem;
          background: ${Styles.color_theme};
          border-radius: 50% 50% 0 0;
          box-shadow: -0.08rem -0.08rem 0.16rem rgba(0, 0, 0, 0.08);
          transform: translate(-50%, 100%);
        }
        .card {
          padding: 0.88rem 0 0.8rem;
          margin: 0 0.8rem;
          ${Styles._bg};
          background-image: url(${images}/score_bg.png);
          border-radius: 0.04rem;
          box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.12);
          transform: translateZ(0);
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

_Top.contextTypes = {
  $: PropTypes.object
};

export default observer(_Top);
