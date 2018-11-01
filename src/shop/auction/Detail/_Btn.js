/**
 * const prefixCls = 'style-265145';
 * const images = '/static/images/src/shop/auction/Detail';
 * @Author: czy0729
 * @Date: 2018-09-11 17:46:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 09:21:27
 * @Path m.benting.com.cn /src/shop/auction/Detail/_Btn.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Stepper } from 'antd-mobile';
import { observer } from '@';
import { Button, Flex } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import { showStateDS } from '../Index/ds';

const prefixCls = 'style-265145';

const _Btn = (props, { $ }) => {
  const { amount } = $.getState('_payConfirm');
  const { showState = 1, addPrice = 10, currentPrice = 0, _loaded } = $.getState(
    'detail'
  );

  if (!_loaded) {
    return null;
  }

  const _showState = Utils.getLabel(showStateDS, showState);

  if (_showState === '预告中') {
    return (
      <div className={prefixCls}>
        <Button disabled>未开始</Button>

        <style jsx global>{`
          .style-265145 {
            position: fixed;
            z-index: 2;
            right: 0;
            bottom: 0;
            left: 0;
            padding: 0.24rem ${Styles.wind};
            margin-bottom: -0.01rem;
            background: ${Styles.color_theme};
            border-top: ${Styles.border};
            box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.48);
          }
        `}</style>
      </div>
    );
  }

  if (_showState === '进行中') {
    const min = parseInt(currentPrice) + parseInt(addPrice);

    return (
      <Flex className={prefixCls}>
        <Flex.Item className="t-c">
          <Stepper
            showNumber
            min={min}
            step={parseInt(addPrice)}
            value={amount}
            onChange={$.page.onStepperChange}
          />
        </Flex.Item>
        <Flex.Item>
          <Button
            type="primary"
            onClick={() => Utils.checkLogin($.page.checkAdd)}
          >
            出价
          </Button>
        </Flex.Item>

        <style jsx global>{`
          .style-265145 {
            position: fixed;
            z-index: 2;
            right: 0;
            bottom: 0;
            left: 0;
            padding: 0.24rem ${Styles.wind};
            margin-bottom: -0.01rem;
            background: ${Styles.color_theme};
            border-top: ${Styles.border};
            box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.48);
          }
        `}</style>
      </Flex>
    );
  }

  return null;
};

_Btn.contextTypes = {
  $: PropTypes.object
};

export default observer(_Btn);
