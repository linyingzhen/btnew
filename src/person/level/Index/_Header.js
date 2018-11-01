/**
 * const prefixCls = 'style-177130';
 * const images = '/static/images/src/person/level/Index';
 * @Author: czy0729
 * @Date: 2018-10-25 16:41:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 02:33:15
 * @Path bt_mb_new /src/person/level/Index/_Header.js
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
        <p className="t-34 l-48 t-void t-c">灵动等级</p>
        <Link
          className="t-30 l-42 t-sub t-c ml-48"
          href="/person/btlevel"
          replace
        >
          本汀等级
        </Link>
      </Flex>
    }
    style={{
      color: Styles.color_theme,
      background: Styles.color_main
    }}
  />
);

export default observer(_Header);
