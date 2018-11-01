/**
 * const prefixCls = 'style-209462';
 * const images = '/static/images/src/shop/jianlou/Detail';
 * @Author: czy0729
 * @Date: 2018-09-23 22:11:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-23 22:23:04
 * @Path m.benting.com.cn /src/shop/jianlou/Detail/_Info.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import Styles from '@styles';
import CountDown from '@src/shop/_/CountDown';

const prefixCls = 'style-209462';

const _Info = (props, { $ }) => {
  const { tag } = props;
  const {
    title,
    property,
    nowTime,
    beginTime,
    endTime,
    salePrice,
    _loaded
  } = $.getState('detail');

  const elPrice = (
    <>
      <span className="t-34 l-34 t-danger ml-xs">{parseFloat(salePrice)}</span>
      <span className="t-danger mr-xs">金币</span>
    </>
  );

  return (
    <div className={prefixCls}>
      {_loaded && (
        <>
          <p className="t-34 l-48">{title}</p>
          {property && <p className="t-24 l-32 t-sub mt-4">{property}</p>}
          <CountDown
            className="mt-24"
            tag={tag}
            nowTime={nowTime}
            beginTime={beginTime}
            endTime={endTime}
            onEnd={() =>
              setTimeout(() => {
                $.fetch.detail();
                $.fetch.record(true);
              }, 1000)
            }
          />
          <p className="t-22 l-32 mt-24">
            <span className="t-sub">捡漏价</span>
            {elPrice}
          </p>
        </>
      )}

      <style jsx>{`
        .style-209462 {
          min-height: 2.54rem;
          padding: 0.32rem ${Styles.wind};
          background: ${Styles.color_theme};
        }
      `}</style>
    </div>
  );
};

_Info.contextTypes = {
  $: PropTypes.object
};

export default observer(_Info);
