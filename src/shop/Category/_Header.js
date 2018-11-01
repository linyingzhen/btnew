/**
 * const prefixCls = 'style-150685';
 * const images = '/static/images/src/shop/Index';
 * @Author: czy0729
 * @Date: 2018-09-29 17:39:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-30 10:23:47
 * @Path m.benting.com.cn /src/shop/Index/_Header.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Header, Flex, Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-150685';

const _Header = (props, { $ }) => (
  <Header show>
    <Flex className={prefixCls}>
      <Flex.Item>
        <Flex>
          <div className="wrap-icon" onClick={Utils.router.back}>
            <Icon className="t-44" type="left" />
          </div>
          <span className="t-34 l-48 t-b">本汀商城</span>
        </Flex>
      </Flex.Item>
      <Icon className="t-44 t-b" type="list" onClick={$.page.showMenu} />

      <style jsx global>{`
        .style-150685 {
          width: 100%;
          padding: ${Styles.wind};
          background: ${Styles.color_theme};
          border-bottom: ${Styles.border};
        }
      `}</style>
      <style jsx>{`
        .style-150685 {
        }
        .wrap-icon {
          padding-right: 0.16rem;
          margin-right: 0.24rem;
          border-right: ${Styles.border};
        }
      `}</style>
    </Flex>
  </Header>
);

_Header.contextTypes = {
  $: PropTypes.object
};

export default _Header;
