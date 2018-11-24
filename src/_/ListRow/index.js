/**
 * const prefixCls = 'style-188332';
 * const images = '/static/images/src/_/ListRow';
 * @Author: czy0729
 * @Date: 2018-08-02 15:30:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-16 16:53:28
 * @Path m.benting.com.cn /src/_/ListRow/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { List, Flex, Icon } from '@components';
import Const from '@const';
import Utils from '@utils';
import Avatar from '../Avatar';
import Level from '../Level';
import ImgsThumb from '../ImgsThumb';
import { images } from '../Author/ds';

const prefixCls = 'src-list-row';

const ListRow = props => {
  const {
    thumb,
    userId,
    img,
    vip,
    role,
    name,
    level,
    createTime,
    title,
    titleExtra,
    contentImg,
    like,
    likeCount,
    viewCount,
    commentCount,
    spec,
    href,
    as,
    login,
    className
  } = props;

  return (
    <List.Item
      className={classNames(prefixCls, className)}
      thumb={thumb || <Avatar userId={userId} img={img} vip={vip} />}
      thumbPosition="top"
      href={href}
      as={as}
      login={login}
    >
      {titleExtra ? (
        <Flex>
          <Flex.Item>
            <p
              className={classNames('t-28 l-40 t-c2', {
                't-title': !spec,
                't-danger': spec
              })}
            >
              {title}
            </p>
          </Flex.Item>
          {titleExtra()}
        </Flex>
      ) : (
        <p
          className={classNames('t-28 l-40 t-c2', {
            't-title': !spec,
            't-danger': spec
          })}
        >
          {title}
        </p>
      )}
      {contentImg && <ImgsThumb className="mt-24" data={contentImg} />}
      <Flex className="t-24 t-sub l-34 mt-16">
        <Flex.Item>
          <Flex>
            {name && <span className="mr-xs">{name}</span>}
            {role == 1 ? (
              <img
                className="img-admin mr-xs"
                src={`${images}/admin${Const.__IMG_DPR__}.png`}
                alt=""
              />
            ) : (
              level && (
                <Level className={`${prefixCls}__level mr-xs`} value={level} />
              )
            )}
            <span>{Utils.lastDate(createTime)}</span>
          </Flex>
        </Flex.Item>
        <Icon
          className={classNames('t-26 l-34 ml-md', {
            't-icon': !like,
            't-primary': like
          })}
          type="like-fill"
        />
        <span
          className={classNames('ml-xs', {
            't-primary': like
          })}
        >
          {likeCount}
        </span>
        {viewCount && (
          <React.Fragment>
            <Icon className="t-26 l-34 t-icon ml-md" type="eye" />
            <span className="ml-xs">{viewCount}</span>
          </React.Fragment>
        )}
        <Icon className="t-28 l-34 t-icon ml-md" type="comment-fill" />
        <span className="ml-xs">{commentCount}</span>
      </Flex>

      <style jsx global>{`
        .src-list-row {
        }
        .${prefixCls}__level {
          width: 0.3rem !important;
          height: 0.28rem !important;
        }
      `}</style>
      <style jsx>{`
        .src-list-row {
        }
        .img-admin {
          width: 0.28rem;
          height: 0.3rem;
          vertical-align: middle;
        }
      `}</style>
    </List.Item>
  );
};

export default observer(ListRow);
