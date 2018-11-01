/**
 * const prefixCls = 'style-211397';
 * const images = '/static/images/src/person/help/Detail';
 * @Author: Jun
 * @Date: 2018-08-03 15:04:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 15:22:33
 * @Path m.benting.com.cn /src/person/help/Detail/__Bottom.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Button } from '@components';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-211397';
const images = Utils.cdn('/static/images/src/person/Help');

const _Bottom = ({ className }, { $ }) => (
  <Flex className={classNames(prefixCls, className)} justify="center">
    <Button
      inline
      size="sm"
      icon={
        <img
          className="img-icon"
          src={`${images}/有用${Const.__IMG_DPR__}.png`}
          alt=""
        />
      }
      onClick={() => $.do.isUseful(1)}
    >
      有用
    </Button>
    <Button
      className="ml-md"
      inline
      size="sm"
      icon={
        <img
          className="img-icon"
          src={`${images}/没用${Const.__IMG_DPR__}.png`}
          alt=""
        />
      }
      onClick={() => $.do.isUseful(2)}
    >
      没用
    </Button>

    <style jsx global>{`
      .style-211397 {
        padding-bottom: ${Styles.bottom};
      }
    `}</style>
    <style jsx>{`
      .style-211397 {
      }
      .img-icon {
        width: 0.3rem;
        height: 0.3rem;
      }
    `}</style>
  </Flex>
);

_Bottom.contextTypes = {
  $: PropTypes.object
};

export default observer(_Bottom);
