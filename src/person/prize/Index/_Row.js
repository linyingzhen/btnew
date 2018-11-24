/**
 * const prefixCls = 'style-507034';
 * const images = '/static/images/src/person/prize/Index';
 * @Author: lyz0720
 * @Date: 2018-09-18 10:06:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-12 14:36:44
 * @Path bt_mb_new /src/person/prize/Index/_Row.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Flex, List, Img, Link } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-507034';

const _Row = (props, { $ }) => {
  const {
    tbId,
    lotteryType,
    prizeType,
    imgId,
    prizeName,
    prizeVal,
    expdatebegin,
    expdateend,
    state,
    authState,
    userDel
  } = props;

  let orginText;
  switch (parseInt(lotteryType)) {
    case 1:
      orginText = '大转盘';
      break;

    case 2:
      orginText = '福利领券';
      break;

    case 3:
      orginText = '邀请活动';
      break;

    case 4:
      orginText = 'VIP月初赠送优惠券';
      break;

    case 5:
      orginText = 'VIP领券';
      break;

    default:
      break;
  }

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

  const isdel = userDel == 0;
  const begin = Utils.date('y.m.d', expdatebegin);
  const end = Utils.date('y.m.d', expdateend);
  const brief =
    begin === end ? `购买时间：${end}` : `购买时间：${begin} - ${end}`;

  let btnTextType = 'primary';
  let btnText = '立即使用';
  switch (parseInt(authState)) {
    case 1:
      btnText = '　审核中';
      break;

    case 2:
      if (state == 3) {
        btnTextType = 'success';
        btnText = '　已发放';
      } else {
        btnText = '审核通过';
      }

      break;

    case 3:
      btnTextType = 'danger';
      btnText = '审核失败';
      break;

    default:
      break;
  }

  return (
    <div className={prefixCls}>
      <List.Item
        href={`/person/prize/detail?id=${tbId}`}
        as={`/person/prize/detail/${tbId}`}
      >
        <Flex>
          <Img className="border" src={imgId} size="1.2rem" lazyload animate />
          <Flex.Item className="ml-24">
            <p className="t-30 l-42 t-b">
              {textType}({prizeName})
            </p>
            <p className="t-24 l-34 t-sub mt-8">
              奖品来源：
              {orginText}
            </p>
          </Flex.Item>
          <Flex
            className={`${prefixCls}__amount t-22 l-32 t-sub ml-sm`}
            justify="center"
          >
            <p>
              <span className="t-40 t-danger">{prizeVal}</span>
              <span className="t-24 l-32 t-sub ml-xs mr-xs">元</span>
            </p>
          </Flex>
        </Flex>
      </List.Item>
      <Flex className={`${prefixCls}__brief`}>
        <Flex.Item className="t-24 l-32 t-sub">{brief}</Flex.Item>
        {isdel ? (
          <p
            className="t-24 l-32 t-primary ml-32"
            onClick={() =>
              Utils.onConfirm('可以从回收站恢复，确定删除?', () =>
                $.page.toManager(tbId, true))
            }
          >
            删除
          </p>
        ) : (
          <p
            className="t-24 l-32 t-primary ml-32"
            onClick={() => $.page.toManager(tbId, false)}
          >
            恢复
          </p>
        )}
        <Link
          className={`t-24 l-32 t-${btnTextType} ml-32`}
          href={`/person/prize/detail?id=${tbId}`}
          as={`/person/prize/detail/${tbId}`}
        >
          {btnText}
        </Link>
      </Flex>

      <style jsx global>{`
        .style-507034 {
        }
        .${prefixCls}__amount {
          width: 1.64rem;
          min-height: 1.44rem;
          padding-left: 0.24rem;
          margin-left: 0.24rem;
          border-left: 0.02rem dashed ${Styles.color_border};
        }
        .${prefixCls}__brief {
          position: relative;
          padding: 0.24rem ${Styles.wind};
          overflow: initial;
        }
        .${prefixCls}__brief:after {
          content: '';
          display: block;
          position: absolute;
          top: -0.12rem;
          left: 0;
          right: 0;
          height: 0.12rem;
          background-size: 0.24rem 0.24rem;
          background-repeat: repeat-x;
          background-image: linear-gradient(
              135deg,
              transparent 45%,
              #eef0f4 55%,
              #eef0f4 60%
            ),
            linear-gradient(45deg, #eef0f4 45%, #eef0f4 55%, transparent 60%);
        }
      `}</style>
      <style jsx>{`
        .style-507034 {
          margin: ${Styles.wind};
          background: #eef0f4;
          border-radius: 0.04rem;
        }
      `}</style>
    </div>
  );
};

_Row.contextTypes = {
  $: PropTypes.object
};

export default observer(_Row);
