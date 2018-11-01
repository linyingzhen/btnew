/**
 * const prefixCls = 'style-655742';
 * const images = '/static/images/src/discovery/fish/Post';
 * @Author: czy0729
 * @Date: 2018-08-11 16:02:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-12 14:00:33
 * @Path m.benting.com.cn /src/discovery/fish/Post/_Form.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Form, Icon } from '@components';

const prefixCls = 'style-655742';

const _Form = (props, { $ }) => {
  const { form, className } = props;
  const goods = $.getState('goods');

  // 防止用户在产品未返回前点击了选择框
  // const isLoadingGoods = !goods[0].children;

  return (
    <Form
      className={classNames(prefixCls, className)}
      form={form}
      renderFooter={() => (
        <p className="t-24 t-sub">
          单尾最重和渔获总重至少填一项，分享服装靓照可不填渔获
        </p>
      )}
    >
      <Form.Picker
        prefixCls={`${prefixCls}__picker am-picker`}
        label={<Icon className="t-34" type="select" />}
        name="goods"
        data={goods}
        cols={2}
        placeholder="请选择产品名称"
        // placeholder={isLoadingGoods ? '产品加载中，请稍后...' : '请选择'}
        // disabled={isLoadingGoods}
      />
      <Form.Input
        label={<Icon className="t-34 t-title" type="location" />}
        name="fishArea"
        placeholder="请输入所在区或城镇"
        updatePlaceholder={false}
      />
      <Form.Input
        label={<Icon className="t-34 t-title" type="hook" />}
        name="fishKind"
        placeholder="请输入渔获种类"
        updatePlaceholder={false}
      />
      <Form.MoneyInput
        label={<Icon className="t-34 t-title" type="fish" />}
        name="fishWeight"
        extra="斤"
        placeholder="请输入单尾最大重量"
        updatePlaceholder={false}
      />
      <Form.MoneyInput
        label={<Icon className="t-34 t-title" type="basket" />}
        name="fishTotalWeight"
        extra="斤"
        placeholder="请输入渔获总重量"
        updatePlaceholder={false}
      />

      <style jsx global>{`
        .style-655742 {
        }
        .${prefixCls}__picker .am-picker-col + .am-picker-col {
          flex: 2.4 1 0% !important;
        }
      `}</style>
    </Form>
  );
};

_Form.contextTypes = {
  $: PropTypes.object
};

export default observer(_Form);
