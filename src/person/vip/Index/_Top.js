/**
 * const prefixCls = 'style-163762';
 * const images = '/static/images/src/person/vip/Index';
 * @Author: czy0729
 * @Date: 2018-10-17 13:58:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-02 10:49:36
 * @Path m.benting.com.cn /src/person/vip/Index/__Top.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Img } from '@components';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import { images } from './ds';

const prefixCls = 'style-163762';

const _Top = (props, { $ }) => {
  const { className } = props;
  const { vip, niname = '-', faceImg, userId } = $.getState('userInfo');

  return (
    <div className={classNames(prefixCls, className)}>
      <div className="card">
        <Flex justify="center">
          <Img
            src={faceImg}
            size="1.08rem"
            circle
            onClick={() =>
              Utils.router.push(
                `/person/zone?id=${userId}`,
                `/person/zone/${userId}`
              )
            }
          />
          <div className="ml-32 mr-32">
            <p className="niname t-24 l-34">{niname}</p>
            <p className="vip-state t-34 l-48 t-title t-b mt-4">
              {vip > 0 ? 'VIP会员' : '普通会员'}
            </p>
          </div>
        </Flex>
        <div
          className="btn-now tool-animate-scale mt-32"
          onClick={() => Utils.router.push('/person/vip/pay')}
        >
          {vip > 0 ? '续费' : '开通'}
        </div>
      </div>

      <style jsx>{`
        .style-163762 {
          position: relative;
          background: ${Styles.color_main};
        }
        .${prefixCls}:after {
          content: '';
          display: block;
          position: absolute;
          bottom: 0.88rem;
          left: 50%;
          width: 110%;
          height: 1.08rem;
          background: ${Styles.color_theme};
          border-radius: 50% 50% 0 0;
          box-shadow: -0.08rem -0.08rem 0.16rem rgba(0, 0, 0, 0.08);
          transform: translate(-50%, 100%);
        }
        .card {
          padding: 0.4rem 0.54rem;
          margin: 0 0.64rem;
          background-image: url(${images}/personal-bg${Const.__IMG_DPR__}.png);
          background-size: cover;
          background-repeat: no-repeat;
        }
        .btn-now {
          position: relative;
          z-index: 1;
          width: 100%;
          padding: 0.16rem 0;
          text-align: center;
          font-size: 0.34rem;
          line-height: 0.48rem;
          color: ${Styles.color_gold};
          background: ${Styles.color_desc};
          border-radius: 0.4rem;
          box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.16);
        }
      `}</style>
    </div>
  );
};

_Top.contextTypes = {
  $: PropTypes.object
};

export default observer(_Top);
