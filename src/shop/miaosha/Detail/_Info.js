/**
 * const prefixCls = 'style-896935';
 * const images = '/static/images/src/shop/miaosha/Detail';
 * @Author: czy0729
 * @Date: 2018-09-21 14:21:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-21 15:28:17
 * @Path m.benting.com.cn /src/shop/miaosha/Detail/_Info.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Flex } from '@components';
import Styles from '@styles';
import CountDown from '@src/shop/_/CountDown';

const prefixCls = 'style-414741';

const _Info = (props, { $ }) => {
  const {
    title,
    property,
    nowTime,
    beginTime,
    endTime,
    salePrice,
    dataType,
    panicType,
    tag,
    _loaded
  } = $.getState('detail');

  let extra;
  let elPrice;
  if (dataType == 2) {
    if (panicType == 1) {
      extra = '本汀余额';
      elPrice = (
        <>
          <span className="t-danger ml-xs">¥</span>
          <span className="t-34 l-34 t-danger mr-xs">
            {parseFloat(salePrice)}
          </span>
        </>
      );
    } else {
      extra = '金币';
      elPrice = (
        <>
          <span className="t-34 l-34 t-danger ml-xs">
            {(salePrice * 1000) / 100}
          </span>
          <span className="t-danger mr-xs">金币</span>
        </>
      );
    }
  } else {
    extra = '灵动余额';
    elPrice = (
      <>
        <span className="t-danger ml-xs">¥</span>
        <span className="t-34 l-34 t-danger mr-xs">
          {parseFloat(salePrice)}
        </span>
      </>
    );
  }

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
          <Flex className="mt-24">
            <Flex.Item className="t-22 l-32">
              <span className=" t-sub">秒杀价</span>
              {elPrice}
            </Flex.Item>
            <span className="t-22 l-32 t-sub">{extra}</span>
          </Flex>
        </>
      )}

      <style jsx>{`
        .style-414741 {
          min-height: 2.58rem;
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
