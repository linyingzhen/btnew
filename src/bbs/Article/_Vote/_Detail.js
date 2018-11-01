/**
 * const prefixCls = 'style-195450';
 * const images = '/static/images/src/bbs/Article/_Vote';
 * @Author: czy0729
 * @Date: 2018-10-10 16:56:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-11 17:32:28
 * @Path m.benting.com.cn /src/bbs/Article/_Vote/_Detail.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import { goodsDS } from '../ds';

const prefixCls = 'style-195450';
const goodsMap = {};
goodsDS.forEach(item => {
  item.child.forEach(i => {
    goodsMap[i.gid] = {
      title: i.title,
      desc: i.desc,
      minPrice: i.minPrice,
      maxPrice: i.maxPrice
    };
  });
});

const _Detail = (props, { $ }) => {
  const { onHide } = props;
  const { refreshing } = $.getState('_vote');
  const {
    finalVoteTime,
    list = [],
    votedGoodsList = [],
    voteNum = '-',
    personTotal = '-'
  } = $.getState('vote');

  const listMap = {};
  list.forEach(item => {
    listMap[item.gid] = item.vote_num;
  });

  const votedGoodsListMap = {};
  votedGoodsList.forEach(item => {
    votedGoodsListMap[item] = true;
  });

  return (
    <div>
      <div className={prefixCls}>
        <div className="header-placeholder" />
        <div className="wrap-scroll">
          <div className="wrap-series">
            <Flex>
              <Flex.Item>
                <p>
                  <span className="t-24 l-34 t-theme">您的投票号为：</span>
                  <span className="t-36 l-44 t-danger">{voteNum}</span>
                </p>
              </Flex.Item>
              <p className="t-24 l-34 t-sub">
                投票总人数：
                {personTotal}
              </p>
            </Flex>
            <Flex className="mt-16">
              <Flex.Item>
                <span className="t-24 l-34 t-sub">
                  以下是 {Utils.date('m月d日 H:i', finalVoteTime)} 投票结果
                </span>
              </Flex.Item>
              <span
                className="t-24 l-34 t-theme"
                onClick={$.page.refreshVoteInfo}
              >
                {refreshing ? '刷新中' : '点击刷新'}
              </span>
            </Flex>
          </div>
          <div>
            <div className="wrap-series">
              <p className="t-c">
                <span className="tag t-theme t-36 l-48 t-b">投票排行榜</span>
              </p>
              {list.map((i, index) => (
                <Row
                  key={i.gid}
                  gid={i.gid}
                  index={index}
                  num={listMap[i.gid]}
                  me={votedGoodsListMap[i.gid]}
                />
              ))}
            </div>
            {goodsDS.map(item => (
              <div key={item.label} className="wrap-series">
                <p className="t-c">
                  <span className="tag t-theme t-36 l-48 t-b">
                    {item.label}
                    系列
                  </span>
                </p>
                {item.child.map(i => (
                  <Row
                    key={i.gid}
                    gid={i.gid}
                    num={listMap[i.gid]}
                    me={votedGoodsListMap[i.gid]}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="header t-c">
        <Icon
          className={`${prefixCls}__icon-back t-32 l-44 t-void`}
          type="cross"
          onClick={onHide}
        />
        <span className="t-32 l-44 t-void">投票实时数据</span>
      </div>

      <style jsx global>{`
        .style-195450 {
        }
        .${prefixCls}__icon-back {
          position: absolute;
          left: ${Styles.wind};
          top: 50%;
          transform: translateY(-50%);
        }
      `}</style>
      <style jsx>{`
        .style-195450 {
          position: fixed !important;
          z-index: 998;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: ${Styles.color_bg};
          overflow-y: scroll;
          transform: translateZ(0);
        }
        .wrap-scroll {
          padding: 0 ${Styles.wind} 0.64rem;
        }
        .wrap-series {
          padding: 0.32rem 0.16rem 0.56rem;
          border-bottom: 0.01rem solid ${Styles.color_border};
        }
        .wrap-series:last-child {
          border-bottom: 0;
        }

        .t-theme {
          color: #131768;
        }

        .header {
          position: fixed;
          z-index: 1000;
          top: 0;
          left: 0;
          right: 0;
          height: 0.96rem;
          line-height: 0.96rem;
          background: #0e1324;
          transform: translateZ(0);
        }
        .header-placeholder {
          height: 0.96rem;
        }
        .img-back {
          position: absolute;
          left: ${Styles.sm};
          top: 50%;
          height: 0.26rem;
          transform: translateY(-50%);
        }
        .tag {
          position: relative;
        }
        .tag:before {
          content: '';
          position: absolute;
          z-index: -1;
          bottom: 0;
          left: 0;
          width: 1.44rem;
          height: 0.16rem;
          background: linear-gradient(90deg, #b1dcff, #80bbff);
          border-radius: 0.16rem;
        }
      `}</style>
    </div>
  );
};

_Detail.contextTypes = {
  $: PropTypes.object
};

export default observer(_Detail);

const Row = observer(({ num, me, index, gid }) => (
  <Flex className="mt-32" align="start">
    <p
      className={classNames('p-num t-22 l-44', {
        't-sub': index > 2,
        't-gold': index < 3
      })}
    >
      {num || 0}票
    </p>
    <Flex.Item>
      <p
        className={classNames('t-32 l-44', {
          't-danger': me
        })}
      >
        {goodsMap[gid].title}
      </p>
      {goodsMap[gid].desc && (
        <p
          className={classNames('t-26 l-44 mt-4', {
            't-sub': !me,
            't-danger': me
          })}
        >
          {goodsMap[gid].desc}
        </p>
      )}
    </Flex.Item>
    {goodsMap[gid].minPrice === goodsMap[gid].maxPrice ? (
      <p className="t-sub ml-sm">
        <span className="t-22 l-44">¥</span>
        <span className="t-28 l-44">{goodsMap[gid].minPrice}</span>
      </p>
    ) : (
      <p className="t-sub ml-sm">
        <span className="t-22 l-44">¥</span>
        <span className="t-28 l-44">{goodsMap[gid].minPrice}-</span>
        <span className="t-22 l-44">¥</span>
        <span className="t-28 l-44">{goodsMap[gid].maxPrice}</span>
      </p>
    )}

    <style jsx>{`
      .style-195450 {
      }
      .p-num {
        min-width: 0.8rem;
      }
    `}</style>
  </Flex>
));
