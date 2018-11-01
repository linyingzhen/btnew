/**
 * const prefixCls = 'style-197157';
 * const images = '/static/images/src/school/Index';
 * @Author: czy0729
 * @Date: 2018-09-05 18:41:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-06 14:14:12
 * @Path m.benting.com.cn /src/school/Index/_Tech.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Link } from '@components';
import { Header } from '@_';
import Styles from '@styles';
import { images } from './ds';

const prefixCls = 'style-197157';

const _Tech = (props, { $ }) => {
  const { className } = props;
  const { list } = $.getState('tech');

  return (
    <div className={classNames(prefixCls, className)}>
      <Header title="教学专题" />
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
            <p className="t-24 l-34 t-void mt-8">每季 - 期 / 观看 - / - 个视频</p>
            {item.explain && (
              <p className="t-24 l-34 t-void mt-8">{item.explain}</p>
            )}
          </Link>
        ))}
      </div>

      <style jsx global>{`
        .style-197157 {
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
        .style-197157 {
          min-height: 9.04rem;
          background: ${Styles.color_theme};
        }
        .list {
          padding: 0 ${Styles.wind} ${Styles.bottom};
        }
      `}</style>
    </div>
  );
};

_Tech.contextTypes = {
  $: PropTypes.object
};

export default observer(_Tech);
