/**
 * const prefixCls = 'style-158725';
 * const images = '/static/images/src/bbs/Article/_Competition';
 * @Author: czy0729
 * @Date: 2018-07-14 23:39:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-29 18:06:18
 * @Path m.benting.com.cn /src/bbs/Article/_Competition/_Player.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { List, Flex, Badge } from 'antd-mobile';
import { observer } from '@';
import { Button, Img, Empty } from '@components';
import { Header } from '@_';
import Utils from '@utils';
import Styles from '@styles';
import { images } from '../ds';

const prefixCls = 'style-158725';

const _Player = (props, { $ }) => {
  const { className } = props;
  const { guessingData = {} } = $.getState('detail');
  const {
    competitionPlayers = [],
    competitionBettingEnd,
    competitionWinner
  } = guessingData;

  const isCanGuess =
    Utils.getTimestamp() < competitionBettingEnd && !$.isCompetitionEnd;

  // 计算支持占比
  const sumAmount = competitionPlayers.length
    ? competitionPlayers.map(item => item.amount).reduce((a, b) => a + b)
    : 0;

  const percentAmount = {};
  competitionPlayers.forEach(item => {
    if (sumAmount) {
      let percent = (item.amount / sumAmount).toFixed(2);
      const realPercent = percent;

      percent = Math.max(percent, 0.05);
      percent = Math.min(percent, 0.95);
      percentAmount[item.id] = {
        percent,
        realPercent
      };
    } else {
      percentAmount[item.id] = {
        percent: 0.1,
        realPercent: 0
      };
    }
  });

  return (
    <div className={classNames(prefixCls, className)}>
      <Header title="参赛选手" isList />
      {competitionPlayers.length ? (
        <List>
          {competitionPlayers.map((item, index) => (
            <List.Item
              key={item.id}
              wrap
              thumb={<Img src={item.avatar} size="0.72rem" circle />}
            >
              <Flex>
                <Flex.Item>
                  <Flex>
                    <Badge
                      text={index + 1}
                      style={{
                        backgroundColor: Styles.color_primary,
                        borderRadius: 2
                      }}
                    />
                    <span className="t-30 l-44 ml-sm">{item.name}</span>
                  </Flex>
                  <p className="t-24 l-36 t-sub mt-8">{item.description}</p>
                </Flex.Item>
                <div
                  className="wrap-btn ml-sm"
                  onClick={
                    isCanGuess ? undefined : () => Utils.light('当前不可支持')
                  }
                >
                  {isCanGuess ? (
                    <Button
                      className={`${prefixCls}__btn-betting`}
                      inline
                      size="sm"
                      onClick={() =>
                        Utils.checkLogin(() => $.page.showBettingModal(item))
                      }
                    >
                      支持TA
                    </Button>
                  ) : (
                    <Button
                      className={`${prefixCls}__btn-betting`}
                      inline
                      disabled
                      size="sm"
                    >
                      支持TA
                    </Button>
                  )}
                  <div
                    className="line"
                    style={{
                      width: `${percentAmount[item.id].percent * 100}%`
                    }}
                  />
                  {item.id === competitionWinner && (
                    <img
                      className="img-winner"
                      src={`${images}/winner.png`}
                      alt=""
                    />
                  )}
                </div>
              </Flex>
            </List.Item>
          ))}
        </List>
      ) : (
        <Empty>参赛选手暂未录入</Empty>
      )}

      <style jsx global>{`
        .style-158725 {
        }
        .${prefixCls}__btn-betting {
          vertical-align: top;
          overflow: initial;
        }
        .${prefixCls}__btn-betting span {
          padding-bottom: 0.04rem;
        }
      `}</style>
      <style jsx>{`
        .style-158725 {
        }
        .wrap-btn {
          position: relative;
          padding: 0.02rem;
        }
        .line {
          display: inline-block;
          position: absolute;
          bottom: ${Styles.radius_xs};
          left: ${Styles.radius_xs};
          height: 0.04rem;
          background: ${Styles.color_primary};
          border-radius: ${Styles.radius_xs};
        }
        .img-winner {
          position: absolute;
          top: 50%;
          right: 1.44rem;
          width: auto;
          height: 0.8rem;
          transform: translateY(-50%);
        }
      `}</style>
    </div>
  );
};

_Player.contextTypes = {
  $: PropTypes.object
};

export default observer(_Player);
