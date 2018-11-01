/**
 * const prefixCls = 'style-657342';
 * const images = '/static/images/components/RichEditor';
 * @Author: czy0729
 * @Date: 2018-07-11 23:05:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-22 17:32:37
 * @Path m.benting.com.cn /components/RichEditor/_BtnControl.js
 */
import React from 'react';
import classNames from 'classnames';
import { Flex } from '@components';

const prefixCls = 'style-657342';

const _BtnControl = props => {
  const { label, active, color, className, ...other } = props;

  return (
    <Flex
      className={classNames(prefixCls, className, {
        [`${prefixCls}_active`]: active
      })}
      justify="center"
      {...other}
    >
      {color ? (
        <div className="color-badge" style={{ backgroundColor: color }} />
      ) : (
        label
      )}

      <style jsx global>{`
        .style-657342 {
          vertical-align: top;
          position: relative;
          width: 0.6rem;
          height: 0.6rem;
          color: #9fadc7;
          cursor: pointer;
        }
        .${prefixCls} .am-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .${prefixCls} img {
          width: 100%;
          height: 100%;
        }
        .${prefixCls}_active {
          background-color: #ddf8f3;
          outline: 0.01rem solid #47cca5;
          opacity: 1 !important;
        }
      `}</style>
      <style jsx>{`
        .style-657342 {
        }
        .color-badge {
          width: 0.32rem;
          height: 0.32rem;
          opacity: 0.64;
        }
      `}</style>
    </Flex>
  );
};

export default _BtnControl;
