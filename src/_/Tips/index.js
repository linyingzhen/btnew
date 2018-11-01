/**
 * const prefixCls = 'style-177834';
 * const images = '/static/images/src/_/Tips';
 * @Author: czy0729
 * @Date: 2018-09-14 14:07:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-14 14:10:23
 * @Path m.benting.com.cn /src/_/Tips/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { Flex, Icon } from '@components';

const prefixCls = 'style-177834';

const Tips = ({ children, className }) => (
  <Flex className={classNames(prefixCls, 'p-w', className)} align="start">
    <Icon className="t-32 l-44 t-danger" type="information-circle-fill" />
    <Flex.Item className="t-28 l-44 t-sub">{children}</Flex.Item>
  </Flex>
);

export default Tips;
