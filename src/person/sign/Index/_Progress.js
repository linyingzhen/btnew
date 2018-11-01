/**
 * const prefixCls = 'style-162578';
 * const images = '/static/images/src/index/Sign';
 * @Author: cwz0525
 * @Date: 2018-07-02 10:00:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 02:51:24
 * @Path m.benting.com.cn /src/index/Sign/_Progress.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import Utils from '@utils';
import Styles from '@styles';
import { Button, Icon, Flex } from '@components';
import { getMonth } from './ds';

const prefixCls = 'style-162578';

const getMonDate = () => {
  const d = new Date();
  const day = d.getDay();
  const date = d.getDate();

  if (day === 1) return d;
  if (day === 0) {
    d.setDate(date - 6);
    return d;
  }

  d.setDate(date - day + 1);
  return d;
};

const d = getMonDate();
const arr = [];

for (let i = 0; i < 7; i += 1) {
  const y = d.getFullYear();
  const m = d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`;
  const _d = d.getDate() >= 10 ? d.getDate() : `0${d.getDate()}`;

  arr.push({ y, m, d: _d });
  d.setDate(d.getDate() + 1);
}

const Progress = (props, { $ }) => {
  const { className } = props;
  const { list } = $.getState('weekSign');
  const { sign } = $.getState('userInfo');
  const d = new Date();
  const m = d.getMonth();
  const isGetPoint = list.length >= 7;
  const map = {};
  list.forEach(item => {
    const dayNumber =
      item.dayNumber < 10 ? `0${item.dayNumber}` : item.dayNumber;
    map[`${item.dateYm}-${dayNumber}`] = true;
  });

  return (
    <div className={classNames(prefixCls, className)}>
      <Flex justify="between" align="center">
        <p className="month t-30 l-42 mt-md">{getMonth(m)}月</p>
      </Flex>
      <Flex
        className="mt-24"
        justify="around"
        style={{ padding: '0 0.14rem 0.3rem 0.14rem' }}
      >
        {arr.length > 0 &&
          arr.map((item, index) => {
            const date = `${item.y}-${item.m}-${item.d}`;
            return (
              <Flex.Item className="ml-0" key={item.d}>
                <span className="sign-day">
                  <i
                    className={classNames('day-num t-30 l-32', {
                      [`${prefixCls}__btn-get_active`]: !!map[date],
                      today:
                        Utils.date('Y-m-d', new Date().valueOf() / 1000) ===
                        date
                    })}
                  >
                    {index >= 6 ? (
                      <Icon type="gift" className="t-30 l-32" />
                    ) : (
                      `${item.d}`
                    )}
                  </i>
                </span>
              </Flex.Item>
            );
          })}
      </Flex>
      <Flex justify="between" align="center" className="mt-28">
        <span className="t-sub t-24">签到领积分 · 连续签到7天有大礼！</span>
        {isGetPoint ? (
          <Button
            type="primary"
            size="sm"
            inline
            onClick={
              isGetPoint
                ? $.do.getPoint
                : () => Utils.light('一周满签可领取88积分')
            }
          >
            领取奖励
          </Button>
        ) : (
          <Button
            type="primary"
            size="xs"
            disabled={sign ? 'disabled' : ''}
            inline
            onClick={sign ? undefined : $.do.sign}
          >
            {sign ? '已签到' : '立即签到'}
          </Button>
        )}
      </Flex>
      <style jsx>{`
        .style-568441 {
          background: ${Styles.color_desc};
        }
        .month {
          color: ${Styles.color_sub};
        }
        .day-box {
          position: relative;
        }
        .sign-day {
          position: relative;
          width: 100%;
          display: inline-block;
        }
        .day-num {
          position: relative;
          display: inline-block;
          text-align: center;
          width: 100%;
          line-height: 0.7rem;
          color: ${Styles.color_sub};
        }
        .day-num:after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -0.2rem;
          display: inline-block;
          width: 0.04rem;
          height: 0.12rem;
          border-left: 1px solid #979797;
        }
        .day-num:before {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -0.35rem;
          transform: translate(-50%, 0);
          display: inline-block;
          padding-left: 0.16rem;
          width: 100%;
          height: 0.12rem;
          border-top: 1px solid #979797;
        }
        .${prefixCls}__btn-get_active {
          color: #f5a623;
        }
        .today {
          color: ${Styles.color_primary} !important;
        }
      `}</style>
    </div>
  );
};

Progress.contextTypes = {
  $: PropTypes.object
};

export default observer(Progress);
