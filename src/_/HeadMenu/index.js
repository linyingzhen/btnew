/**
 * const prefixCls = 'style-177316';
 * const images = '/static/images/src/_/HeadMenu';
 * @Author: czy0729
 * @Date: 2018-07-10 10:14:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-10 13:44:49
 * @Path m.benting.com.cn /src/_/HeadMenu/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Link } from '@components';
import Styles from '@styles';

const prefixCls = 'style-177316';

const HeadMenu = props => {
  const { data = [], active, className } = props;

  return (
    <div className={classNames(prefixCls, className)}>
      {data.map((item, index) => {
        if (item.label === active) {
          return (
            <span
              key={item.label}
              className={classNames('t-48 l-66 t-title t-b ls-1', {
                'ml-32': index !== 0
              })}
            >
              {item.label}
            </span>
          );
        }

        return (
          <Link
            key={item.label}
            className={classNames('t-34 l-48 t-sub', {
              'ml-32': index !== 0
            })}
            href={item.href}
            as={item.as}
          >
            {item.label}
          </Link>
        );
      })}

      <style jsx>{`
        .style-177316 {
          padding: 0.12rem ${Styles.wind};
          background: ${Styles.color_theme};
        }
      `}</style>
    </div>
  );
};

HeadMenu.contextTypes = {
  $: PropTypes.object
};

export default observer(HeadMenu);
