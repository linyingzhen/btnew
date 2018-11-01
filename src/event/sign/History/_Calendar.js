/* eslint-disable react/no-array-index-key */
/**
 * const prefixCls = 'style-149011';
 * const images = '/static/images/src/event/sign/History';
 * @Author: czy0729
 * @Date: 2018-10-18 01:49:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 20:15:14
 * @Path m.benting.com.cn /src/event/sign/History/_Calendar.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-149011';
const dayDS = ['日', '一', '二', '三', '四', '五', '六'];

@observer
export default class _Calendar extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  state = {
    distance: 0
  };

  prev = () => {
    const { $ } = this.context;
    const { distance } = this.state;

    this.setState({
      distance: distance - 1
    });

    $.page.change(Math.abs(distance - 1));
  };

  next = () => {
    const { $ } = this.context;
    const { distance } = this.state;

    this.setState({
      distance: distance + 1
    });

    $.page.change(Math.abs(distance + 1));
  };

  render() {
    const { $ } = this.context;
    const { className } = this.props;
    const { distance } = this.state;
    const { list } = $.getState('signRecord');

    const signRecordMap = {};
    if (list.length) {
      list.forEach(item => {
        signRecordMap[
          `${String(item.dateYm).replace('-', '/')}/${item.dayNumber}`
        ] = true;
      });
    }

    let targetTimestamp;
    if (distance === 0) {
      targetTimestamp = Utils.getTimestamp();
    } else {
      // 计算实际月份
      const date = new Date();
      const currentDateFirstDay = new Date(
        date.getFullYear(),
        date.getMonth() + distance,
        1
      );
      targetTimestamp = Utils.toTimestamp(currentDateFirstDay);
    }

    const today = Utils.date('Y/m/d', Utils.getTimestamp());
    const [y, m] = Utils.date('Y/m', targetTimestamp)
      .split('/')
      .map(item => parseInt(item));

    const lastDayOfMonth = new Date(y, m, 0).getDate(); // 本月有多少天
    const daysOfMonthDS = []; // 全月天枚举
    for (let i = 1; i <= lastDayOfMonth; i += 1) {
      daysOfMonthDS.push(i);
    }

    const firstDay = new Date(`${y}/${m}/01`).getDay(); // 第一天星期几
    const emptyDS = []; // 留空
    for (let i = 0; i < firstDay; i += 1) {
      emptyDS.push('');
    }

    return (
      <div className={classNames(prefixCls, className)}>
        <Flex className="header" justify="center">
          <Icon className="t-32 t-sub" type="left" onClick={this.prev} />
          <span className="t-34 l-48 t-sub ml-sm">
            {y}年{m}月
          </span>
          <Icon className="t-32 t-sub ml-sm" type="right" onClick={this.next} />
        </Flex>
        <div className="body mt-32">
          {dayDS.map(item => (
            <div className="cell day" key={item}>
              {item}
            </div>
          ))}
          {emptyDS.map((item, index) => (
            <div className="cell" key={index}>
              {item}
            </div>
          ))}
          {daysOfMonthDS.map(item => (
            <div className="cell" key={item}>
              <span
                className={classNames('num', {
                  'num-active': signRecordMap[`${y}/${m}/${item}`],
                  'num-today': today === `${y}/${m}/${item}`
                })}
              >
                {item}
              </span>
            </div>
          ))}
        </div>

        <style jsx>{`
          .style-149011 {
          }
          .body {
            padding: 0.16rem 0.16rem 0.4rem;
            background: ${Styles.color_theme};
            border-radius: 0.08rem;
            box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.12);
          }
          .cell {
            display: inline-block;
            position: relative;
            width: 14.28%;
            padding: 0.16rem 0;
            padding: 2.4vw 0;
            font-size: ${Styles.t_34};
            line-height: 0.48rem;
            text-align: center;
          }
          .day {
            color: #212c4c;
          }
          .num {
            display: inline-block;
            vertical-align: top;
            width: 0.48rem;
            height: 0.48rem;
            color: ${Styles.color_sub};
            border-radius: 50%;
          }
          .num-active {
            color: #212c4c;
            background: #d9ebff;
          }
          .num-today {
            color: ${Styles.color_primary} !important;
            border: 0.02rem solid ${Styles.color_primary};
          }
        `}</style>
      </div>
    );
  }
}
