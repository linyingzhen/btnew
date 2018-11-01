/**
 * const prefixCls = 'style-188332';
 * const images = '/static/images/src/_/ListRow';
 * @Author: czy0729
 * @Date: 2018-08-02 15:30:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 16:49:31
 * @Path m.benting.com.cn /src/_/ListRow/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { List, Flex, Icon } from '@components';
import Utils from '@utils';
import Avatar from '../Avatar';
import Level from '../Level';
import Imgs from '../Imgs';

const prefixCls = 'style-188332';

const ListRow = props => {
  const {
    userId,
    img,
    vip,
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
    lazyload,
    animate,
    className
  } = props;

  return (
    <List.Item
      className={classNames(prefixCls, className)}
      thumb={<Avatar userId={userId} img={img} vip={vip} />}
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
      {contentImg && (
        <Imgs
          className="mt-16"
          data={contentImg}
          max={3}
          lazyload={lazyload}
          animate={animate}
        />
      )}
      <Flex className="t-24 t-sub l-34 mt-16">
        <Flex.Item>
          <Flex>
            <span>{name}</span>
            <Level className={`${prefixCls}__level ml-xs`} value={level} />
            <span className="ml-xs">{Utils.lastDate(createTime)}</span>
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
        .style-188332 {
        }
        .${prefixCls}__level {
          width: 0.3rem !important;
          height: 0.28rem !important;
        }
      `}</style>
    </List.Item>
  );
};

export default observer(ListRow);
