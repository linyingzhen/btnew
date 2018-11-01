/**
 * const prefixCls = 'style-645581';
 * const images = '/static/images/src/school/Index';
 * @Author: czy0729
 * @Date: 2018-09-05 14:24:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-05 18:35:13
 * @Path m.benting.com.cn /src/school/Index/_Menu.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex } from '@components';
import Styles from '@styles';
import { menuDS } from './ds';

const prefixCls = 'style-645581';

const _Menu = (props, { $ }) => {
  const { className } = props;
  const { activeIndex } = $.getState('_menu');

  return (
    <Flex className={classNames(prefixCls, className)} wrap="wrap">
      {menuDS.map((item, index) => (
        <div
          key={item.label}
          className={classNames('item t-c', {
            't-sub': index !== activeIndex,
            'item-active': index === activeIndex
          })}
        >
          {item.label}
        </div>
      ))}

      <style jsx global>{`
        .style-645581 {
          padding: ${Styles.wind};
          background: ${Styles.color_theme};
        }
      `}</style>
      <style jsx>{`
        .style-645581 {
        }
        .item {
          display: inline-block;
          width: 24%;
          padding: 0.12rem 0.16rem;
          margin-right: 1.33333%;
        }
        .item:nth-of-type(4n) {
          margin-right: 0;
        }
        .item:nth-of-type(n + 5) {
          margin-top: 0.16rem;
        }
        .item-active {
          color: #fff;
          background: ${Styles.color_main};
          border-radius: 0.04rem;
        }
      `}</style>
    </Flex>
  );
};

_Menu.contextTypes = {
  $: PropTypes.object
};

export default observer(_Menu);
