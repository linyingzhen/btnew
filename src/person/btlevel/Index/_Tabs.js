/**
 * const prefixCls = 'style-126110';
 * const images = '/static/images/src/person/btlevel/Index';
 * @Author: lyz0720
 * @Date: 2018-10-26 10:06:33
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-11-13 17:25:34
 * @Path bt_mb_new /src/person/btlevel/Index/_Tabs.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import Styles from '@styles';
import Grade from './_Grade';
import Task from './_Task';
import Score from './_Score';

const prefixCls = 'style-126110';

const _Tabs = (props, { $ }) => {
  const { className } = props;
  const { active } = $.getState('_tabs');

  const isGrade = active === '用户等级';
  const isScore = active === '积分记录';

  return (
    <div className={classNames(prefixCls, className)}>
      <div className="tabs">
        <div
          className={classNames('tab', {
            'tab-active': isGrade
          })}
          onClick={() => $.page.onTabClick('用户等级')}
        >
          用户等级
        </div>
        <div
          className={classNames('tab ml-48', {
            'tab-active': isScore
          })}
          onClick={() => $.page.onTabClick('积分记录')}
        >
          积分记录
        </div>
        <div
          className="line"
          style={{
            left: isScore ? `${1.68 + Styles.wind_raw}rem` : Styles.wind
          }}
        >
          &nbsp;
        </div>
      </div>
      {isGrade && (
        <div>
          <Grade />
          <Task className="mt-d" />
        </div>
      )}
      {isScore && (
        <div className="score mt-d">
          <Score />
        </div>
      )}

      <style jsx>{`
        .style-126110 {
        }
        .tabs {
          position: relative;
          min-height: 1.68rem;
          padding: 0.8rem ${Styles.wind} ${Styles.bottom};
          background: ${Styles.color_theme};
        }
        .tab {
          display: inline-block;
          position: relative;
          z-index: 1;
          height: 0.42rem;
          font-size: 0.3rem;
          line-height: 0.42rem;
          color: ${Styles.color_sub};
          transfrom: translateZ(0);
          transition: all 0.3s;
        }
        .tab-active {
          height: 0.48rem;
          font-size: 0.34rem;
          font-weight: bold;
          color: ${Styles.color_title};
        }
        .line {
          position: relative;
          content: '';
          position: absolute;
          z-index: 0;
          bottom: 0.48rem;
          width: 1.36rem;
          height: 0.12rem;
          background: linear-gradient(90deg, #5ac2ff, #2e8eff);
          border-radius: 0.16rem;
          transition: left 0.3s;
        }
        .right {
          float: right;
        }
        .score {
          background: ${Styles.color_bg};
        }
      `}</style>
    </div>
  );
};

_Tabs.contextTypes = {
  $: PropTypes.object
};

export default observer(_Tabs);
