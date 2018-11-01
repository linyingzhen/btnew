/**
 * const prefixCls = 'style-807297';
 * const images = '/static/images/src/person/event/Prize';
 * @Author: czy0729
 * @Date: 2018-09-18 17:39:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 16:51:28
 * @Path m.benting.com.cn /src/person/event/Prize/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Flex, Icon, Img, PayConfirm, Button, Form } from '@components';
import { Layout } from '@_';
import Utils from '@utils';
import Styles from '@styles';
import store from './store';
import { stateDS, payStateDS } from '../_/ds';
import { orderTypeMap } from './ds';

const prefixCls = 'style-807297';

const Prize = (props, { $ }) => {
  const { show } = $.getState('_payConfirm');
  const { defaultAddress, orderinfo, _loaded } = $.getState('orderInfo');
  const { province, city, district, address, recName, phone } =
    defaultAddress || {};
  const {
    orderType,
    item = {},
    goodsNum,
    state = 0,
    dataType,
    amount = 0,
    payState,
    payAmount,
    logisticsNo
  } = orderinfo || {};
  const isCanEditAddress = state < parseInt(Utils.getValue(stateDS, '已发货'));
  const hasPostFee =
    (orderTypeMap[orderType] && orderTypeMap[orderType].needPostFee) || false;
  const isNeedPay =
    hasPostFee && payState === parseInt(Utils.getValue(payStateDS, '待付款'));

  // 后端状态有问题, 自己判断真正状态
  let realStateLabel;
  if (!phone) {
    realStateLabel = '待确认';
  } else {
    realStateLabel = Utils.getLabel(stateDS, state);
  }

  let btnText;
  if (hasPostFee) {
    if (parseFloat(payAmount) === 0) {
      btnText = `支付邮费（${amount}元）`;
    } else {
      btnText = `已付邮费（${amount}元）`;
    }
  } else {
    btnText = '包邮';
  }

  // #todo bug 只要积分竞拍付了邮费就不能区分是积分竞拍还是金币竞拍
  // 暂时只能不显示amount，统一页面表现
  if (orderType === 12 && payState === 1) {
    btnText = '已付邮费';
  }

  return (
    <Layout title="领取奖品">
      <div className="wrap-top">
        <p className="t-34 l-48 t-void t-b">
          状态：
          {_loaded ? realStateLabel : '-'}
        </p>
      </div>
      <div className="wrap-content">
        <Flex
          className={`${prefixCls}__wrap-address`}
          align="center"
          onClick={() => {
            if (isCanEditAddress) {
              $.page.jumpEditAddress();
            }
          }}
        >
          <Flex.Item>
            <Flex align="start">
              <Icon className="t-32 l-42 t-title" type="location" />
              {!address ? (
                <Flex.Item className="t-30 l-42 t-title">
                  添加收货地址
                </Flex.Item>
              ) : (
                <Flex.Item>
                  <p className="t-30 l-42 t-title">
                    {recName} {phone}
                  </p>
                  <p className="t-24 l-34 mt-8">
                    {province} {city} {district} {address}
                  </p>
                </Flex.Item>
              )}
            </Flex>
          </Flex.Item>
          {isCanEditAddress && (
            <Icon className="t-32 l-42 t-title" type="right" />
          )}
        </Flex>
        <Flex className={`${prefixCls}__wrap-goods`}>
          <Img
            className={`${prefixCls}__thumb border`}
            src={Utils.getAppImgUrl(item.imgId, 'scale')}
            size="1.6rem"
          />
          <Flex.Item>
            <p className="t-34 l-48 t-title">{item.title || '-'}</p>
            <p className="t-28 l-40 t-sub mt-4">共 {goodsNum || '-'} 件商品</p>
          </Flex.Item>
        </Flex>
        <Flex className={`${prefixCls}__wrap-extra`}>
          <Flex.Item>
            {_loaded && (
              <p className="t-28 l-40 t-sub mt-4">
                {state > parseInt(Utils.getValue(stateDS, '待发货')) ? (
                  <>
                    <span>物流单号：</span>
                    <span
                      className="link t-primary user-select"
                      onClick={() =>
                        (window.location = `https://www.kuaidi100.com/all/zt.shtml?mscomnu=${logisticsNo}`)
                      }
                    >
                      {logisticsNo}
                    </span>
                  </>
                ) : (
                  <span>物流单号待更新</span>
                )}
              </p>
            )}
          </Flex.Item>
          <Button
            type="primary"
            size="sm"
            inline
            ghost
            radius
            onClick={() => Utils.router.push('/person/help/service')}
          >
            联系客服
          </Button>
        </Flex>
      </div>
      {_loaded && (
        <Form.Button disabled={!isNeedPay} onClick={$.page.showPayConfirm}>
          {btnText}
        </Form.Button>
      )}
      {_loaded && (
        <PayConfirm
          show={show}
          dataType={dataType}
          amount={amount}
          onClose={$.page.hidePayConfirm}
          onConfirm={$.do.payFee}
        />
      )}

      <style jsx global>{`
        .style-807297 {
        }
        .${prefixCls}__wrap-address {
          height: 1.5rem;
          padding: 0 ${Styles.wind};
          background: ${Styles.color_theme};
        }
        .${prefixCls}__wrap-goods {
          padding: ${Styles.wind};
          background: ${Styles.color_bg};
        }
        .${prefixCls}__thumb {
          background-color: ${Styles.color_theme} !important;
        }
        .${prefixCls}__wrap-extra {
          padding: ${Styles.wind};
          background: ${Styles.color_theme};
        }
      `}</style>
      <style jsx>{`
        .style-807297 {
        }
        .wrap-top {
          padding: 0.4rem 0.64rem 1.8rem;
          background: linear-gradient(
            -90deg,
            rgba(255, 101, 101, 1) 0%,
            rgba(255, 125, 66, 1) 100%
          );
        }
        .wrap-content {
          margin: -1.5rem ${Styles.wind} 0;
          box-shadow: 0 0.04rem 0.08rem rgba(0, 0, 0, 0.08);
          border-radius: 0.08rem;
          overflow: hidden;
        }
        .link {
          border-bottom: 0.01rem solid ${Styles.color_primary};
        }
      `}</style>
    </Layout>
  );
};

Prize.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Prize));
