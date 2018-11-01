/**
 * const prefixCls = 'style-197156';
 * const images = '/static/images/src/person/prize/Detail';
 * @Author: lyz0720
 * @Date: 2018-09-14 16:02:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 14:23:01
 * @Path bt_mb_new /src/person/prize/Detail/_Pack.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import Styles from '@styles';
import Coupon from './_Coupon';
import Step from './_Step';
import Rule from './_Rule';
import Goto from './_Goto';

const prefixCls = 'style-197156';

const _Pack = ({ className }) => (
  <div className={classNames(prefixCls, className)}>
    <Coupon />
    <Step className="mt-lg" />
    <Rule className="mt-md" />
    <Goto className="mt-md" />

    <style jsx>{`
      .style-197156 {
        padding-top: ${Styles.space};
        margin: 0 ${Styles.wind};
        background: ${Styles.color_theme};
        border: ${Styles.border};
      }
    `}</style>
  </div>
);

_Pack.contextTypes = {
  $: PropTypes.object
};

export default observer(_Pack);
