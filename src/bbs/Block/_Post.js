/**
 * const prefixCls = 'style-168592';
 * const images = '/static/images/src/bbs/Block';
 * @Author: czy0729
 * @Date: 2018-10-21 22:23:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-21 22:24:31
 * @Path bt_mb_new /src/bbs/Block/_Post.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';
import { ListRow } from '@_';

const prefixCls = 'style-168592';

const _Post = (props, { $ }) => {
  const { className } = props;
  const post = $.getState('post');

  return (
    <ListView
      className={classNames(prefixCls, className)}
      data={post}
      renderRow={item => (
        <ListRow
          userId={item.userId}
          img={item.faceImg}
          vip={item.vip}
          name={item.niname}
          level={item.grade}
          createTime={item.createTime}
          title={item.title}
          likeCount={item.likeAdd}
          commentCount={item.replyNum}
          spec={item.isDigest === 1}
          href={`/bbs/article?id=${item.threadId}`}
          as={`/bbs/article/${item.threadId}`}
        />
      )}
      onEndReached={$.fetch.post}
    />
  );
};

_Post.contextTypes = {
  $: PropTypes.object
};

export default observer(_Post);
