/**
 * const prefixCls = 'style-893128';
 * const images = '/static/images/src/event/cashback/Index';
 * @Author: czy0729
 * @Date: 2018-10-15 16:32:41
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-10-15 16:32:41
 * @Path m.benting.com.cn /src/event/cashback/Index/_Btn.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Button } from '@components';
import Utils from '@utils';

const prefixCls = 'style-893128';

const _Btn = (props, { $ }) => {
  const { className } = props;
  const { id } = $.params.params;
  const { vip } = $.getState('userInfo');
  const {
    number,
    remainNum,
    startTime,
    tosTime,
    vipStart,
    endTime
  } = $.getState('eventDetail');
  const { list } = $.getState('progress');
  const { time } = $.getState('time');
  const cls = classNames(prefixCls, className, 'p-w mt-lg');

  // number == 0，代表非报名活动，第一步就是填写资料，假如有一步了，就是填过了
  // number != 0，代表是报名活动，第一步是报名，第二部是填写资料
  if (
    (number == 0 && list.length === 0) ||
    (number != 0 && list.length === 1)
  ) {
    const _tosTime = Utils.toTimestamp(tosTime); // 填写资料开始时间

    return (
      <div className={cls}>
        <Button
          type="event"
          onClick={() =>
            Utils.checkWW(() => {
              if (time < _tosTime) {
                Utils.light('未到填写资料时间');
                return;
              }

              Utils.router.push(
                `/event/cashback/submit?id=${id}`,
                `/event/cashback/submit/${id}`
              );
            })
          }
        >
          填写资料
        </Button>
      </div>
    );
  }

  const _endTime = Utils.toTimestamp(endTime); // 活动结束时间

  // 活动未报名，活动未结束
  if (list.length === 0 && time < _endTime) {
    if (remainNum == 0 && number != 0) {
      return (
        <div className={cls}>
          <Button disabled>名额已抢光</Button>
        </div>
      );
    }

    const _vipStart = vipStart ? Utils.toTimestamp(vipStart) : 0; // VIP提前开始时间

    if (_vipStart && time < _vipStart) {
      return (
        <div className={cls}>
          <Button disabled>
            VIP优先锁定中，
            {Utils.date('m-d H:i:s', _vipStart)}
            开启
          </Button>
        </div>
      );
    }

    const _startTime = Utils.toTimestamp(startTime); // 活动开始时间
    const isVip = vip > 0;
    const realStartTime = isVip ? _vipStart : _startTime;
    const isStart = time > realStartTime;

    return (
      <div className={cls}>
        <Button
          type="event"
          disabled={!isStart}
          onClick={() => Utils.checkWW($.do.join)}
        >
          {isStart
            ? '立即报名'
            : `${Utils.date('m-d H:i:s', realStartTime)}开启`}
        </Button>
      </div>
    );
  }

  return (
    <div className={cls}>
      <Button disabled>活动已结束</Button>
    </div>
  );
};

_Btn.contextTypes = {
  $: PropTypes.object
};

export default observer(_Btn);
