/**
 * const prefixCls = 'style-122495';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-09-25 16:30:36
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-09-26 11:07:50
 * @Path m.benting.com.cn \src\person\event\Coupon\_Row.js
 */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { observer } from '@';
import { List, Img } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-122495';

const _Row = (props, { $ }) => {
  const {
    tbId,
    prizeName,
    prizeVal,
    imgId,
    prizeType,
    expdatebegin,
    expdateend,
    isGet
  } = props;


  let textType;
  switch (parseInt(prizeType)) {
    case 1:
      textType = '实物券';
      break;
    case 2:
      textType = '现金券';
      break;
    default:
      break;
  }

  return (
    <div className={prefixCls}>
      <List.Item
        className={classNames(prefixCls)}
        thumb={
          <Img
            className={`${prefixCls}__thumb`}
            src={imgId}
            size="1.5rem"
            lazyload
          />
        }
        onClick={() => (!isGet ? $.do.doGet(tbId) : Utils.light('您已经领取了'))}
      >
        <div className="row-box">
          <div className="row-center">
            <p className="t-30 l-42 name">
              {textType}({prizeName})
            </p>
            <p>
              <span className="t-44 l-44 t-danger mr-xs">{prizeVal}</span>
              <span className="t-24 l-44 t-sub">元</span>
            </p>
            <p className="time t-20 l-32 t-primary">
              <span>购买时间：</span>
              <span>{Utils.date('m.d H:i', expdatebegin)}</span>
              <span> - </span>
              <span>{Utils.date('m.d H:i', expdateend)}</span>
            </p>
          </div>
          <div className="t-22 l-32 t-sub row-right">
            {!isGet ? (
              <p
                className="t-24 l-32 t-primary btn"
                onClick={() => $.page.toManager(tbId, true)}
              >
                立即领取
              </p>
            ) : (
              <p className="t-24 l-32 t-sub btn">已经领取</p>
            )}
          </div>
        </div>
      </List.Item>
      <style jsx global>{`
        .style-122495 {
        }
        .${prefixCls}__thumb {
          border: ${Styles.border};
        }
        .style-122495 .am-list-item {
          padding-left: 0 !important;
        }
        .style-122495 .am-list-item .am-list-line {
          padding-right: 0 !important;
        }
        .style-122495 .am-list-item .am-list-line .am-list-content {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }
      `}</style>
      <style jsx>{`
        .style-122495 {
          margin: ${Styles.wind};
          border: 1px solid ${Styles.color_border};
          border-radius: ${Styles.radius_sm};
          overflow: hidden;
        }
        .row-box {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .row-center {
          flex: 7;
          padding-right: 0.12rem;
          border-right: 1px dashed ${Styles.color_border};
          text-align: left;
        }
        .row-right {
          flex: 1;
          justify-content: center;
        }
        .btn {
          width: 1em;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

_Row.contextTypes = {
  $: PropTypes.object
};

export default observer(_Row);
