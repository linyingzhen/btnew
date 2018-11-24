/**
 * const prefixCls = 'style-655742';
 * const images = '/static/images/src/discovery/fish/Post';
 * @Author: czy0729
 * @Date: 2018-08-11 16:02:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-15 17:23:31
 * @Path m.benting.com.cn /src/discovery/fish/Post/_Form.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Form, Icon } from '@components';
import Const from '@const';

const prefixCls = 'style-655742';

const _Form = (props, { $ }) => {
  const { form, className } = props;
  const goods = $.getState('goods');

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
        title="产品名称"
        name="goods"
        data={goods}
        cols={2}
        placeholder="产品名称"
        option={Const.rules.required}
      />
      <Form.Input
        label={<Icon className="t-34 t-title" type="location" />}
        name="fishArea"
        placeholder="所在区或城镇"
        updatePlaceholder={false}
        option={Const.rules.required}
      />
      <Form.Input
        label={<Icon className="t-34 t-title" type="hook" />}
        name="fishKind"
        placeholder="渔获种类"
        updatePlaceholder={false}
      />
      <Form.MoneyInput
        label={<Icon className="t-34 t-title" type="fish" />}
        name="fishWeight"
        extra="斤"
        placeholder="单尾最大重量"
        updatePlaceholder={false}
      />
      <Form.MoneyInput
        label={<Icon className="t-34 t-title" type="basket" />}
        name="fishTotalWeight"
        extra="斤"
        placeholder="渔获总重量"
        updatePlaceholder={false}
      />

      <style jsx global>{`
        .style-655742 {
        }
        .${prefixCls} .am-list-content,
        .${prefixCls}.c-form_no-label .am-input-label {
          width: 0.8rem !important;
          margin-right: 0;
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
