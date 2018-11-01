/**
 * const prefixCls = 'style-414741';
 * const images = '/static/images/src/shop/auction/Detail';
 * @Author: czy0729
 * @Date: 2018-09-11 14:57:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-29 17:24:14
 * @Path m.benting.com.cn /src/shop/auction/Detail/_Info.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Flex, Button } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import CountDown from '@src/shop/_/CountDown';
import { showStateDS, auctionTypeDS } from '../Index/ds';

const prefixCls = 'style-414741';

const _Info = (props, { $ }) => {
  const { refreshing } = $.getState();
  const {
    title,
    nowTime,
    beginTime,
    endTime,
    showState,
    auctionType,
    currentPrice,
    addPrice,
    _loaded
  } = $.getState('detail');

  const tag = Utils.getLabel(showStateDS, showState);
  let desc;
  let isEnd;
  switch (tag) {
    case '预告中':
      desc = '起拍价';
      break;

    case '进行中':
      desc = '当前价';
      break;

    case '已结束':
      desc = '最终价';
      isEnd = true;
      break;

    default:
      break;
  }

  const type = Utils.getLabel(auctionTypeDS, auctionType);

  return (
    <div className={prefixCls}>
      {_loaded && (
        <>
          <p className="t-34 l-48">{title}</p>
          <Flex className="mt-24">
            <Flex.Item>
              <CountDown
                tag={tag}
                nowTime={nowTime}
                beginTime={beginTime}
                endTime={endTime}
                onEnd={$.page.onEnd}
              />
            </Flex.Item>
            {!isEnd && (
              <Button
                className="ml-sm"
                type="primary"
                size="sm"
                inline
                loading={refreshing}
                disabled={refreshing}
                onClick={$.fetch.refresh}
              >
                {refreshing ? '刷新中' : '刷新信息'}
              </Button>
            )}
          </Flex>
          <Flex className="t-22 l-32 t-sub mt-24">
            <Flex.Item>
              <span>{desc}</span>
              <span className="t-44 l-32 t-danger ml-xs mr-xs">
                {currentPrice && parseInt(currentPrice)}
              </span>
              <span>{type}</span>
            </Flex.Item>
            {addPrice && <span>{`加价幅度 ${parseInt(addPrice)}`}</span>}
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
