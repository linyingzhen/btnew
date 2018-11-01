/**
 * const prefixCls = 'style-247171';
 * const images = '/static/images/src/person/prize/Detail';
 * @Author: lyz0720
 * @Date: 2018-09-17 10:15:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 15:16:49
 * @Path bt_mb_new /src/person/prize/Detail/_Coupon.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';

const prefixCls = 'style-247171';

const _Rule = (props, { $ }) => {
  const { className } = props;
  const { explain = '' } = $.getState('detail');

  return (
    <div className={classNames(prefixCls, className)}>
      <p className="t-30 l-42 t-b">使用规则</p>
      <div className="mt-32">
        {explain.split('\n').map((item, index) => (
          /* eslint-disable-next-line */
          <p key={index} className="t-30 l-42 t-sub mt-24">
            {item}
          </p>
        ))}
      </div>

      <style jsx>{`
        .style-247171 {
          min-height: 4.8rem;
          padding: 0 0.56rem;
        }
      `}</style>
    </div>
  );
};

_Rule.contextTypes = {
  $: PropTypes.object
};

export default observer(_Rule);
