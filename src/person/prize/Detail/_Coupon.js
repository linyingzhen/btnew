/**
 * const prefixCls = 'style-197156';
 * const images = '/static/images/src/person/prize/Detail';
 * @Author: lyz0720
 * @Date: 2018-09-21 11:20:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 14:22:28
 * @Path bt_mb_new /src/person/prize/Detail/_Pack.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Img } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-197156';

const _Coupon = (props, { $ }) => {
  const { className } = props;
  const { prizeName, prizeVal, expdatebegin, expdateend, imgId } = $.getState(
    'detail'
  );
  const begin = Utils.date('y.m.d H:i', expdatebegin);
  const end = Utils.date('y.m.d H:i', expdateend);

  return (
    <div className={classNames(prefixCls, className)}>
      <p className="t-c">
        <span className="t-24 l-34 t-sub">¥</span>
        <span className="t-72 l-100 t-danger ml-xs">{prizeVal}</span>
      </p>
      <p className="t-24 l-32 t-sub t-c mt-8">
        <span>购买时间：</span>
        <span>{expdateend ? `${begin} - ${end}` : '-'}</span>
      </p>
      <Flex className="mt-lg" justify="center" style={{ padding: '0 0.48rem' }}>
        <div style={{ minWidth: '1.2rem' }}>
          <Img className="border" src={imgId} size="1.2rem" lazyload animate />
        </div>
        <p className="t-30 l-42 ml-md" style={{ width: '64%' }}>
          {prizeName}
        </p>
      </Flex>
      <div className="dashed" />

      <style jsx>{`
        .style-197156 {
          position: relative;
          overflow: hidden;
        }
        .${prefixCls}:before, .${prefixCls}:after {
          content: '';
          position: absolute;
          width: 0.64rem;
          height: 0.64rem;
          background: ${Styles.color_bg};
          border: ${Styles.border};
          border-radius: 50%;
        }
        .${prefixCls}:before {
          bottom: 0;
          left: 0;
          margin-bottom: -0.32rem;
          margin-left: -0.32rem;
        }
        .${prefixCls}:after {
          right: 0;
          bottom: 0;
          margin-right: -0.32rem;
          margin-bottom: -0.32rem;
        }
        .dashed {
          margin: 0.64rem 0.64rem 0;
          border-bottom: 0.02rem dashed ${Styles.color_border};
        }
      `}</style>
    </div>
  );
};

_Coupon.contextTypes = {
  $: PropTypes.object
};

export default observer(_Coupon);
