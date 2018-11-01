/**
 * const prefixCls = 'style-153499';
 * const images = '/static/images/src/person/level/Index';
 * @Author: czy0729
 * @Date: 2018-10-25 18:08:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 23:34:08
 * @Path bt_mb_new /src/person/level/Index/_Grade.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Progress } from 'antd-mobile';
import { observer } from '@';
import { Level } from '@_';
import { Flex } from '@components';
import Styles from '@styles';

const prefixCls = 'style-153499';

const _Grade = (props, { $ }) => {
  const { grade, ldPoint, minScore, maxScore, className, _loaded } = $.getState(
    'grade'
  );
  const levelNeedScore = maxScore - minScore;
  const levelCurrentScore = ldPoint - minScore;
  const levelCurrentNeedScore = levelNeedScore - levelCurrentScore || 0;
  const percent = parseFloat(
    (levelCurrentScore / levelNeedScore) * 100
  ).toFixed(1);

  const nextGrade = parseInt(grade) + 1;

  return (
    <div className={classNames(prefixCls, className)}>
      {_loaded && (
        <>
          <p className="t-26 l-36 t-sub t-c">
            <span>还需</span>
            <span className="t-danger ml-xs mr-xs">
              {levelCurrentNeedScore}
            </span>
            <span>经验</span>
          </p>
          <Flex>
            <div className="t-c">
              <Level
                value={grade || 1}
                style={{ width: '0.56rem', height: '0.52rem' }}
              />
              <p className="t-24 l-34 t-sub mt-16">
                LV.
                {grade || 1}
              </p>
            </div>
            <Flex.Item className="ml-sm">
              <Progress percent={percent} position="normal" />
            </Flex.Item>
            <div className="t-c ml-sm">
              <Level
                value={nextGrade || 2}
                style={{ width: '0.56rem', height: '0.52rem' }}
              />
              <p className="t-24 l-34 t-sub mt-16">
                LV.
                {nextGrade || 2}
              </p>
            </div>
          </Flex>
        </>
      )}

      <style jsx global>{`
        .style-153499 {
        }
        .${prefixCls} .am-progress-outer {
          margin-top: -0.32rem;
          border-radius: 0.04rem;
          overflow: hidden;
        }
        .${prefixCls} .am-progress-bar {
          border-width: 0.04rem;
        }
      `}</style>
      <style jsx>{`
        .style-153499 {
          min-height: 1.78rem;
          padding: 0 1rem 0.4rem;
          background: ${Styles.color_theme};
        }
        .level {
          width: 3.86rem;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .myprogress {
          display: inline-block;
          width: 3.6rem;
        }
      `}</style>
    </div>
  );
};

_Grade.contextTypes = {
  $: PropTypes.object
};

export default observer(_Grade);
