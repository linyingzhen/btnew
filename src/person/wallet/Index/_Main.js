/**
 * const prefixCls = 'style-133454';
 * const images = '/static/images/src/index/Sign';
 * @Author: cwz0525
 * @Date: 2018-07-12 11:02:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-12 17:55:59
 * @Path m.benting.com.cn /src/person/wallet/Index/__Main.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Link } from '@components';
import Styles from '@styles';
import FlowWrap from '../_/FlowWrap';

const prefixCls = 'style-133454';

const _Main = (props, { $ }) => {
  const { className } = props;
  const { amount = 0, btAmount = '-', sysAmount = '-' } = $.getState(
    'walletInfo'
  );
  const { point = '-' } = $.getState('userInfo');
  const hasNidoAmount = !!parseFloat(amount);

  return (
    <FlowWrap className={classNames(prefixCls, className)}>
      <Link href="/person/wallet/flow" block>
        <p className=" t-void t-c">
          <span className="t-32 l-42">本汀余额</span>
          {hasNidoAmount && <span className="t-22 ml-sm">(灵动)</span>}
        </p>
        <p className="t-void t-c">
          <span className="t-72 l-100">{btAmount}</span>
          {hasNidoAmount && <span className="t-32 ml-sm">({amount})</span>}
        </p>
      </Link>
      <Flex className="mt-40">
        <Flex.Item href="/person/wallet/coin/flow">
          <p className="t-24 l-34 t-void t-c">金币</p>
          <p className="t-48 l-66 t-void t-c mt-4">{sysAmount}</p>
        </Flex.Item>
        <Flex.Item
          className={`${prefixCls}__right`}
          href="/person/wallet/score/flow"
        >
          <p className="t-24 l-34 t-void t-c">积分</p>
          <p className="t-48 l-66 t-void t-c mt-4">{point}</p>
        </Flex.Item>
      </Flex>

      <style jsx global>{`
        .style-133454 {
        }
        .${prefixCls}__right {
          margin-left: 0;
          border-left: ${Styles.border};
        }
      `}</style>
    </FlowWrap>
  );
};

_Main.contextTypes = {
  $: PropTypes.object
};

export default observer(_Main);
