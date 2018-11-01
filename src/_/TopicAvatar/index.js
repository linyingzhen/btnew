/**
 * const prefixCls = 'style-110780';
 * const images = '/static/images/src/_/TopicAvatar';
 * @Author: czy0729
 * @Date: 2018-08-02 18:08:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-02 18:11:02
 * @Path m.benting.com.cn /src/_/TopicAvatar/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { Img } from '@components';
import Styles from '@styles';

const prefixCls = 'style-110780';

const TopicAvatar = props => {
  const { className, ...other } = props;

  return (
    <Img
      className={classNames(prefixCls, className)}
      size="0.82rem"
      circle
      {...other}
    >
      <style jsx global>{`
        .style-110780 {
          position: relative;
          border: 0.04rem solid ${Styles.color_primary};
        }
        .${prefixCls}:before {
          ${Styles._full};
          content: '#';
          font-size: 0.48rem;
          line-height: 0.72rem;
          text-align: center;
          color: ${Styles.color_void};
          background: rgba(0, 0, 0, 0.32);
        }
      `}</style>
    </Img>
  );
};

export default TopicAvatar;
