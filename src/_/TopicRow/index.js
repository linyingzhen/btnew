/**
 * const prefixCls = 'style-420772';
 * const images = '/static/images/src/_/TopicRow';
 * @Author: czy0729
 * @Date: 2018-08-03 09:54:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-03 14:22:46
 * @Path m.benting.com.cn /src/_/TopicRow/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { List, Img, Flex, Icon, Content, Link } from '@components';
import Imgs from '../Imgs';

const prefixCls = 'style-420772';

const TopicRow = props => {
  const {
    className,
    threadId,
    title,
    content,
    contentImg = [],
    userId,
    faceImg,
    niname,
    likeAdd,
    replyNum
  } = props;

  return (
    <List.Item className={classNames(prefixCls, className)}>
      <Link
        href={`/bbs/article?id=${threadId}`}
        as={`/bbs/article/${threadId}`}
        block
      >
        {title && <p className="t-30 t-primary t-c2">{title}</p>}
        <Content
          className={classNames('t-34 l-48 t-b', {
            'mt-24': !!title
          })}
        >
          {content}
        </Content>
        <Imgs className="mt-24" data={contentImg} max={3} />
      </Link>
      <Flex className="mt-40">
        <Flex href={`/person/zone?id=${userId}`} as={`/person/zone/${userId}`}>
          <Img src={faceImg} size="0.4rem" circle />
          <span className="t-30 l-40 ml-12">{niname}</span>
        </Flex>
        <Flex.Item>
          <Flex justify="end">
            <Icon className="t-32 l-34 t-icon" type="like-fill" />
            <span className="t-24 l-34 t-sub ml-xs">{likeAdd}</span>
            <Icon className="t-32 l-34 t-icon ml-md" type="comment-fill" />
            <span className="t-24 l-34 t-sub ml-xs">{replyNum}</span>
          </Flex>
        </Flex.Item>
      </Flex>
    </List.Item>
  );
};

export default observer(TopicRow);
