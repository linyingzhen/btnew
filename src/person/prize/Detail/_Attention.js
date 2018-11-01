/**
 * const prefixCls = 'style-101574';
 * const images = '/static/images/src/person/prize/Detail';
 * @Author: lyz0720
 * @Date: 2018-09-14 10:38:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 14:09:54
 * @Path bt_mb_new /src/person/prize/Detail/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Flex, Icon } from '@components';
import Styles from '@styles';

const prefixCls = 'style-101574';

const _Attention = (props, { $ }) => {
  const { ww = '-' } = $.getState('detail');

  return (
    <Flex className={prefixCls} justify="center">
      <Icon className="t-26 t-event" type="information-circle-fill" />
      <p className="t-24 l-34 ml-xs">
        <span className="t-void">请务必使用此旺旺ID＂</span>
        <span className="t-event">{ww}</span>
        <span className="t-void">＂进行购买</span>
      </p>

      <style jsx global>{`
        .style-101574 {
          padding: 0.16rem ${Styles.wind};
          background: ${Styles.color_danger};
        }
      `}</style>
    </Flex>
  );
};

_Attention.contextTypes = {
  $: PropTypes.object
};

export default observer(_Attention);
