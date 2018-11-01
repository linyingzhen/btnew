/**
 * const prefixCls = 'style-471325';
 * const images = '/static/images/src/discovery/Detail';
 * @Author: czy0729
 * @Date: 2018-07-24 18:03:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-31 18:22:10
 * @Path m.benting.com.cn /src/discovery/Detail/_Content.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Content } from '@components';
import { Author } from '@_';
import Utils from '@utils';
import Styles from '@styles';
import Media from '../Index/_Row/_Media';

const prefixCls = 'style-471325';

const _Content = (props, { $ }) => {
  const {
    con,
    faceImg,
    fanAuth,
    grade,
    niname,
    publishTime,
    userId,
    infoType,
    fileList,
    redPacket,
    vip,
    className
  } = $.getState('detail');

  return (
    <div className={classNames(prefixCls, className)}>
      <Author
        userId={userId}
        img={faceImg}
        name={niname}
        level={grade}
        fansAuth={fanAuth}
        vip={vip}
        date={publishTime && Utils.date('y-m-d H:i:s', publishTime)}
      />
      {con && <Content className="t-34 l-48 mt-40">{con}</Content>}
      <Media
        className="mt-40"
        type={infoType}
        files={fileList}
        red={redPacket}
      />

      <style jsx>{`
        .style-471325 {
          min-height: 92vw;
          padding: 0.16rem ${Styles.wind} ${Styles.bottom};
          background: ${Styles.color_theme};
        }
      `}</style>
    </div>
  );
};

_Content.contextTypes = {
  $: PropTypes.object
};

export default observer(_Content);
