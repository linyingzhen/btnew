/**
 * const prefixCls = 'style-554221';
 * const images = '/static/images/src/bbs/floor/Detail/_Comment';
 * @Author: czy0729
 * @Date: 2018-09-04 17:22:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 02:49:04
 * @Path m.benting.com.cn /src/bbs/floor/Detail/_Comment/_Row.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, DiscuzContent, List } from '@components';
import { Author, Avatar } from '@_';
import Utils from '@utils';

const prefixCls = 'style-554221';

const _CommentRow = props => {
  const {
    content,
    createTime,
    faceImg,
    fanAuth,
    floor,
    grade,
    niname,
    role,
    top,
    userId,
    vip,
    className
  } = props;

  let _floor = `${floor}楼`;
  if (_floor === '2楼') _floor = '沙发';
  if (_floor === '3楼') _floor = '板凳';
  if (_floor === '4楼') _floor = '地板';

  const isTop = parseInt(top) > 0;

  return (
    <List.Item
      className={classNames(prefixCls, className)}
      thumb={<Avatar userId={userId} img={faceImg} vip={vip} />}
      thumbPosition="top"
    >
      <Flex>
        <Author
          userId={userId}
          name={niname}
          level={grade}
          fansAuth={fanAuth}
          role={role}
          left={isTop ? `${_floor} · 置顶 | ` : `${_floor} | `}
          date={Utils.lastDate(createTime)}
        />
      </Flex>
      <DiscuzContent
        className="t-34 l-48 t-title user-select mt-24"
        html={{ __html: content }}
      />
    </List.Item>
  );
};

export default observer(_CommentRow);
