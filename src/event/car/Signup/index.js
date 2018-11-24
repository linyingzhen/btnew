/**
 * const prefixCls = 'style-529176';
 * const images = '/static/images/src/event/car/Signup';
 * @Author: czy0729
 * @Date: 2018-11-08 17:46:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-23 17:51:06
 * @Path bt_mb_new /src/event/car/Signup/index.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, form, observer } from '@';
import { Form, List, Flex, Link } from '@components';
import { Layout, Tips } from '@_';
import Const from '@const';
import Styles from '@styles';
import store from './store';
import { tid } from '../ds';

const prefixCls = 'style-136577';

const Signup = (props, { $ }) => {
  const { form, onSubmit } = props;
  const { id } = $.params.params;
  const { ww, _loaded } = $.getState('userInfo');

  if (!_loaded) {
    return null;
  }

  const isCarEvent = id == tid;
  const isBind = !!ww;

  return (
    <Layout title="活动报名" bd={null}>
      <div className="wrap">
        <p className="t-40 l-56 t-b">请填写以下报名信息，并提交审核</p>
      </div>
      <Form className={`${prefixCls}__form`} form={form}>
        <Form.Input
          type="number"
          name="order_no"
          placeholder="请输入已购买的产品的订单编号"
          updatePlaceholder={false}
          option={Const.rules.required}
        />
      </Form>
      <List className="mt-d">
        <List.Item>
          <Flex className="t-30">
            <Flex.Item className="t-sub">订单的旺旺ID</Flex.Item>
            {ww ? (
              <span>{ww}</span>
            ) : (
              <Link className="t-primary" href={Const.__ROUTER__.ww}>
                去绑定
              </Link>
            )}
          </Flex>
        </List.Item>
      </List>
      <Tips className="mt-32">
        <p className="t-28 l-44">
          {isCarEvent
            ? '1、购买鱼竿的订单日期必须为：2018年11月11日-2019年10月15日'
            : '1、订单必须为2018年11月19日到2019年3月31日在本汀旗舰店、本汀大门旗舰店购买的非鱼竿产品'}
        </p>
        <p className="t-28 l-44 mt-4">
          2、已绑定的旺旺ID不可自己修改，如需修改请与客服联系
        </p>
        <p className="t-28 l-44 mt-4">3、一个旺旺ID只能绑定一个账号</p>
        <p className="t-28 l-44 mt-4">4、订单的旺旺ID必需与订单号对应</p>
      </Tips>
      <Form.Button
        type="main"
        disabled={!isBind}
        onClick={() => onSubmit(form, $.do.signup)}
      >
        {isBind ? '提交审核' : '请先绑定旺旺ID'}
      </Form.Button>

      <style jsx global>{`
        .style-136577 {
        }
        .${prefixCls}__form {
          padding-bottom: ${Styles.bottom};
          margin-top: 0;
          background: ${Styles.color_theme};
        }
        .${prefixCls}__form .am-input-control {
          padding-bottom: 0.08rem;
          border-bottom: 0.02rem solid ${Styles.color_border};
        }
        .${prefixCls}__form .am-list-item {
          padding-left: 0.08rem !important;
        }
      `}</style>
      <style jsx>{`
        .style-136577 {
        }
        .wrap {
          padding: ${Styles.space} ${Styles.wind};
          background: ${Styles.color_theme};
        }
      `}</style>
    </Layout>
  );
};

Signup.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(form(observer(Signup)));
