/**
 * const prefixCls = 'style-885062';
 * const images = '/static/images/src/person/prize/Detail';
 * @Author: lyz0720
 * @Date: 2018-09-14 14:08:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 15:18:06
 * @Path bt_mb_new /src/person/prize/Detail/_Step.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Flex } from '@components';
import Styles from '@styles';

const prefixCls = 'style-885062';

const _Step = (props, { $ }) => {
  const { prizeType } = $.getState('detail');
  const isReal = prizeType == 1;

  return (
    <div className={prefixCls}>
      {isReal ? (
        <div className="step">
          <Flex align="start">
            <div className="dot" />
            <Flex.Item>
              <p className="t-30 l-42 t-b">1、购买本汀产品</p>
              <p className="t-24 l-34 t-sub mt-4">
                先在天猫《本汀旗舰店》把您需要的宝贝加入购物车
              </p>
            </Flex.Item>
          </Flex>
          <Flex className="mt-d" align="start">
            <div className="dot" />
            <Flex.Item>
              <p className="t-30 l-42 t-b">2、复制奖品口令</p>
              <p className="t-24 l-34 t-sub mt-4">复制本页面奖品口令</p>
            </Flex.Item>
          </Flex>
          <Flex className="mt-d" align="start">
            <div className="dot" />
            <Flex.Item>
              <p className="t-30 l-42 t-b">3、联系客服</p>
              <p className="t-24 l-34 t-sub mt-4">
                把奖品口令告诉客服，核实有效性，客服备注与商品打包一起发放
              </p>
            </Flex.Item>
          </Flex>
          <Flex className="mt-d" align="start">
            <div className="dot" />
            <Flex.Item>
              <p className="t-30 l-42 t-b">4、付款</p>
              <p className="t-24 l-34 t-sub mt-4">
                礼物会随订单一并邮寄到您的手中
              </p>
            </Flex.Item>
          </Flex>
        </div>
      ) : (
        <div className="step">
          <Flex align="start">
            <div className="dot" />
            <Flex.Item>
              <p className="t-30 l-42 t-b">1、天猫购买产品</p>
              <p className="t-24 l-34 t-sub mt-4">
                于指定购买时间在天猫《本汀旗舰店》购买
              </p>
            </Flex.Item>
          </Flex>
          <Flex className="mt-d" align="start">
            <div className="dot" />
            <Flex.Item>
              <p className="t-30 l-42 t-b">2、提交天猫订单号</p>
              <p className="t-24 l-34 t-sub mt-4">
                得到订单后提交并完善相关信息
              </p>
            </Flex.Item>
          </Flex>
          <Flex className="mt-d" align="start">
            <div className="dot" />
            <Flex.Item>
              <p className="t-30 l-42 t-b">3、发放现金奖励</p>
              <p className="t-24 l-34 t-sub mt-4">
                提交相关信息后请耐心等待发放
              </p>
            </Flex.Item>
          </Flex>
        </div>
      )}

      <style jsx>{`
        .style-885062 {
          position: relative;
          min-height: 4.2rem;
          padding: 0.64rem ${Styles.wind} ${Styles.bottom};
          overflow: hidden;
        }
        .${prefixCls}:before, .${prefixCls}:after {
          content: '';
          position: absolute;
          width: 0.64rem;
          height: 0.64rem;
          background: ${Styles.color_bg};
          border: ${Styles.border};
          border-radius: 50%;
        }
        .${prefixCls}:before {
          top: 0;
          left: 0;
          margin-top: -0.32rem;
          margin-left: -0.32rem;
        }
        .${prefixCls}:after {
          top: 0;
          right: 0;
          margin-top: -0.32rem;
          margin-right: -0.32rem;
        }
        .step {
          position: relative;
          margin: 0 0.24rem;
        }
        .step:before {
          content: '';
          position: absolute;
          left: 0.2rem;
          top: 0.24rem;
          bottom: 0;
          border-left: 0.02rem solid ${Styles.color_border};
        }
        .dot {
          width: 0.18rem;
          height: 0.18rem;
          margin: 0.14rem 0.12rem 0;
          background: ${Styles.color_primary};
          border-radius: 50%;
          transform: translateZ(0);
        }
      `}</style>
    </div>
  );
};

_Step.contextTypes = {
  $: PropTypes.object
};

export default observer(_Step);
