/**
 * const prefixCls = 'style-301237';
 * const images = '/static/images/src/event/car/Index/_Row';
 * @Author: czy0729
 * @Date: 2018-11-06 17:14:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-09 11:22:26
 * @Path bt_mb_new /src/event/car/Index/_Row/_Bar.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon } from '@components';
import Utils from '@utils';

const _Bar = (props, { $ }) => {
  const { infoId, fistId, liked, date, className } = props;

  return (
    <Flex className={className}>
      <Flex.Item className="t-24 l-34 t-sub">
        <span>{Utils.lastDate(date)}</span>
        <span className="ml-md">发布编号：{fistId}</span>
      </Flex.Item>
      <Icon
        className={classNames('t-26', {
          't-primary': liked,
          't-icon': !liked
        })}
        type="like-fill"
        onClick={() => Utils.checkLogin(() => $.do.toggleLike(infoId))}
      />
      <Icon
        className="t-28 t-icon ml-42"
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
