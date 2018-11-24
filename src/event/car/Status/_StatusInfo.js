/**
 * const prefixCls = 'style-131063';
 * const images = '/static/images/src/event/car/Status';
 * @Author: czy0729
 * @Date: 2018-11-09 15:08:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 11:46:51
 * @Path bt_mb_new /src/event/car/Status/_StatusInfo.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import { tid } from '../ds';

const prefixCls = 'style-131063';

const _StatusInfo = (props, { $ }) => {
  const { className } = props;
  const { id = tid } = $.params.params;
  const { userId } = $.getState('userInfo');
  const {
    fishTimes = 0,
    fishUsed = 0,
    signUpTimes = 0,
    signUpProcessing = 0,
    signUpSuccess = 0,
    signUpFail = 0
  } = $.getState('status');

  return (
    <div
      className={classNames(prefixCls, className)}
      onClick={() =>
        Utils.router.push(
          `/event/car/user_status?id=${id}&uid=${userId}`,
          `/event/car/user_status/${id}/${userId}`
        )
      }
    >
      <p className="t-34 l-48 t-b">
        <span>共可发布渔获</span>
        <span className="t-48 l-56 t-primary ml-sm mr-sm">{fishTimes}</span>
        <span>次</span>
      </p>
      <Flex className="mt-16">
        <Flex.Item>
          <span>已发布：</span>
          <span className="t-34 l-42 t-b mr-sm">{fishUsed}</span>
          <span>次</span>
        </Flex.Item>
        <Flex.Item>
          <span>还可发布：</span>
          <span className="t-34 l-42 t-b mr-sm">{fishTimes - fishUsed}</span>
          <span>次</span>
        </Flex.Item>
      </Flex>
      <Flex className="mt-16 mb-32">
        <Flex.Item style={{ borderTop: Styles.border }} />
        <Icon className="t-44 t-sub ml-56" type="right" />
      </Flex>
      <Flex className="mt-16">
        <Flex.Item>
          <span>共提交鱼竿：</span>
          <span className="t-34 l-42 t-b mr-sm">{signUpTimes}</span>
          <span>次</span>
        </Flex.Item>
        <Flex.Item />
      </Flex>
      <Flex className="mt-16">
        <Flex.Item>
          <span>审核通过：</span>
          <span className="t-34 l-42 t-b mr-sm">{signUpSuccess}</span>
          <span>次</span>
        </Flex.Item>
        <Flex.Item>
          <span>审核中：</span>
          <span className="t-34 l-42 t-b mr-sm">{signUpProcessing}</span>
          <span>次</span>
        </Flex.Item>
      </Flex>
      <Flex className="mt-16">
        <Flex.Item>
          <span>审核不通过：</span>
          <span className="t-34 l-42 t-b mr-sm">{signUpFail}</span>
          <span>次</span>
        </Flex.Item>
        <Flex.Item />
      </Flex>

      <style jsx>{`
        .style-131063 {
          padding: ${Styles.space} ${Styles.wind};
          margin: ${Styles.space} ${Styles.wind};
          background: ${Styles.color_theme};
          border-radius: 0.04rem;
          box-shadow: 0 0.08rem 0.32rem rgba(145, 148, 163, 0.32);
        }
      `}</style>
    </div>
  );
};

_StatusInfo.contextTypes = {
  $: PropTypes.object
};

export default observer(_StatusInfo);
