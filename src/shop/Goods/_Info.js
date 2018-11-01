/**
 * const prefixCls = 'style-865201';
 * const images = '/static/images';
 * @Author: cwz0525
 * @Date: 2018-09-05 15:31:27
 * @Last Modified by: cwz0525
 * @Last Modified time: 2018-09-06 09:26:38
 * @Path newProject \src\shop\Goods\_Info.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import Top from './__Top';
import Middle from './__Middle';
import Styles from '@styles';

const prefixCls = 'style-865201';
const Info = (props, { $ }) => {
  const { className } = props;
  const goods = $.getState('goodsDetails');

  return (
    <div className={classNames(prefixCls, className)}>
      <Top {...goods} />
      <Middle {...goods} />
      <style jsx>{`
        .${prefixCls} {
          background: ${Styles.color_void};
        }
      `}</style>
    </div>
  );
};

Info.contextTypes = {
  $: PropTypes.object
};

export default observer(Info);
