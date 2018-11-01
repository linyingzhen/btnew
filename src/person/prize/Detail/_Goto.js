/**
 * const prefixCls = 'style-843113';
 * const images = '/static/images/src/person/prize/Detail';
 * @Author: lyz0720
 * @Date: 2018-09-14 15:12:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 14:05:54
 * @Path bt_mb_new /src/person/prize/Detail/_Goto.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon } from '@components';
import Styles from '@styles';
import { images } from './ds';

const prefixCls = 'style-843113';

const _Goto = ({ className }) => (
  <div className={classNames(prefixCls, className)}>
    <Flex className="goto" href="https://benting.tmall.com">
      <img className="img-tmall ml-sm" src={`${images}/icon_goto.png`} alt="" />
      <Flex.Item className="t-34 l-48">前往天猫</Flex.Item>
      <Icon className="t-32" type="right" />
    </Flex>

    <style jsx>{`
      .style-843113 {
        padding: 0.32rem 0;
        margin: 0 0.64rem;
        border-top: 0.02rem dashed ${Styles.color_border};
      }
      .img-tmall {
        width: 0.28rem;
        height: 0.32rem;
      }
    `}</style>
  </div>
);

_Goto.contextTypes = {
  $: PropTypes.object
};

export default observer(_Goto);
