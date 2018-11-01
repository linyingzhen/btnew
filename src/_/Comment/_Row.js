/**
 * const prefixCls = 'style-182307';
 * const images = '/static/images/src/_/Comment';
 * @Author: czy0729
 * @Date: 2018-07-22 13:12:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 02:48:03
 * @Path m.benting.com.cn /src/_/Comment/_Row.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { Icon, Content, List, Flex } from '@components';
import Const from '@const';
import Utils from '@utils';
import Author from '../Author';
import Avatar from '../Avatar';
import CommentRelative from '../CommentRelative';

const prefixCls = 'style-182307';

const _Row = props => {
  const {
    con,
    createTime,
    faceImg,
    fanAuth,
    grade,
    niname,
    replyData,
    role,
    tbId,
    userId,
    vip,
    onCommentClick = Function.prototype,
    className
  } = props;

  return (
    <List.Item
      className={classNames(prefixCls, className)}
      thumb={<Avatar userId={userId} img={faceImg} vip={vip} />}
      thumbPosition="top"
    >
      <Flex>
        <Flex.Item>
          <Author
            userId={userId}
            name={niname}
            level={grade}
            fansAuth={fanAuth}
            role={role}
            date={Utils.lastDate(createTime)}
          />
        </Flex.Item>
        <div
          className="icon-comment tool-wrap-icon"
          onClick={() =>
            Utils.checkLogin(() =>
              onCommentClick({
                rootId: tbId,
                parId: tbId,
                niname
              }))
          }
        >
          <Icon className="t-28 t-icon" type="comment-fill" />
        </div>
      </Flex>
      <div className="mt-24">
        <Content className="t-34 l-48 t-title user-select">{con}</Content>
        <CommentRelative
          className="mt-24"
          id={tbId}
          data={replyData.list}
          max={Const.__LIMIT__ * 4}
          onCommentClick={onCommentClick}
        />
      </div>

      <style jsx>{`
        .style-182307 {
        }
        .icon-comment {
          margin-right: -0.16rem;
        }
      `}</style>
    </List.Item>
  );
};

export default observer(_Row);
