/**
 * const prefixCls = 'style-557743';
 * const images = '/static/images/src/person/wallet/coin/Exchange';
 * @Author: czy0729
 * @Date: 2018-09-14 18:26:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-17 09:45:06
 * @Path m.benting.com.cn /src/person/wallet/coin/Exchange/_Blocks.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import Styles from '@styles';
import { amountDS } from './ds';

const prefixCls = 'style-557743';

const _Block = ({ className }, { $ }) => (
  <div className={classNames(prefixCls, className)}>
    {amountDS.map(item => (
      <div
        key={item.label}
        className="item"
        onClick={() =>
          $.page.showPayConfirm({
            price: item.label
          })
        }
      >
        <p className="t-34 l-44 t-primary t-b t-c">{item.label}枚</p>
        <p className="t-30 l-44 t-sub t-c mt-8">¥ {item.value}</p>
      </div>
    ))}

    <style jsx>{`
      .style-557743 {
        padding: 0 ${Styles.wind};
      }
      .item {
        display: inline-block;
        width: 32%;
        padding: 0.56rem 0;
        margin-right: 1.66666%;
        background: ${Styles.color_theme};
        border: 0.02rem solid rgba(220, 236, 255, 1);
      }
      .item:nth-of-type(3n) {
        margin-right: 0;
      }
      .item:nth-of-type(n + 3) {
        margin-top: 2%;
      }
    `}</style>
  </div>
);

_Block.contextTypes = {
  $: PropTypes.object
};

export default observer(_Block);
