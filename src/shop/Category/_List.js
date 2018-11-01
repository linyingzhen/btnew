/**
 * const prefixCls = 'style-935613';
 * const images = '/static/images/src/shop/Category';
 * @Author: czy0729
 * @Date: 2018-09-29 17:42:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-29 18:05:27
 * @Path m.benting.com.cn /src/shop/Category/_List.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { ListView } from '@components';
import Styles from '@styles';
import Row from './_Row';

const prefixCls = 'style-935613';

const _List = (props, { $ }) => {
  const { className } = props;
  const data = $.getState('goods');

  return (
    <div className={classNames(prefixCls, className)}>
      <ListView
        data={data}
        renderRow={item => <Row {...item} />}
        onEndReached={$.fetch.goods}
      />

      <style jsx>{`
        .style-935613 {
          padding: ${Styles.wind};
          background: ${Styles.color_theme};
        }
      `}</style>
    </div>
  );
};

_List.contextTypes = {
  $: PropTypes.object
};

export default observer(_List);
