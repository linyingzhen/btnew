/**
 * const prefixCls = 'style-634386';
 * const images = '/static/images/src/shop/_/EventRow';
 * @Author: czy0729
 * @Date: 2018-09-20 16:25:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-17 16:03:44
 * @Path m.benting.com.cn /src/shop/_/EventRow/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, List, Img } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import CountDown from '../CountDown';

const prefixCls = 'style-634386';

const _Row = props => {
  const {
    as,
    beginTime,
    desc,
    endTime,
    extra,
    href,
    nowTime,
    sub,
    tag,
    thumb,
    thumbType = 'scale',
    title,
    className
  } = props;

  return (
    <List.Item
      className={classNames(prefixCls, className)}
      thumb={
        <div className="thumb">
          <Img
            className={`${prefixCls}__thumb`}
            src={Utils.getAppImgUrl(thumb, thumbType)}
            size="1.68rem"
            onClick={() => Utils.router.push(href, as)}
          />
        </div>
      }
      href={href}
      as={as}
    >
      {extra ? (
        <Flex align="end">
          <Flex.Item>
            <p className="t-34 l-48 t-title t-c1">{title}</p>
          </Flex.Item>
          <p className="t-24 l-48 t-sub ml-xs">{extra}</p>
        </Flex>
      ) : (
        <p className="t-34 l-48 t-title t-c1">{title}</p>
      )}
      <CountDown
        className="mt-12"
        tag={tag}
        nowTime={nowTime}
        beginTime={beginTime}
        endTime={endTime}
      />
      <Flex className="mt-24" align="end">
        <Flex.Item className="t-22 l-32 t-sub">{desc}</Flex.Item>
        {sub && <p className="t-22 l-32 t-sub">{sub}</p>}
      </Flex>

      <style jsx global>{`
        .style-634386 {
        }
        .${prefixCls}__thumb {
          border: ${Styles.border};
        }
        .${prefixCls}__count-down {
          background: ${Styles.color_inner};
        }
      `}</style>
      <style jsx>{`
        .style-634386 {
        }
        .thumb {
          padding: 0.24rem 0;
        }
        .tag {
          display: inline-block;
          width: 0.96rem;
          height: 0.48rem;
          font-size: 0.24rem;
          line-height: 0.48rem;
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
    </List.Item>
  );
};

export default observer(_Row);
