/**
 * const prefixCls = 'style-767383';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-08 16:51:33
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-08 17:52:15
 * @Path bt_mb_new \src\person\welfare\Birthday\_Item.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Button } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'styles-767383';

const _Item = (props, { $ }) => {
  const { className } = props;
  const {
    isEnableGet = 1,
    isGet = 1,
    lotteryPrizeId,
    prizeName,
    imgId
  } = props;
  let btnText;
  if (isEnableGet) {
    btnText = '立即领取';
  } else if (isGet) {
    btnText = '去使用';
  } else {
    btnText = '未满足条件';
  }

  return (
    <div className={classNames(prefixCls, className)}>
      <div
        className="thumb"
        style={{
          backgroundImage: `url(${Utils.getAppImgUrl(imgId)})`
        }}
      >
        &nbsp;
      </div>
      <p className="t-30 l-42 t-c mt-24 p-name">{prizeName}</p>
      <div className="t-c mt-12 btnbox">
        {isGet ? (
          <Button
            type="danger"
            inline
            ghost
            radius
            size="sm"
            onClick={() => Utils.router.push('/person/goods')}
          >
            {btnText}
          </Button>
        ) : (
          <Button
            type="danger"
            inline
            ghost
            radius
            size="sm"
            disabled={!isEnableGet}
            onClick={() => $.do.doGet(lotteryPrizeId)}
          >
            {btnText}
          </Button>
        )}
      </div>

      <style jsx global>{`
        .styles-767383 {
        }
        .${prefixCls} .c-button_danger.c-button_ghost {
          background: transparent !important;
        }
        .${prefixCls} .c-button_radius {
          border-radius: 0.24rem;
        }
      `}</style>
      <style jsx>{`
        .styles-767383 {
          display: inline-block;
          vertical-align: top;
          width: 44%;
          margin: 4% 4% 0% 4%;
          background: ${Styles.color_void};
        }
        .styles-767383:nth-of-type(2n) {
          margin-left: 0;
        }
        .thumb {
          position: relative;
          padding-bottom: 100%;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 96%;
        }
        .p-name {
          padding: 0 ${Styles.xs};
          word-break: keep-all;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .btnbox {
          padding-bottom: 0.24rem;
        }
      `}</style>
    </div>
  );
};

_Item.contextTypes = {
  $: PropTypes.object
};

export default observer(_Item);
