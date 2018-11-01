/**
 * const prefixCls = 'style-179877';
 * const images = '/static/images/src/shop/auction/Detail';
 * @Author: czy0729
 * @Date: 2018-09-11 16:10:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-11 16:32:30
 * @Path m.benting.com.cn /src/shop/auction/Detail/_Rule.js
 */
import React from 'react';
import classNames from 'classnames';
import { ToggleRule } from '@_';
import { ruleDS } from './ds';

const prefixCls = 'style-179877';

const _Rule = ({ className }) => (
  <ToggleRule
    className={classNames(prefixCls, className)}
    title="竞拍规则"
    data={ruleDS}
  />
);

export default _Rule;
