/**
 * const prefixCls = 'style-125645';
 * const images = '/static/images/src/event/sign/Index';
 * @Author: czy0729
 * @Date: 2018-10-18 23:56:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-14 00:00:23
 * @Path m.benting.com.cn /src/event/sign/Index/_Week.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Button } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import { numberMap } from '@ds';

const prefixCls = 'style-125645';
function getWeekDay(i) {
  const now = new Date();
  const firstDay = new Date(now - ((now.getDay() || 7) - 1) * 86400000);

  firstDay.setDate(firstDay.getDate() + i);

  return firstDay.getDate();
}

const _Week = (props, { $ }) => {
  const { className } = props;
  const { isGet } = $.getState('_week');
  const { sign } = $.getState('userInfo');
  const { list, _loaded } = $.getState('weekSign');

  const isSign = !!sign;
  const canGetWeekPoint = list.length === 7 && !isGet;

  const now = Utils.getTimestamp();
  const [month, day] = Utils.date('m/d', now)
    .split('/')
    .map(item => parseInt(item));
  const daysOfThisWeek = [];
  for (let i = 0; i < 7; i += 1) {
    daysOfThisWeek.push(getWeekDay(i));
  }

  const signMap = {};
  list.forEach(({ dayNumber }) => (signMap[dayNumber] = true));

  return (
    <div className={classNames(prefixCls, className)}>
      <p className="t-34 l-48 t-sub t-b">{numberMap[month]}月</p>
      <div className="days">
        {daysOfThisWeek.map(item => (
          <div
            key={item}
            className={classNames('day t-34 l-48 t-c', {
              'day-today': _loaded && item === day,
              'day-sign': signMap[item]
            })}
          >
            {item}
          </div>
        ))}
        {canGetWeekPoint && (
          <span
            className="btn-get tool-animate-scale t-24 l-44 t-void t-c"
            onClick={$.do.getWeekPoint}
          >
            点击领取
          </span>
        )}
      </div>
      <Flex className="mt-24">
        <Flex.Item className="t-24 l-34 t-sub">
          签到领积分 · 一周全勤有大礼！
        </Flex.Item>
        <Button
          type="primary"
          size="sm"
          inline
          radius
          disabled={isSign}
          style={{ minWidth: '1.96rem' }}
          onClick={() => Utils.checkLogin($.do.sign)}
        >
          {isSign ? '已签到' : '马上签到'}
        </Button>
      </Flex>

      <style jsx>{`
        .style-125645 {
        }
        .days {
          position: relative;
          border-bottom: 0.01rem solid #979797;
        }
        .btn-get {
          position: absolute;
          top: 0;
          right: 0;
          margin-top: -0.32rem;
          margin-right: -0.16rem;
          width: 1.4rem;
          padding: 0 0.08rem;
          background: ${Styles.color_danger};
          border-radius: 0.24rem;
        }
        .day {
          display: inline-block;
          position: relative;
          width: 14.28%;
          padding: 0.24rem 0;
          color: ${Styles.color_sub};
        }
        .day:before {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -0.02rem;
          width: 0.02rem;
          height: 0.12rem;
          background: #979797;
          transform: translateX(-50%);
        }
        .day-today {
          color: ${Styles.color_warning};
        }
        .day-sign {
          color: ${Styles.color_primary} !important;
        }
      `}</style>
    </div>
  );
};

_Week.contextTypes = {
  $: PropTypes.object
};

export default observer(_Week);
