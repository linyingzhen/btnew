/**
 * const prefixCls = 'style-152190';
 * const images = '/static/images/src/discovery/Index/_Row';
 * @Author: czy0729
 * @Date: 2018-07-06 14:45:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 02:53:13
 * @Path m.benting.com.cn /src/discovery/Index/_Row/_Bar.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon } from '@components';
import Utils from '@utils';

const _Bar = (props, { $ }) => {
  const { infoId, liked, likeCount, date, className } = props;

  return (
    <Flex className={className}>
      <Flex.Item>
        <span className="t-24 l-34 t-sub ls-o1">{Utils.lastDate(date)}</span>
      </Flex.Item>
      <Icon
        className={classNames('tool-wrap-icon t-26', {
          't-primary': liked,
          't-icon': !liked
        })}
        type="like-fill"
        onClick={() => Utils.checkLogin(() => $.do.toggleLike(infoId))}
      />
      <span
        className={classNames('t-24', {
          't-primary': liked,
          't-sub': !liked
        })}
      >
        {likeCount}
      </span>
      <Icon
        className="tool-wrap-icon t-28 t-icon ml-42"
        type="comment-fill"
        onClick={() =>
          Utils.checkLogin(() => $.page.onCommentClick({ infoId }))
        }
      />
    </Flex>
  );
};

_Bar.contextTypes = {
  $: PropTypes.object
};

export default observer(_Bar);
