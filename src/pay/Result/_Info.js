/**
 * const prefixCls = 'style-297985';
 * const images = '/static/images/src/pay/Result';
 * @Author: czy0729
 * @Date: 2018-09-21 17:56:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-25 10:33:43
 * @Path m.benting.com.cn /src/pay/Result/_Info.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Result, Flex, Button } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import { payStateDS, payTypeDS, orderTypeDS } from './ds';

const prefixCls = 'style-297985';

const _Info = (props, { $ }) => {
  const { className } = props;
  const {
    payState,
    payAmount,
    payType,
    payTime,
    orderType,
    orderNo,
    _loaded
  } = $.getState('detail');
  const _payState = Utils.getLabel(payStateDS, payState);
  const _orderType = Utils.getLabel(orderTypeDS, orderType);

  let type;
  let desc;
  let svg;
  switch (_payState) {
    case '未支付':
      type = 'primary';
      desc = '等待支付';
      svg = '等待';
      break;

    case '已支付':
      type = 'success';
      desc = '支付成功';
      svg = '成功';
      break;

    default:
      type = 'danger';
      desc = '支付失败';
      svg = '失败';
      break;
  }

  const data = [
    {
      label: '支付金额',
      value: payAmount
    },
    {
      label: '支付方式',
      value: Utils.getLabel(payTypeDS, payType)
    },
    {
      label: '支付时间',
      value: payTime ? Utils.date(payTime) : ''
    },
    {
      label: '订单类型',
      value: _orderType
    },
    {
      label: '订单号',
      value: orderNo
    }
  ];

  let btnText;
  let btnClick;
  let btnSubText = '返回';
  let btnSubClick = Utils.router.back;
  switch (_orderType) {
    case '极速秒杀':
      btnText = '我的秒杀';
      btnClick = () => Utils.router.push('/person/event/miaosha');
      break;

    case '金币捡漏':
      btnText = '我的捡漏';
      btnClick = () => Utils.router.push('/person/event/jianlou');
      break;

    case '微信充值':
    case '支付宝充值':
      btnText = '我的钱包';
      btnClick = () => Utils.router.push('/person/wallet');
      btnSubText = '个人中心';
      btnSubClick = () => Utils.router.push('/person');
      break;

    default:
      break;
  }

  return (
    <div className={classNames(prefixCls, className)}>
      <div className="result">
        {_loaded && (
          <Result
            image={`/static/svg/${svg}.svg`}
            title={<span className={`t-34 l-48 t-${type} t-b`}>{desc}</span>}
            titleStyle={{
              marginTop: '-0.8rem'
            }}
            style={{
              minHeight: '4.8rem'
            }}
          />
        )}
      </div>
      <div className="list">
        {data.map(item => (
          <Flex align="start" key={item.label}>
            <Flex.Item className="t-30 l-42 t-sub">{item.label}</Flex.Item>
            <Flex.Item style={{ flex: 2 }}>
              <p className="t-30 l-42 t-r">{item.value || '-'}</p>
            </Flex.Item>
          </Flex>
        ))}
      </div>
      {_loaded && (
        <div className="tool-wind mt-lg">
          <Button type="primary" onClick={btnClick}>
            {btnText}
          </Button>
          <Button className="mt-32" type="primary" ghost onClick={btnSubClick}>
            {btnSubText}
          </Button>
        </div>
      )}

      <style jsx>{`
        .style-297985 {
        }
        .result {
          min-height: 4.8rem;
          background: ${Styles.color_theme};
        }
        .list {
          position: relative;
          min-height: 2.74rem;
          padding: 0.32rem ${Styles.wind};
          background: ${Styles.color_theme};
        }
        .list:before {
          content: '';
          position: absolute;
          top: 0;
          right: ${Styles.wind};
          left: ${Styles.wind};
          height: 0.02rem;
          background-image: linear-gradient(
            to right,
            ${Styles.color_border} 0%,
            ${Styles.color_border} 50%,
            transparent 50%
          );
          background-size: 0.24rem 0.02rem;
          background-repeat: repeat-x;
        }
      `}</style>
    </div>
  );
};

_Info.contextTypes = {
  $: PropTypes.object
};

export default observer(_Info);
