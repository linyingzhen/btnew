/**
 * const prefixCls = 'style-117998';
 * const images = '/static/images/src/person/message/Index';
 * @Author: czy0729
 * @Date: 2018-10-05 20:45:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-05 23:34:55
 * @Path m.benting.com.cn /src/person/message/Index/_Row.js
 */
import React from 'react';
import { observer } from '@';
import { List, Content, Flex } from '@components';
import { Avatar } from '@_';
import Utils from '@utils';
import Styles from '@styles';
import { sourceTypeDS } from './ds';

const prefixCls = 'style-117998';

const _Row = props => {
  const {
    userId,
    facePath,
    vip,
    niname,
    con,
    sourceCon,
    msgType,
    relevId,
    createTime
  } = props;
  const { label } =
    sourceTypeDS.find(item => item.value.indexOf(parseInt(msgType)) !== -1) ||
    {};

  let href;
  let linkAs;
  switch (label) {
    case '发现':
      href = `/discovery/detail?id=${relevId}`;
      linkAs = `/discovery/detail/${relevId}`;
      break;

    case '帖子':
      href = `/bbs/article?id=${relevId}`;
      linkAs = `/bbs/article/${relevId}`;
      break;

    case '视讯':
      href = `/video/detail?id=${relevId}`;
      linkAs = `/video/detail/${relevId}`;
      break;

    case '反馈':
      href = `/person/feedback/detail?id=${relevId}`;
      linkAs = `/person/feedback/detail/${relevId}`;
      break;

    default:
      break;
  }

  return (
    <List.Item
      thumb={<Avatar userId={userId} img={facePath} vip={vip} />}
      thumbPosition="top"
    >
      <Flex align="start">
        <Flex.Item>
          <p className="t-30 l-44 t-main ls-o1">{niname}</p>
          <Content className={`${prefixCls}__content t-28 l-36 mt-8`}>
            {con}
          </Content>
          <p className="t-24 l-32 t-sub mt-8">{Utils.date(createTime)}</p>
        </Flex.Item>
        <Flex
          className={`${prefixCls}__extra ml-sm`}
          justify="center"
          href={href}
          as={linkAs}
        >
          <p className="t-20 t-sub t-c4">
            {Utils.getCharFilterEmoji(sourceCon)}
          </p>
        </Flex>
      </Flex>

      <style jsx global>{`
        .style-117998 {
        }
        .${prefixCls}__content .tool-emoji {
          width: 0.36rem !important;
          height: 0.36rem !important;
        }
        .${prefixCls}__content .tool-emoji-lg {
          width: 0.48rem !important;
          min-width: 0.48rem !important;
          height: 0.48rem !important;
          min-height: 0.48rem !important;
        }
        .${prefixCls}__extra {
          width: 1.38rem;
          height: 1.28rem;
          padding: ${Styles.xs};
          background-color: ${Styles.color_inner};
          border-radius: ${Styles.radius_sm};
          overflow: hidden;
          background-position: center center;
        }
      `}</style>
    </List.Item>
  );
};

export default observer(_Row);
