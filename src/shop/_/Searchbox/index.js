/**
 * const prefixCls = 'style-137698';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-01 10:35:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-01 23:29:05
 * @Path bt_mb_new \src\shop\_\Searchbox\index.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-137698';

const _Searchbox = props => {
  const { className } = props;

  return (
    <div className={classNames(prefixCls, className)}>
      <Flex
        className={`${prefixCls}__searchbox`}
        onClick={() => Utils.router.push('/shop/search')}
      >
        <Flex.Item>
          <p className="t-30 l-42 t-sub">请输入想要搜索的内容</p>
        </Flex.Item>
        <Icon className="t-32" type="search" />
      </Flex>

      <style jsx global>{`
        .style-137698 {
          padding: ${Styles.wind} ${Styles.wind} 0;
          background: ${Styles.color_void} !important;
        }
        .${prefixCls}__searchbox {
          padding: ${Styles.sm} ${Styles.wind};
          background: ${Styles.color_theme};
          border: 0.02rem solid ${Styles.color_border};
        }
      `}</style>
    </div>
  );
};

_Searchbox.contextTypes = {
  $: PropTypes.object
};

export default observer(_Searchbox);
