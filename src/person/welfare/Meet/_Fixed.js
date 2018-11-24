/**
 * const prefixCls = 'style-128676';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-07 16:36:34
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-07 17:30:50
 * @Path bt_mb_new \src\person\welfare\Meet\_Fixed.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Button } from 'antd-mobile';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'styles-128676';

const _Fixed = (props, { $ }) => {
  const { className } = props;
  const { selectedIndex } = $.getState('state');
  const { getNum = 0 } = $.getState('lotteryList');

  return (
    <Flex className={classNames(prefixCls, className)}>
      <p className="text-sm">
        <span>共可领取</span>
        <span className="ml-xs mr-xs">{getNum}</span>
        <span>件</span>
      </p>
      <Flex.Item>
        <p className="text-sm text-right">
          <span>已选</span>
          <span className="text-primary ml-xs mr-xs">
            {selectedIndex.length}
          </span>
          <span>件</span>
        </p>
      </Flex.Item>
      <Button
        className={`${prefixCls}__btn text-sm ml-sm`}
        type="primary"
        disabled={selectedIndex.length < getNum || getNum === 0}
        onClick={() =>
          Utils.onConfirm(
            <div>
              <p className="text-sub">
                每个新用户仅一次领取机会，是否确定现在领取?
              </p>
              <p className="text-primary text-sm mt-xs">
                会员等级越高，礼品越棒哟！
              </p>
            </div>,
            $.do.doGet
          )
        }
      >
        立即领取
      </Button>

      <style jsx global>{`
        .styles-128676 {
        }
        .${prefixCls} {
          position: fixed;
          z-index: 100;
          left: 0;
          right: 0;
          bottom: 0;
          margin-bottom: -0.01rem;
          padding-left: ${Styles.sm};
          background: #fff;
          border-top: 0.01rem solid ${Styles.color_border};
        }
        .${prefixCls}__btn {
          width: 2rem;
        }
      `}</style>
    </Flex>
  );
};

_Fixed.contextTypes = {
  $: PropTypes.object
};

export default observer(_Fixed);
