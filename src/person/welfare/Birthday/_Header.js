/**
 * const prefixCls = 'style-642955';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-08 14:19:32
 * @Last Modified by:   lyz0720
 * @Last Modified time: 2018-11-08 14:19:32
 * @Path bt_mb_new \src\person\welfare\Birthday\_Header.js.git
 */
import React from 'react';
import { observer } from '@';
import { Header, Flex } from '@components';
import Styles from '@styles';

const _Header = () => (
  <Header
    show
    bd={
      <Flex justify="center">
        <p className="t-34 l-48 t-void t-c">生日尊享</p>
      </Flex>
    }
    style={{
      color: Styles.color_theme,
      background: Styles.color_main
    }}
  />
);

export default observer(_Header);
