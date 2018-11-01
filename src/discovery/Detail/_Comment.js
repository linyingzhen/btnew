/**
 * const prefixCls = 'style-110592';
 * const images = '/static/images/src/discovery/Detail';
 * @Author: czy0729
 * @Date: 2018-07-24 15:57:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 17:57:08
 * @Path m.benting.com.cn /src/discovery/Detail/_Comment.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Header, Comment } from '@_';

const prefixCls = 'style-110592';

const _Comment = (props, { $ }) => {
  const { className } = props;
  const comment = $.getState('comment');

  return (
    <div className={classNames(prefixCls, className)}>
      <Header title="最新评论" isList />
      <Comment
        data={comment}
        onEndReached={$.fetch.comment}
        onCommentClick={$.page.onCommentClick}
      />
    </div>
  );
};

_Comment.contextTypes = {
  $: PropTypes.object
};

export default observer(_Comment);
