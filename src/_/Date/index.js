/**
 * const prefixCls = 'style-100351';
 * const images = '/static/images/src/_/Date';
 * @Author: czy0729
 * @Date: 2018-07-27 13:49:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-01 20:53:16
 * @Path m.benting.com.cn /src/_/Date/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { Flex } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import { numberMap } from './ds';

const prefixCls = 'style-100351';

const Date = props => {
  const { time, className } = props;

  return (
    <Flex
      className={classNames(prefixCls, className)}
      direction="column"
      justify="center"
    >
      <p className="t-34 l-28 t-void t-c">{parseInt(Utils.date('d', time))}</p>
      <p className="t-24 l-28 t-void t-c mt-4">
        {numberMap[parseInt(Utils.date('m', time))]}月
      </p>

      <style jsx global>{`
        .style-100351 {
          width: 0.86rem;
          height: 0.86rem;
          background: ${Styles.color_main};
        }
      `}</style>
    </Flex>
  );
};

export default Date;
