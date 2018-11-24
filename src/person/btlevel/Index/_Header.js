/**
 * const prefixCls = 'style-197891';
 * const images = '/static/images/src/person/btlevel/Index';
 * @Author: lyz0720
 * @Date: 2018-10-26 09:55:54
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-11-13 17:24:23
 * @Path bt_mb_new /src/person/btlevel/Index/_Header.js.git
 */
import React from 'react';
import { observer } from '@';
import { Header, Flex, Link } from '@components';
import Styles from '@styles';

const _Header = () => (
  <Header
    show
    bd={
      <Flex justify="center">
        <Link className="t-30 l-42 t-sub t-c" href="/person/level" replace>
          灵动等级
        </Link>
        <p className="t-34 l-48 t-void t-c ml-48">本汀等级</p>
      </Flex>
    }
    style={{
      color: Styles.color_theme,
      background: Styles.color_main
    }}
  />
);

export default observer(_Header);
