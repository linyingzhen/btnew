/**
 * const prefixCls = 'style-202696';
 * const images = '/static/images/src/video/Detail';
 * @Author: czy0729
 * @Date: 2018-07-22 12:54:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-22 20:03:34
 * @Path m.benting.com.cn /src/video/Detail/_Comment.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Header, Comment } from '@_';

const prefixCls = 'style-202696';

const _Comment = (props, { $ }) => {
  const { className } = props;
  const comment = $.getState('comment');

  return (
    <div className={classNames(prefixCls, className)}>
      <Header title="最新评论" />
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
