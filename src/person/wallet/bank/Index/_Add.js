/**
 * const prefixCls = 'style-170867';
 * const images = '/static/images/src/person/wallet/bank/Index';
 * @Author: czy0729
 * @Date: 2018-09-13 17:18:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-07 14:48:37
 * @Path m.benting.com.cn /src/person/wallet/bank/Index/_Add.js
 */
import React from 'react';
import classNames from 'classnames';
import { Link, Icon } from '@components';
import Const from '@const';
import Styles from '@styles';

const prefixCls = 'style-170867';

const _Add = ({ className }) => (
  <Link
    className={classNames(`${prefixCls} t-c`, className)}
    href={Const.__ROUTER__.bank}
    block
  >
    <Icon className="t-48 t-sub t-b" type="plus" />
    <p className="t-30 l-42 t-sub t-c mt-32">您尚未添加银行卡，点击添加</p>

    <style jsx global>{`
      .style-170867 {
        padding: 1.06rem 0;
        border: 0.04rem dashed ${Styles.color_border};
        border-radius: 0.2rem;
      }
    `}</style>
  </Link>
);

export default _Add;
