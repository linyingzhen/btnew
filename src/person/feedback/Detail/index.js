/**
 * const prefixCls = 'style-439129';
 * const images = '/static/images/src/person/feedback/Detail';
 * @Author: czy0729
 * @Date: 2018-09-10 14:05:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-10 15:38:42
 * @Path m.benting.com.cn /src/person/feedback/Detail/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout, Imgs } from '@_';
import Styles from '@styles';
import store from './store';

const Detail = (props, { $ }) => {
  const { replys, content, imgId } = $.getState('detail');
  const imgs = imgId ? String(imgId).split(',') : [];

  return (
    <Layout title="反馈结果" theme="fullTheme">
      <div className="wrap">
        {replys ? (
          <p className="t-30 l-42">{replys}</p>
        ) : (
          <p className="t-30 l-42 t-sub">管理员暂未回复</p>
        )}
        <div className="orgin mt-md">
          <p className="t-30 l-42 t-sub">{content}</p>
          {!!imgs.length && <Imgs className="mt-sm" data={imgs} />}
        </div>
      </div>

      <style jsx>{`
        .style-439129 {
        }
        .wrap {
          padding: 0.32rem ${Styles.wind};
        }
        .orgin {
          padding: ${Styles.sm} ${Styles.wind};
          background: ${Styles.color_bg};
        }
      `}</style>
    </Layout>
  );
};

Detail.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Detail));
