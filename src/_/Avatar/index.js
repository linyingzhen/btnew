/**
 * const prefixCls = 'style-898123';
 * const images = '/static/images/src/_/Avatar';
 * @Author: czy0729
 * @Date: 2018-07-11 10:59:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 15:21:47
 * @Path m.benting.com.cn /src/_/Avatar/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { Img, Link, Icon } from '@components';
import Const from '@const';
import Styles from '@styles';

const prefixCls = 'style-898123';

const Avatar = props => {
  const { userId, img = '', vip, className, ...other } = props;

  if (!img) {
    return null;
  }

  let _img = img;
  if (_img.indexOf('uc.tw-bt.com') !== -1) {
    _img = Const.__IMG_DEFAULT__;
  }

  return (
    <>
      <Link
        className={classNames(prefixCls, className)}
        href={`/person/zone?id=${userId}`}
        as={`/person/zone/${userId}`}
      >
        <Img
          className={`${prefixCls}__img`}
          src={_img}
          size="0.72rem"
          circle
          lazyload={false}
          {...other}
        >
          {vip == 1 && (
            <Icon className={`${prefixCls}__vip`} color type="vip" />
          )}
        </Img>
      </Link>

      <style jsx global>{`
        .style-898123 {
        }
        .${prefixCls}__img {
          overflow: initial;
          border: ${Styles.border};
        }
        .${prefixCls}__vip {
          position: absolute;
          z-index: 1;
          right: 0;
          bottom: 0;
        }
      `}</style>
    </>
  );
};

export default Avatar;
