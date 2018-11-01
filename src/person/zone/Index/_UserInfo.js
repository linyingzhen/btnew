/**
 * const prefixCls = 'style-625597';
 * const images = '/static/images/src/person/zone/Index';
 * @Author: czy0729
 * @Date: 2018-07-27 10:29:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-29 18:37:32
 * @Path m.benting.com.cn /src/person/zone/Index/_UserInfo.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex } from '@components';
import Const from '@const';
import Styles from '@styles';
import { images } from './ds';

const prefixCls = 'style-625597';

const _UserInfo = (props, { $ }) => {
  const { className } = props;
  const { niname, concernCount, fanCount, point } = $.getState('person');

  return (
    <div className={classNames(prefixCls, className)}>
      <div className="info">
        <p className="t-40 l-56 t-void t-b t-c">{niname}</p>
        <Flex className="mt-40">
          <Flex.Item>
            <p className="t-40 l-56 t-void t-b t-c">{concernCount}</p>
            <p className="t-24 l-34 t-void t-c mt-8">关注</p>
          </Flex.Item>
          <Flex.Item>
            <p className="t-40 l-56 t-void t-b t-c">{fanCount}</p>
            <p className="t-24 l-34 t-void t-c mt-8">粉丝</p>
          </Flex.Item>
          <Flex.Item>
            <p className="t-40 l-56 t-void t-b t-c">{point}</p>
            <p className="t-24 l-34 t-void t-c mt-8">积分</p>
          </Flex.Item>
        </Flex>
      </div>

      <style jsx>{`
        .style-625597 {
          position: relative;
          padding-bottom: 96%;
          margin-top: -1rem;
          ${Styles._bg};
          background-image: url('${images}/0${Const.__IMG_DPR__}.png');
        }
        .info {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          padding: 0.96rem 0.8rem ${Styles.bottom};
          background-image: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.88)
          );
        }
        p {
          text-shadow: 0.04rem 0.04rem 0.08rem rgba(0, 0, 0, 0.32);
        }
      `}</style>
    </div>
  );
};

_UserInfo.contextTypes = {
  $: PropTypes.object
};

export default observer(_UserInfo);
