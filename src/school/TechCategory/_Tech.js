/**
 * const prefixCls = 'style-140624';
 * const images = '/static/images/src/school/TechCategory';
 * @Author: czy0729
 * @Date: 2018-09-07 17:11:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-07 17:26:03
 * @Path m.benting.com.cn /src/school/TechCategory/_Tech.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Link } from '@components';
import Styles from '@styles';
import { images } from '../Index/ds';

const prefixCls = 'style-140624';

const _Tech = (props, { $ }) => {
  const { className } = props;
  const { list } = $.getState('tech');

  return (
    <div className={classNames(prefixCls, className)}>
      <div className="list">
        {list.map(item => (
          <Link
            key={item.tbId}
            className={`${prefixCls}__item tool-animate-scale`}
            href={`/school/tech?id=${item.tbId}`}
            as={`/school/tech/${item.tbId}`}
            block
            style={{
              backgroundImage: `url(${images}/${item.tbId}.png)`
            }}
          >
            <p className="t-30 l-42 t-void">{item.name}</p>
            <p className="t-24 l-34 t-void mt-8">
              每季 - 期 / 观看 - / - 个视频
            </p>
            {item.explain && (
              <p className="t-24 l-34 t-void mt-8">{item.explain}</p>
            )}
          </Link>
        ))}
      </div>

      <style jsx global>{`
        .style-140624 {
        }
        .${prefixCls}__item {
          height: 35vw;
          padding: 0.56rem 0.48rem;
          margin-top: 0.32rem;
          ${Styles._bg};
          border-radius: 0.04rem;
        }
        .${prefixCls}__item:first-child {
          margin-top: 0;
        }
      `}</style>
      <style jsx>{`
        .style-140624 {
          min-height: 9.08rem;
          background: ${Styles.color_theme};
        }
        .list {
          padding: 0.16rem ${Styles.wind} ${Styles.bottom};
        }
      `}</style>
    </div>
  );
};

_Tech.contextTypes = {
  $: PropTypes.object
};

export default observer(_Tech);
