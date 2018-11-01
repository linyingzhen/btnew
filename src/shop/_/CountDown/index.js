/**
 * const prefixCls = 'style-110292';
 * const images = '/static/images/src/shop/miaosha/_/CountDown';
 * @Author: czy0729
 * @Date: 2018-09-20 16:02:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-29 17:27:53
 * @Path m.benting.com.cn /src/shop/miaosha/_/CountDown/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, CountDown } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-110292';

const _CountDown = props => {
  const { tag, nowTime, beginTime, endTime, onEnd, className } = props;

  let time;
  let left;
  let tagType;
  switch (tag) {
    case '预告中':
      time = beginTime;
      left = '倒数';
      tagType = 'main';
      break;

    case '进行中':
      time = endTime;
      left = '剩余';
      tagType = 'primary';
      break;

    case '已结束':
      tagType = 'default';
      break;

    default:
      break;
  }

  return (
    <div>
      {tag === '预告中' && (
        <Flex className={classNames(prefixCls, className)}>
          <p className={`tag tag-${tagType}`}>预告中</p>
          <Flex.Item className="t-24 l-34">
            {Utils.date('m-d H:i:s', beginTime)} 开始
          </Flex.Item>
        </Flex>
      )}
      {tag === '进行中' && (
        <Flex className={classNames(prefixCls, className, 't-sub')}>
          <p className={`tag tag-${tagType}`}>进行中</p>
          <Flex.Item>
            <CountDown
              className="t-24 l-34"
              theme={false}
              left={left}
              now={Number(nowTime)}
              beginTime={Number(time)}
              onEnd={onEnd}
            />
          </Flex.Item>
        </Flex>
      )}
      {tag === '已结束' && (
        <p className={classNames(`tag tag-${tagType}`, className)}>已结束</p>
      )}

      <style jsx global>{`
        .style-110292 {
          background: ${Styles.color_inner};
        }
      `}</style>
      <style jsx>{`
        .style-110292 {
        }
        .tag {
          display: inline-block;
          width: 0.96rem;
          height: 0.56rem;
          font-size: 0.24rem;
          line-height: 0.56rem;
          text-align: center;
          color: ${Styles.color_void};
        }
        .tag-main {
          background: ${Styles.color_main};
        }
        .tag-primary {
          background: ${Styles.color_primary};
        }
        .tag-default {
          background: ${Styles.color_sub};
        }
      `}</style>
    </div>
  );
};

export default observer(_CountDown);
