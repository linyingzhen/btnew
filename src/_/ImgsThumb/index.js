/**
 * const prefixCls = 'style-337870';
 * const images = '/static/images/src/_/ImgsThumb';
 * @Author: czy0729
 * @Date: 2018-11-08 11:57:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-10 15:45:36
 * @Path bt_mb_new /src/_/ImgsThumb/index.js.git
 */
import React from 'react';
import classNames from 'classnames';
import { Flex, Img } from '@components';

const prefixCls = 'style-337870';

const ImgsThumb = props => {
  const { data = [], max = 3, lazyload, animate, className } = props;

  if (!data.length) {
    return null;
  }

  return (
    <Flex className={classNames(prefixCls, className)} wrap="wrap">
      {data
        .filter(item => item.indexOf('image_proportion_cut') === -1)
        .filter((item, index) => index < max)
        .map(item => (
          <Img
            key={item}
            className={`${prefixCls}__img border`}
            src={item}
            lazyload={lazyload}
            animate={animate}
          />
        ))}

      <style jsx global>{`
        .style-337870 {
        }
        .${prefixCls}__img {
          width: 28%;
          padding-bottom: 28%;
          margin-right: 3.2%;
          margin-bottom: 0.08rem;
        }
      `}</style>
    </Flex>
  );
};

export default ImgsThumb;
