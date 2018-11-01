/**
 * const prefixCls = 'style-909348';
 * const images = '/static/images/src/person/help/Detail';
 * @Author: czy0729
 * @Date: 2018-09-08 14:52:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 14:57:34
 * @Path m.benting.com.cn /src/person/help/Detail/_Content.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { DiscuzContent } from '@components';
import Styles from '@styles';

const prefixCls = 'style-909348';

const _Content = (props, { $ }) => {
  const { tit, con } = $.getState('helpDetail');

  return (
    <div className={prefixCls}>
      <p className="t-48 l-64 t-title t-b">{tit}</p>
      <DiscuzContent className="t-34 l-48 mt-48" html={{ __html: con }} />

      <style jsx>{`
        .style-909348 {
          padding: 0.24rem ${Styles.wind};
        }
      `}</style>
    </div>
  );
};

_Content.contextTypes = {
  $: PropTypes.object
};

export default observer(_Content);
