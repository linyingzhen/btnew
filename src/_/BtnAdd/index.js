/**
 * const prefixCls = 'style-704534';
 * const images = '/static/images/src/_/BtnAdd';
 * @Author: czy0729
 * @Date: 2018-11-12 17:28:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-12 17:39:21
 * @Path bt_mb_new /src/_/BtnAdd/index.js.git
 */
import React from 'react';
import classNames from 'classnames';
import { Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'src-btn-add';

const BtnAdd = ({ href, as, className }) => (
  <React.Fragment>
    <Icon
      className={classNames(
        prefixCls,
        't-56 t-void tool-animate-scale',
        className
      )}
      type="plus"
      onClick={() => Utils.router.push(href, as)}
    />

    <style jsx global>{`
      .src-btn-add {
        position: fixed;
        right: ${Styles.wind};
        bottom: ${Styles.wind};
        width: 1.16rem;
        height: 1.16rem;
        line-height: 1.16rem !important;
        background: ${Styles.color_primary};
        border-radius: 50%;
        box-shadow: 0 0.08rem 0.16rem -0.04rem rgba(0, 0, 0, 0.2),
          0 0.04rem 0.4rem 0 rgba(0, 0, 0, 0.12),
          0 0.16rem 0.2rem 0 rgba(0, 0, 0, 0.14);
      }
    `}</style>
  </React.Fragment>
);

export default BtnAdd;
