/**
 * const prefixCls = 'style-128202';
 * const images = '/static/images/src/person/order/Index';
 * @Author: lyz0720
 * @Date: 2018-10-23 13:48:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-14 15:10:14
 * @Path bt_mb_new /src/person/order/Index/__Row.js
 */
import React from 'react';
import { observer } from '@';
import { List, Flex, Img } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import { grantStateDS, imageStateDS } from './ds';

const prefixCls = 'style-372434';

const _Row = props => {
  const {
    createTime,
    orderNo,
    item = {},
    goodsNum,
    amount,
    grantState,
    explain
  } = props;

  const _grantState = Utils.getLabel(grantStateDS, grantState);
  let isSuccess = false;
  let type = 'primary';
  switch (_grantState) {
    case '审核通过':
      isSuccess = true;
      break;

    case '审核通过已加分':
      isSuccess = true;
      type = 'success';
      break;

    case '审核失败':
    case '已退货':
      type = 'danger';
      break;

    default:
      break;
  }

  return (
    <List.Item>
      <Flex className="t-28 l-40 t-sub">
        <Flex.Item>{Utils.date(createTime)}</Flex.Item>
        <span className={`t-${type}`}>{_grantState}</span>
      </Flex>
      <Flex className={`${prefixCls}__wrap-goods mt-16`}>
        <Img
          src={Utils.getLabel(imageStateDS, grantState)}
          size="1.6rem"
          transparent
          style={{
            marginLeft: '-0.12rem'
          }}
        />
        <Flex.Item>
          <p className="t-32">
            订单编号：
            {orderNo}
          </p>
          <p className="t-28 l-40 t-sub mt-16">
            来源于
            {item.tit}
          </p>
          <p className="t-28 l-40 t-sub mt-4">
            <span>已获售后：</span>
            <span className="t-primary">{goodsNum}</span>
            <span className="ml-xs">次</span>
          </p>
          {!!parseInt(amount) && (
            <p className="t-28 l-40 t-sub mt-4">
              <span>获得积分：</span>
              <span className="t-primary">{parseInt(amount)}</span>
              <span className="ml-xs">分</span>
            </p>
          )}
        </Flex.Item>
      </Flex>
      {explain && <p className="t-24 t-danger mt-24">{explain}</p>}
      {isSuccess && (
        <Flex className="t-r mt-24" justify="between">
          <Flex.Item className="t-28 l-40">
            <span>实付金额（含邮费）：</span>
            <span className="t-primary">{amount}</span>
          </Flex.Item>
        </Flex>
      )}

      <style jsx global>{`
        .style-372434 {
        }
        .${prefixCls}__wrap-goods {
          padding: ${Styles.wind};
          background: ${Styles.color_bg};
        }
      `}</style>
    </List.Item>
  );
};

export default observer(_Row);
