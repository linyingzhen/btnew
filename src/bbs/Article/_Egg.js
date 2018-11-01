/**
 * const prefixCls = 'style-204096';
 * const images = '/static/images/src/bbs/Article';
 * @Author: czy0729
 * @Date: 2018-07-17 16:47:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 02:48:53
 * @Path m.benting.com.cn /src/bbs/Article/_Egg.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Animate } from '@components';
import { images } from './ds';

const prefixCls = 'style-204096';

const _Egg = (props, { $ }) => {
  const { className } = props;
  const { show, step, type, value } = $.getState('_egg');

  return (
    <div className={classNames(prefixCls, className)}>
      <Animate type="fade">
        {show && (
          <Flex
            className="am-modal-mask"
            justify="center"
            onClick={step < 2 ? $.page.onEggKnock : $.page.hideEggMask}
          >
            {step >= 2 && (
              <img className="img-light" src={`${images}/light.png`} alt="" />
            )}
            {step <= 1 && (
              <img
                className="img-egg rotate"
                src={`${images}/egg1.png`}
                alt=""
              />
            )}
            {step >= 2 && (
              <img className="img-egg" src={`${images}/egg2.png`} alt="" />
            )}
            {step <= 1 && (
              <img
                className={classNames('img-hammer', {
                  knock: step === 1
                })}
                src={`${images}/hammer.png`}
                alt=""
              />
            )}
            {step >= 2 && (
              <p className="p-desc t-36 t-void float">
                获得彩蛋奖励
                {value}
                {type == 2 ? '金币' : '积分'}
              </p>
            )}
          </Flex>
        )}
      </Animate>

      <style jsx>{`
        .style-204096 {
        }
        .img-light {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 2.32rem;
          height: 1.45rem;
          margin-top: -1.36rem;
          margin-left: -1.16rem;
          animation: scale 2s ease-in-out infinite;
          animation-fill-mode: both;
          animation-direction: alternate;
        }
        .img-egg {
          width: 1.58rem;
          height: 1.87rem;
        }
        .img-hammer {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0.74rem;
          height: 0.87rem;
          margin-top: -1.2rem;
          margin-left: 0.48rem;
        }
        .p-desc {
          position: absolute;
          top: 50%;
          left: 50%;
          text-shadow: 0.02rem 0.02rem 0.04rem rgba(0, 0, 0, 0.24);
        }
        .rotate {
          transform-origin: 50% 100%;
          animation: am-rotate 2s linear infinite;
          animation-fill-mode: both;
        }
        .knock {
          animation: am-knock 1.2s ease-in;
          animation-fill-mode: both;
        }
        .scale {
          animation: am-scale 1.2s ease-in-out;
          animation-fill-mode: both;
        }
        .float {
          animation: am-float 0.8s ease-in-out;
          animation-fill-mode: both;
        }
        @keyframes am-scale {
          0% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0.64;
            transform: scale(1);
          }
        }
        @keyframes am-rotate {
          0% {
            transform: rotate(0);
          }
          10% {
            transform: rotate(6deg);
          }
          40% {
            transform: rotate(-6deg);
          }
          50% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        @keyframes am-knock {
          0% {
          }
          20% {
            transform: translate(-10%, -30%);
          }
          40% {
            transform: translate(-60%, 60%) rotate(-30deg);
          }
          48% {
            transform: translate(-54%, 54%) rotate(-24deg);
          }
          100% {
            transform: translate(-54%, 54%) rotate(-24deg);
          }
        }
        @keyframes am-float {
          0% {
            transform: translate(-50%, -50%) scale(0);
          }
          100% {
            transform: translate(-50%, -500%) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

_Egg.contextTypes = {
  $: PropTypes.object
};

export default observer(_Egg);
