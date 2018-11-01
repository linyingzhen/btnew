/**
 * const prefixCls = 'style-220544';
 * const images = '/static/images/src/index/Home/_Video';
 * @Author: czy0729
 * @Date: 2018-08-02 12:40:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-22 18:30:36
 * @Path m.benting.com.cn /src/index/Home/_Video/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Header } from '@_';
import Styles from '@styles';
import Item from './_Item';

const prefixCls = 'style-220544';

const _Video = (props, { $ }) => {
  const { className } = props;
  const { list } = $.getState('videos');

  const listTop = [];
  const listBottm = [];
  list.forEach((item, index) => {
    if (index < list.length / 2) {
      listTop.push(item);
    } else {
      listBottm.push(item);
    }
  });

  return (
    <div className={classNames(prefixCls, className)}>
      <Header title="视频推荐" href="/video?id=0" as="/video/0" />
      <div className="wrap tool-wrap-scroll">
        {listTop.map(item => (
          <Item key={item.tbId} {...item} />
        ))}
        <br />
        {listBottm.map(item => (
          <Item key={item.tbId} {...item} />
        ))}
      </div>

      <style jsx>{`
        .style-220544 {
          min-height: 8.46rem;
          padding-bottom: ${Styles.bottom};
          background: ${Styles.color_theme};
        }
        .wrap {
          padding: 0 ${Styles.wind} 0.08rem;
        }
      `}</style>
    </div>
  );
};

_Video.contextTypes = {
  $: PropTypes.object
};

export default observer(_Video);
