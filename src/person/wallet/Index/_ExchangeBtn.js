/**
 * const prefixCls = 'style-178649';
 * const images = '/static/images/src/person/wallet/Index';
 * @Author: czy0729
 * @Date: 2018-09-13 09:16:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-13 09:28:47
 * @Path m.benting.com.cn /src/person/wallet/Index/_ExchangeBtn.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon } from '@components';
import Styles from '@styles';

const prefixCls = 'style-178649';

const _ExchangeBtn = ({ className }) => (
  <Flex
    className={classNames(prefixCls, className)}
    href="/person/wallet/exchange"
  >
    <Icon className="t-48 t-primary" type="transfer-circle-fill" />
    <p className="t-30 l-42 t-sub ml-16">余额划转</p>

    <style jsx global>{`
      .style-178649 {
        padding: 0.08rem 0.24rem 0.08rem 0.08rem;
        margin-right: -${Styles.wind};
        background: ${Styles.color_theme};
        border-top-left-radius: 0.32rem;
        border-bottom-left-radius: 0.32rem;
        box-shadow: 0 0.08rem 0.16rem 0 rgba(32, 86, 148, 0.2);
      }
    `}</style>
  </Flex>
);

export default observer(_ExchangeBtn);
