/**
 * const prefixCls = 'style-110018';
 * const images = '/static/images/src/star/Detail';
 * @Author: czy0729
 * @Date: 2018-10-22 01:00:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-22 01:22:02
 * @Path bt_mb_new /src/star/Detail/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2 } from '@';
import { Img } from '@components';
import { Layout } from '@_';
import store from './store';
import { imagesStar, starDS } from '../ds';

const Detail = (props, { $ }) => {
  const { id } = $.params.params;

  if (!starDS[id]) {
    return null;
  }

  const { bg, title, content } = starDS[id];

  return (
    <Layout title="名人简介">
      {bg && (
        <Img
          src={`${imagesStar}/${bg}`}
          size="100%"
          lazyload
          animate
          style={{
            minHeight: '64vw'
          }}
        />
      )}
      <div className="p-w mt-md">
        <p className="t-32">
          {title}
          个人简介
        </p>
        {content.map((item, index) => {
          const isImg = typeof item === 'object';

          if (isImg) {
            return (
              <Img
                /* eslint-disable-next-line */
                key={index}
                className="mt-md"
                src={`${imagesStar}/${item.img}`}
                size="100%"
                lazyload
                animate
                style={{
                  minHeight: '56vw'
                }}
              />
            );
          }

          return (
            /* eslint-disable-next-line */
            <p key={index} className="t-32 l-48 mt-md">
              {item}
            </p>
          );
        })}
      </div>

      <style jsx>{`
        .style-110018 {
        }
      `}</style>
    </Layout>
  );
};

Detail.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(Detail);
