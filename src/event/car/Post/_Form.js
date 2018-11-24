/**
 * const prefixCls = 'style-176832';
 * const images = '/static/images/src/event/car/Post';
 * @Author: czy0729
 * @Date: 2018-11-08 11:45:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 14:40:27
 * @Path bt_mb_new /src/event/car/Post/_Form.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Form, Icon } from '@components';
import CityPicker from '@components/Form/CityPicker';
import Const from '@const';
import { goodsDS } from '@src/discovery/fish/Post/ds';
import { tid } from '../ds';
import { mainGoodsDS } from './ds';

const prefixCls = 'style-176832';

const _Form = (props, { $ }) => {
  const { form, className } = props;
  const { id } = $.params.params;
  const isCarEvent = id == tid;

  return (
    <Form className={classNames(prefixCls, className)} form={form}>
      {isCarEvent ? (
        <Form.Picker
          prefixCls={`${prefixCls}__picker am-picker`}
          label={<Icon className="t-34" type="select" />}
          title="鱼竿名称"
          name="goodsId"
          data={mainGoodsDS}
          placeholder="鱼竿名称"
          option={Const.rules.required}
        />
      ) : (
        <Form.Picker
          prefixCls={`${prefixCls}__picker am-picker`}
          label={<Icon className="t-34" type="select" />}
          title="产品名称"
          name="goodsId"
          data={goodsDS}
          cols={2}
          placeholder="产品名称"
          option={Const.rules.required}
        />
      )}
      <Form.MoneyInput
        label={<Icon className="t-34 t-title" type="ruler" />}
        name="len"
        extra="CM"
        placeholder={`渔获长度（必须大于${isCarEvent ? '50' : '30'}厘米）`}
        updatePlaceholder={false}
        option={Const.rules.required}
      />
      <Form.MoneyInput
        label={<Icon className="t-34 t-title" type="fish" />}
        name="weight"
        extra="斤"
        placeholder="渔获重量"
        updatePlaceholder={false}
      />
      <CityPicker
        label={<Icon className="t-34 t-title" type="location" />}
        name="location"
        title="钓点省市区"
        placeholder="钓点省市区"
        updatePlaceholder={false}
        option={Const.rules.required}
      />
      <Form.Input
        label={<Icon className="t-34 t-title" type="edit" />}
        name="address"
        placeholder="钓点具体地址"
        updatePlaceholder={false}
        option={Const.rules.required}
      />
      <Form.DatePicker
        label={<Icon className="t-34 t-title" type="calendar" />}
        name="fishDate"
        title="钓鱼日期"
        placeholder="钓鱼日期"
        updatePlaceholder={false}
        align="left"
        option={Const.rules.required}
      />

      <style jsx global>{`
        .style-176832 {
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
