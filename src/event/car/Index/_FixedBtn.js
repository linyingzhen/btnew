/**
 * const prefixCls = 'style-148182';
 * const images = '/static/images/src/event/car/Index';
 * @Author: czy0729
 * @Date: 2018-11-06 17:53:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 15:36:29
 * @Path bt_mb_new /src/event/car/Index/_FixedBtn.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Button } from '@components';
import Utils from '@utils';
import G from '@stores/g';
import { tid } from '../ds';

const prefixCls = 'style-231781';

const _FixedBtn = (props, { $ }) => {
  const { className } = props;
  const { id = tid } = $.params.params;
  const { userId } = $.getState('userInfo');
  const {
    signUpFail = 0,
    signUpProcessing = 0,
    signUpSuccess = 0,
    signUpTimes = 0,
    fishTimes = 0,
    fishUsed = 0
  } = $.getState('status');

  const isLogin = !!userId;
  let btnType;
  let btnText;
  let onClick;
  let showBtnStatus;
  if (!isLogin) {
    btnType = 'danger';
    btnText = '请登录参加活动';
    onClick = () => {
      G.setJump();
      Utils.router.push('/login');
    };
  } else if (signUpTimes === 0) {
    btnType = 'danger';
    btnText = '参与报名';
    onClick = () =>
      Utils.router.push(
        `/event/car/signup?id=${id}`,
        `/event/car/signup/${id}`
      );
  } else if (signUpSuccess > 0) {
    // 报名成功
    const count = fishTimes - fishUsed;
    btnType = 'danger';
    btnText = `上传渔获抽奖(${count}次)`;

    if (count) {
      onClick = () =>
        Utils.router.push(`/event/car/post?id=${id}`, `/event/car/post/${id}`);
    } else {
      onClick = () => Utils.light('发布次数已用尽，请继续添加订单获取次数');
    }
    showBtnStatus = true;
  } else if (signUpProcessing === 0 && signUpFail) {
    // 报名失败
    btnType = 'danger';
    btnText = '您提交的订单未通过，请查看详情';
    onClick = () =>
      Utils.router.push(
        `/event/car/status?id=${id}`,
        `/event/car/status/${id}`
      );
  } else {
    // 报名审核中
    btnType = 'danger';
    btnText = '审核中，请查看详情';
    onClick = () =>
      Utils.router.push(
        `/event/car/status?id=${id}`,
        `/event/car/status/${id}`
      );
  }

  return (
    <Flex
      className={classNames(prefixCls, className, 'tool-fixed')}
      style={{
        zIndex: 999
      }}
    >
      <Flex.Item>
        <Button type={btnType} onClick={onClick}>
          {btnText}
        </Button>
      </Flex.Item>
      {showBtnStatus && (
        <Flex.Item className="ml-0">
          <Button
            type="warning"
            onClick={() =>
              Utils.router.push(
                `/event/car/status?id=${id}`,
                `/event/car/status/${id}`
              )
            }
          >
            我的活动状态
          </Button>
        </Flex.Item>
      )}
    </Flex>
  );
};

_FixedBtn.contextTypes = {
  $: PropTypes.object
};

export default observer(_FixedBtn);
